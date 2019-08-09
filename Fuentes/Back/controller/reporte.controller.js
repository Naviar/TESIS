const reporteCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

reporteCtrl.getReporteGeneral = (req, res) => {

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM usuario`, (err, data) => {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error buscando tipos de asesorias en la BD" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })                
                res.json(data);

            }
        })
    })

}


module.exports = reporteCtrl;