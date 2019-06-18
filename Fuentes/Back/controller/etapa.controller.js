const etapaCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

etapaCtrl.getEtapa = (req, res) => {
    
    let id_estudiante = parseInt(req.params.id_estudiante);
    console.log("IDDDDD",id_estudiante);
    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT etapa FROM estudiante WHERE id_estudiante='${id_estudiante}'`, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            }
            else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data[0])
            }
        })
    })
}

etapaCtrl.putEtapa = (req, res) => {

    let etapa = req.body.etapa;
    let id_estudiante = parseInt(req.params.id_estudiante);    
    var query = `UPDATE estudiante SET etapa='${etapa}' WHERE id_estudiante='${id_estudiante}'`;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(query, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la actualizacion de la etapa" + err);
            }
            else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos ")
                })
                res.json("Se actualizo la etapa")
            }
        })
    })
}

module.exports = etapaCtrl; 