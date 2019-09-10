const subirarchivosCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

subirarchivosCtrl.upload = (req, res) => {

    console.log(req.info);

    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM usuario", (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ data: data })
            }
        })
    })
}

module.exports = subirarchivosCtrl;