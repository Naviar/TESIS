const evaluacionCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

//--------------------------------------------------------------------------------------------------
// Crear diagnostico
//--------------------------------------------------------------------------------------------------

evaluacionCtrl.crearEvaluacion = (req, res) => {

    console.log("hasata aqui vamos con esto", req.body);
    // let id_diagnostico = req.body.id_diagnostico;    
    let eval_general_q1 = req.body.eval_general_q1;
    let eval_general_q2 = req.body.eval_general_q2;
    let eval_general_q3 = req.body.eval_general_q3;
    let eval_general_q4 = req.body.eval_general_q4;
    let pers_responsable_q1 = req.body.pers_responsable_q1;
    let pers_responsable_q2 = req.body.pers_responsable_q2;
    let pers_responsable_q3 = req.body.pers_responsable_q3;
    let pers_responsable_q4 = req.body.pers_responsable_q4;
    let pers_responsable_q5 = req.body.pers_responsable_q5;
    let pers_responsable_q6 = req.body.pers_responsable_q6;
    let insta_equipos_q1 = req.body.insta_equipos_q1;
    let insta_equipos_q2 = req.body.insta_equipos_q2;
    let insta_equipos_q3 = req.body.insta_equipos_q3;
    let yesno_q1 = req.body.yesno_q1;
    let yesno_q2 = req.body.yesno_q2;
    let yesno_q3 = req.body.yesno_q3;
    let yesno_q4 = req.body.yesno_q4;
    let yesno_q5 = req.body.yesno_q5;
    let observaciones = req.body.observaciones;

    if (insta_equipos_q2 === '') insta_equipos_q2 = 0;
    if (insta_equipos_q3 === '') insta_equipos_q3 = 0;

    var query = `INSERT INTO formato_evaluacion (eval_general_q1, eval_general_q2, eval_general_q3, eval_general_q4, 
            pers_responsable_q1, pers_responsable_q2, pers_responsable_q3, pers_responsable_q4, pers_responsable_q5, pers_responsable_q6,
            insta_equipos_q1, insta_equipos_q2, insta_equipos_q3,
            yesno_q1, yesno_q2, yesno_q3, yesno_q4, yesno_q5, observaciones)

    VALUES ('${eval_general_q1}','${eval_general_q2}','${eval_general_q3}','${eval_general_q4}',
    '${pers_responsable_q1}','${pers_responsable_q2}','${pers_responsable_q3}','${pers_responsable_q4}','${pers_responsable_q5}','${pers_responsable_q6}',
    '${insta_equipos_q1}', '${insta_equipos_q2}','${insta_equipos_q3}',
    '${yesno_q1}', '${yesno_q2}', '${yesno_q3}', '${yesno_q4}', '${yesno_q5}', '${observaciones}')`;


    ibmdb.open(connStr, function(err, conn) {
        if (err) return console.log(err);

        conn.query(query, function(err, data) {
            if (err) {
                console.log('error:', err);
                res.json({ error: err })
            } else {
                conn.query(`select id_formato_evaluacion from formato_evaluacion order by id_formato_evaluacion desc limit 0,1;`, (err, data) => {
                    res.json(data);
                })
            }

            conn.close(function() {
                console.log('Se ha cerrado la base de datos correctamente');
            });
        });
    });
}

evaluacionCtrl.updateEvaluacionDiagnostico = async(req, res) => {

    id_evaluacion = req.body.id_formato_evaluacion;
    id_estudiante = req.body.id_estudiante;
    console.log('llego este id_evaluacion', id_evaluacion);
    console.log('llego este id_estudiante', id_estudiante);
    query = `update formato_diagnostico  set formato_evaluacion_id_formato_evaluacion='${id_evaluacion}' where id_formato_diagnostico=(select formato_diagnostico_id_diagnostico from estudiante where id_estudiante = '${id_estudiante}');`
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error asignando la evlaucion al diagnostico" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                console.log('dataadaádadada:', data);
                res.json({ exito: true });

            }
        })
    })

}

evaluacionCtrl.updateEvaluacionAsesoria = async(req, res) => {

    id_evaluacion = req.body.id_formato_evaluacion;
    id_estudiante = req.body.id_estudiante;
    console.log('llego este id_evaluacion', id_evaluacion);
    console.log('llego este id_estudiante', id_estudiante);
    // query = `update formato_diagnostico  set formato_evaluacion_id_formato_evaluacion='${id_evaluacion}' where id_formato_diagnostico=(select formato_diagnostico_id_diagnostico from estudiante where id_estudiante = '${id_estudiante}');`
    query = `UPDATE formato_asesoria SET formato_evaluacion_id_formato_evaluacion='${id_evaluacion}' WHERE id_formato_asesoria=(SELECT MAX(formato_asesoria_id_formato_asesoria) FROM estudiante_has_formato_asesoria WHERE estudiante_id_estudiante='${id_estudiante}') `;
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(query, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error asignando la evlaucion a la asesoria" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                console.log('dta?????:', data);
                res.json({ exito: true });

            }
        })
    })

}

module.exports = evaluacionCtrl;