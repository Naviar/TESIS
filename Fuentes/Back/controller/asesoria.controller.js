const asesoriaCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

asesoriaCtrl.getEstudiantes = (req, res) => {

    // console.log(req.info);

    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario WHERE e.etapa = '4' AND u.fecha >= CURRENT_DATE - 1 YEAR;", (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}

asesoriaCtrl.getAsesorias = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
        if (err) return console.log("Aja el error", err);
        conn.query("SELECT * FROM tipo_asesoria", (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}


asesoriaCtrl.getAsesoriaActual = (req, res) => {

    // console.log(req.info);
    const { id } = req.params
    query = `select count(formato_asesoria_id_formato_asesoria), case when count(formato_asesoria_id_formato_asesoria) !='0' then  ( select fa.tipo_asesoria_id_tipo_asesoria from formato_asesoria  as fa  where id_formato_asesoria =(select MAX(formato_asesoria_id_formato_asesoria) from estudiante_has_formato_asesoria where estudiante_id_estudiante = '${id}') )  END from estudiante_has_formato_asesoria where estudiante_id_estudiante='${id}'`

    ibmdb.open(connStr, (err, conn) => {
        if (err) return console.log("Aja el error", err);
        conn.query(query, (err, data) => {

            if (err) {
                res.json({ error: true, msg: err })
                console.log("Hubo un error en la busqueda" + err);
            } else if (data[0][1] == 0 || data[0][2] == null) {
                console.log('data[0][1]', data[0][1]);
                var query2 = `select fd.tipo_asesoria_id_tipo_asesoria from formato_diagnostico as fd where id_formato_diagnostico = (select formato_diagnostico_id_diagnostico from estudiante where id_estudiante='${id}') `
                conn.query(query2, (err, data2) => {

                    if (err) { res.json({ error: true, msg: err }) } else {
                        console.log('esta respondiendo con esto', data2);
                        conn.close(() => {
                            console.log("Se ha cerrado la base de datos")
                        })
                        res.json({ tipo_asesoria_actual: data2[0]['TIPO_ASESORIA_ID_TIPO_ASESORIA'] });
                    }

                });
            } else {
                console.log('respondio con esto', data[0][2]);
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ tipo_asesoria_actual: data[0][2] });
            }
        })
    })
}

asesoriaCtrl.postFormAsesoria = (req, res) => {

    // console.log(req.info);
    const formato = req.body;
    REQUERIMIENTO = req.body.REQUERIMIENTO;
    DESCRIPCION = req.body.DESCRIPCION;
    RESULTADO = req.body.RESULTADO;
    TIPO_ASESORIA_ACTUAL = req.body.TIPO_ASESORIA_ACTUAL;
    TIPO_ASESORIA_ID_TIPO_ASESORIA = req.body.TIPO_ASESORIA_ID_TIPO_ASESORIA;

    console.log('llego este formato', formato);
    var query = '';
    if (TIPO_ASESORIA_ID_TIPO_ASESORIA == '0') {

        query = `INSERT INTO formato_asesoria (requerimiento, descripcion, resultado, tipo_asesoria_actual, fecha)
   
       VALUES ('${REQUERIMIENTO}','${DESCRIPCION}','${RESULTADO}','${TIPO_ASESORIA_ACTUAL}', CURRENT_TIMESTAMP - 5 HOUR)`;

    } else {
        query = `INSERT INTO formato_asesoria (requerimiento, descripcion, resultado, tipo_asesoria_actual , tipo_asesoria_id_tipo_asesoria, fecha)
   
       VALUES ('${REQUERIMIENTO}','${DESCRIPCION}','${RESULTADO}','${TIPO_ASESORIA_ACTUAL}','${TIPO_ASESORIA_ID_TIPO_ASESORIA}', CURRENT_TIMESTAMP - 5 HOUR)`;
    }



    ibmdb.open(connStr, (err, conn) => {
        if (err) return console.log("Aja el error", err);
        conn.query(query, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error GUARDANDO LA ASESORIA" + err);
            } else {
                conn.query(`select id_formato_asesoria from formato_asesoria order by id_formato_asesoria desc limit 0,1;`, (err, data) => {
                    res.json(data);
                })
            }

            conn.close(function() {
                console.log('Se ha cerrado la base de datos correctamente');
            });
        });
    });
}

asesoriaCtrl.postCompromisos = async(req, res) => {

    // console.log(req.info);
    const compromisos = req.body;


    console.log('llego estos compromisos', compromisos);


    await ibmdb.open(connStr, (err, conn) => {


        for (let i = 0; i < compromisos.length; i++) {



            conn.query(`INSERT INTO compromiso (actividad, fecha, observacion, id_usuario, formato_asesoria_id_formato_asesoria) 
            VALUES ('${compromisos[i].ACTIVIDAD}','${compromisos[i].FECHA}','${compromisos[i].OBSERVACION}','${compromisos[i].ID_USUARIO}',
                    '${compromisos[i].FORMATO_ASESORIA_ID_FORMATO_ASESORIA}')`, (err, data) => {
                if (err) {
                    res.json({ error: err })
                    console.log("Hubo un error haciendo el INSERT compromisos" + err);
                } else {

                    if (i === compromisos.length - 1) {
                        conn.close(() => {
                            console.log("Se ha cerrado la base de datos")
                        })
                        res.json({ data: 'se guardo los compromisos' })
                    }

                }
            })

        }



    })

}



asesoriaCtrl.postAsesoriaEstudiante = (req, res) => {

    let data = req.body;


    var query = `INSERT INTO estudiante_has_formato_asesoria (estudiante_id_estudiante,formato_asesoria_id_formato_asesoria)
    VALUES ( '${data.ESTUDIANTE_ID_ESTUDIANTE}','${data.FORMATO_ASESORIA_ID_FORMATO_ASESORIA}')`;

    ibmdb.open(connStr, function(err, conn) {
        if (err) return console.log(err);

        conn.query(query, function(err, data) {

            if (err) res.json({ error: err })
            else res.json(data)
            conn.close(function() {
                console.log('termino de guardar has');
            });
        });
    });
}



module.exports = asesoriaCtrl;