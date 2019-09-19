const notificacionesCtrl = {}


var ibmdb = require("ibm_db")

let connStr = require("../database")


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
    if ((resta_fii) > 0 && (resta_fii / 86400000 >= 15)) {


        ibmdb.open(connStr, (err, conn) => {

            conn.query(``, (err, data) => {
                if (err) {

                    console.log("Hubo un error en la busqueda DE HORARIOS" + err);
                } else {
                    conn.close(() => {
                        console.log("Se ha cerrado la base de datos")
                    })
                    console.log(data[0]);

                }
            })
        });

    } else if (resta_fii > 0) {

    }
}




module.exports = notificacionesCtrl;