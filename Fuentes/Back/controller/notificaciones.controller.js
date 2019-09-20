const notificacionesCtrl = {}


var ibmdb = require("ibm_db")

let connStr = require("../database")
const nodemailer = require('nodemailer');
//autenticacion para enviar correo
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'consultorio.usta.DRSU@gmail.com',
        pass: 'consultoriousta123'
    }
});

var fecha_inicial;
var fecha_final;

//notificaciones
var actual = new Date();
var horaNotificaciones = new Date(actual.getFullYear(), actual.getMonth(), actual.getDate(), 17, 31, 0, 0);
var msHastaLaHora = horaNotificaciones - actual;

EnviarNotificaciones();
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
    setInterval(EnviarNotificaciones, 10000); // cada dia 86400000 ms  = 24 hrs;

}

function EnviarNotificaciones() {

    getFechas();
}




function getFechas() {

    try {

        ibmdb.open(connStr, (err, conn) => {

            conn.query(`SELECT FECHA_INFORME_INICIAL, FECHA_INFORME_FINAL FROM CONVOCATORIAS WHERE ID_CONVOCATORIA = (SELECT MAX(ID_CONVOCATORIA) FROM CONVOCATORIAS)`, (err, data) => {
                if (err) {

                    console.log("Hubo un error en la busqueda DE HORARIOS" + err);
                } else {
                    conn.close(() => {
                        console.log("Se ha cerrado la base de datos")
                    })

                    fecha_inicial = data[0]['FECHA_INFORME_INICIAL'];
                    fecha_final = data[0]['FECHA_INFORME_FINAL'];

                    notificar(data[0]['FECHA_INFORME_INICIAL'], data[0]['FECHA_INFORME_FINAL']);
                }
            })
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


        ibmdb.open(connStr, (err, conn) => {

            conn.query(`SELECT U.NOMBRE, U.CORREO, P.NOMBRE_PROYECTO FROM USUARIO AS U INNER JOIN PROYECTO AS P ON P.USUARIO_ID_USUARIO = U.ID_USUARIO WHERE P.ETAPA = 2;`, (err, data) => {
                if (err) {

                    console.log("Hubo un error en la busqueda DE CORREOS Y NOMBRES DE PROYECTOS" + err);
                } else {
                    conn.close(() => {
                        console.log("Se ha cerrado la base de datos")
                    })
                    console.log(data);
                    sendEmails(data);
                }
            })
        });

    } else if ((resta_fif > 0) && (resta_fif / 86400000 <= 15)) {

        ibmdb.open(connStr, (err, conn) => {

            conn.query(`SELECT U.NOMBRE, U.CORREO, P.NOMBRE_PROYECTO FROM USUARIO AS U INNER JOIN PROYECTO AS P ON P.USUARIO_ID_USUARIO = U.ID_USUARIO WHERE P.ETAPA = 3;`, (err, data) => {
                if (err) {

                    console.log("Hubo un error en la busqueda DE CORREOS Y NOMBRES DE PROYECTOS" + err);
                } else {
                    conn.close(() => {
                        console.log("Se ha cerrado la base de datos")
                    })
                    console.log(data);

                    sendEmails(data);
                }
            })
        });

    }
}

function sendEmails(datos, dias) {

    try {

        console.log('correos', datos);

        for (i = 0; i < datos.length; i++) {


            const mailOptions = {
                from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                to: `${datos[0]['CORREO']}`, // lista de los destinatarios del 
                subject: `RECORDATORIO: presentar informe inicial de proyecto , ${datos[i]['NOMBRE_PROYECTO']}`, // Línea del asunto 
                html: `<h1>Quedan pocos dias para subir el primer informe del proyecto</h1>
                    <p>Estimado ${datos[i]['NOMBRE']}, QUEDAN <b>${dias}</b> dias para subir el informe de su proyecto ${datos[i]['NOMBRE_PROYECTO']}</p>` // cuerpo de texto sin formato 
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
        console.log(error);
    }
}




module.exports = notificacionesCtrl;