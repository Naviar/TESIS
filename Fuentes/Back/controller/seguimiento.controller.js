const seguimientoCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

 
seguimientoCtrl.getEstudiantes = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query("SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario", (err, data) => {
  
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
  seguimientoCtrl.getDiagnosticos = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT * FROM formato_diagnostico WHERE estudiante_id_estudiante = '${id_estudiante}'`, (err, data) => {
  
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
  seguimientoCtrl.getDiagnostico = (req, res) => {

    let id_diagnostico = parseInt(req.params.id_diagnostico);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT * FROM formato_diagnostico WHERE id_formato_diagnostico = '${id_diagnostico}'`, (err, data) => {
  
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
  seguimientoCtrl.getAsesorias = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT f.* FROM  formato_asesoria AS f INNER JOIN estudiante_has_formato_asesoria AS i ON i.formato_asesoria_id_formato_asesoria = f.id_formato_asesoria WHERE i.estudiante_id_estudiante = '${id_estudiante}'`, (err, data) => {
  
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
  seguimientoCtrl.getAsesoria = (req, res) => {

    let id_asesoria = parseInt(req.params.id_asesoria);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT * FROM formato_asesoria WHERE id_formato_asesoria = '${id_asesoria}'`, (err, data) => {
  
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
  seguimientoCtrl.getEvaluaciones = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT e.* FROM formato_evaluacion AS e INNER JOIN formato_diagnostico AS d ON e.id_formato_evaluacion = d.formato_evaluacion_id_formato_evaluacion WHERE d.estudiante_id_estudiante = '${id_estudiante}'
                  UNION 
                  SELECT e.* FROM formato_evaluacion AS e INNER JOIN formato_asesoria AS a ON e.id_formato_evaluacion = a.formato_evaluacion_id_formato_evaluacion INNER JOIN estudiante_has_formato_asesoria AS i ON i.formato_asesoria_id_formato_asesoria = a.id_formato_asesoria WHERE i.estudiante_id_estudiante = '${id_estudiante}'`, 
                  (err, data) => {
  
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
  seguimientoCtrl.getEvaluacion = (req, res) => {

    let id_evaluacion = parseInt(req.params.id_evaluacion);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(`SELECT * FROM formato_evaluacion WHERE id_formato_evaluacion = '${id_evaluacion}'`, (err, data) => {
  
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