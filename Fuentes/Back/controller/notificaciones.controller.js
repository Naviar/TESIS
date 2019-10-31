const notificacionesCtrl = {}


var ibmdb = require("ibm_db")

let dbStr = require("../database")
const db = require('../db_connection');
const nodemailer = require('nodemailer');
//autenticacion para enviar correo
var smtpTransport = require('nodemailer-smtp-transport');
//autenticacion para enviar correo
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'consultorio.usta.DRSU@gmail.com',
        pass: 'consultoriousta123'
    },
}));

var fecha_inicial;
var fecha_final;

var dias;
//notificaciones
var actual = new Date();
var horaNotificaciones = new Date(actual.getFullYear(), actual.getMonth(), actual.getDate(), 23, 0, 0, 0);
var msHastaLaHora = horaNotificaciones - actual;


console.log(`fecha actual : ${actual}`);
console.log(`hora para enviar las alertas: ${horaNotificaciones}`);
console.log(`ms que faltan para llegar a la hora de notificaciones ${msHastaLaHora}`);

if (msHastaLaHora < 0) {

    // ya la hora que se escogio para lanzar las notificaciones paso , intentar mañana (sumar 24 hrs)
    msHastaLaHora += 86400000;
    console.log('ya la hora paso en este dia prueba mañana por eso se le suma 24 hrs en ms');
}

setTimeout(PrepararNotificaciones, msHastaLaHora);


function PrepararNotificaciones() {
    console.log('entro');
    EnviarNotificaciones();
    setInterval(EnviarNotificaciones, 86400000); // cada dia 86400000 ms  = 24 hrs;

}

function EnviarNotificaciones() {

    getFechas();
}




function getFechas() {

    try {



        db.query(`SELECT FECHA_INFORME_INICIAL, FECHA_INFORME_FINAL FROM CONVOCATORIA WHERE ID_CONVOCATORIA = (SELECT MAX(ID_CONVOCATORIA) FROM CONVOCATORIA)`, (err, data) => {
            if (err) {

                console.log("Hubo un error en la busqueda DE HORARIOS" + err);
            } else {


                fecha_inicial = data[0]['FECHA_INFORME_INICIAL'];
                fecha_final = data[0]['FECHA_INFORME_FINAL'];

                notificar(data[0]['FECHA_INFORME_INICIAL'], data[0]['FECHA_INFORME_FINAL']);
            }
        });


    } catch (error) {

        throw error;

    }


}

function notificar(fecha_informe_inicial, fecha_informe_final) {

    const now = new Date().getTime();
    const f_i_i = new Date(fecha_informe_inicial).getTime();
    const f_i_f = new Date(fecha_informe_final).getTime();

    console.log('FECHA ACTUAL', now);

    console.log(`FECHAS RECIBIDIAD${f_i_i},${f_i_f}`);



    const resta_fii = f_i_i - now;
    const resta_fif = f_i_f - now;
    // solo entra si la resta de fecha de informe inicial es mayor a la fecha actual
    if ((resta_fii) > 0 && (resta_fii / 86400000 <= 15)) {

        dias = resta_fii / 86400000;


        db.query(`SELECT U.NOMBRE, U.CORREO, P.NOMBRE_PROYECTO FROM USUARIO AS U INNER JOIN PROYECTO AS P ON P.USUARIO_ID_USUARIO = U.ID_USUARIO WHERE P.ETAPA = 3;`, (err, data) => {
            if (err) {

                console.log("Hubo un error en la busqueda DE CORREOS Y NOMBRES DE PROYECTOS" + err);
            } else {

                console.log(data);
                sendEmails(data, dias, 'inicial', fecha_inicial);
            }
        });


    } else if ((resta_fif > 0) && (resta_fif / 86400000 <= 15)) {

        dias = resta_fif / 86400000


        db.query(`SELECT U.NOMBRE, U.CORREO, P.NOMBRE_PROYECTO FROM USUARIO AS U INNER JOIN PROYECTO AS P ON P.USUARIO_ID_USUARIO = U.ID_USUARIO WHERE P.ETAPA = 4;`, (err, data) => {
            if (err) {

                console.log("Hubo un error en la busqueda DE CORREOS Y NOMBRES DE PROYECTOS" + err);
            } else {

                console.log(data);

                sendEmails(data, dias, 'final', fecha_final);
            }
        });


    }
}

function sendEmails(datos, dias, informe, fecha) {

    try {

        console.log('correos', datos);
        var i;
        for (i = 0; i < datos.length; i++) {


            const mailOptions = {
                from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                to: `${datos[i]['CORREO']}`, // lista de los destinatarios del 
                subject: `RECORDATORIO: presentar informe ${informe} del proyecto , ${datos[i]['NOMBRE_PROYECTO']}`, // Línea del asunto 
                html: `<h1>SUBIR INFORME ${informe.toUpperCase()} <b>${datos[i]['NOMBRE_PROYECTO']}</b></h1>
                    <p>Estimado ${datos[i]['NOMBRE']},quedan <b>${Math.trunc(dias)}</b> dia(s) para subir el informe ${informe} de su proyecto <b>${datos[i]['NOMBRE_PROYECTO']}</b></p>
                    <p>recuerde que el informe debe ser subido antes de la fecha <b>${fecha}</b>.</p>` // cuerpo de texto sin formato 
            };
            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);


                }

            });
        }
    } catch (error) {
        console.log('fuckkkkkkkk', error);
    }
}




module.exports = notificacionesCtrl;