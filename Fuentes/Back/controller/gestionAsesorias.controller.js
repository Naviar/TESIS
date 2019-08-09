const gestionAseroriaCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

gestionAseroriaCtrl.getAsesorias = async(req, res) => {

    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM tipo_asesoria`, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error buscando tipos de asesorias en la BD" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                console.log('dataadaádadada:', data);
                res.json(data);

            }
        })
    })

}

gestionAseroriaCtrl.changeStatus = async(req, res) => {

    const { id } = req.params;
    const activo = req.body.status;
    const query = `select count(*) as resultado from disponibilidad as d inner join horario as h on h.id_horario = d.horario_id_horario where d.fecha > current timestamp - 5 hour and h.tipo_Asesoria_id_tipo_asesoria = '${id}'`;
    console.log(`change status ${id} , activo: ${activo} y req.body= ${req.body}`);



    await ibmdb.open(connStr, (err, conn) => {


        conn.query(query, (err, data) => {
            if (err) {
                res.json({ status: false, mensaje: `ocurrio un error en la bd.` })
                console.log("Hubo un error actualizando el status asesoria" + err);
            } else {

                console.log('resultado:', data[0]['RESULTADO']);

                if (data[0]['RESULTADO'] == 0) {

                    conn.query(`UPDATE tipo_asesoria SET activo='${activo}' WHERE id_tipo_asesoria='${id}' `, (err, data) => {
                        if (err) {
                            res.json({ status: false, mensaje: `ocurrio un error en la bd.` });
                            console.log("Hubo un error actualizando el status asesoria" + err);
                        } else {

                            res.json({ status: true, exito: true, mensaje: `se actualizo con exito el estado de la asesoria.` });
                            conn.close(() => {
                                console.log("Se ha cerrado la base de datos");
                            })
                        }
                    });

                } else {
                    res.json({ status: true, exito: false, mensaje: `la asesoria que esta intentando desactivar tiene citas pendientes.` });
                    conn.close(() => {
                        console.log("Se ha cerrado la base de datos");
                    })
                }


            }
        });



    });
}

gestionAseroriaCtrl.nuevaAsesoria = async(req, res) => {

    const nombre_asesoria = req.body.nombre_asesoria;

    await ibmdb.open(connStr, (err, conn) => {


        conn.query(`INSERT INTO tipo_asesoria (NOMBRE_TIPO_ASESORIA , ACTIVO) VALUES('${nombre_asesoria}','true') `, (err, data) => {
            if (err) {
                res.json({ exito: false })
                console.log("Hubo un error agregando nueva asesoria" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ exito: true })
            }
        })
    })

}


module.exports = gestionAseroriaCtrl;