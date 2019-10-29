const etapaCtrl = {};
var ibmdb = require("ibm_db");
let dbStr = require('../database');
const db = require('../db_connection');

etapaCtrl.getEtapa = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);

    // console.log(req.info);


    db.query(`SELECT etapa FROM estudiante WHERE id_estudiante='${id_estudiante}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data[0]);
        }
    });

}

etapaCtrl.putEtapa = (req, res) => {

    console.log(`llego esto ${JSON.stringify(req.body)}`);
    let etapa = parseInt(req.body.etapa);
    let id_estudiante = parseInt(req.params.id_estudiante);
    var query = `UPDATE estudiante SET etapa='${etapa}' WHERE id_estudiante='${id_estudiante}'`;



    db.query(query, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la actualizacion de la etapa" + err);
        } else {

            res.json("Se actualizo la etapa");
        }
    });

}

module.exports = etapaCtrl;