const reporteCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');
const db = require('../db_connection');

reporteCtrl.getReporteGeneral = (req, res) => {



    db.query(`SELECT * FROM usuario`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error buscando tipos de asesorias en la BD" + err);
        } else {

            res.json(data);

        }
    });


}


module.exports = reporteCtrl;