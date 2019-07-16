const seguimientoCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

 
seguimientoCtrl.getEstudiantes = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query("SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario WHERE u.fecha >= CURRENT_DATE - 1 YEAR", (err, data) => {
  
        if (err) {
          res.json({ error: err })
           console.log("Hubo un error en la busqueda" + err);
        }
        else {
          conn.close(() => {
             console.log("Se ha cerrado la base de datos")
          })
          res.json(data)
        }
      })
    })
  }

  module.exports = seguimientoCtrl; 