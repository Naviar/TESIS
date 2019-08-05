const diagnosticoCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');

//--------------------------------------------------------------------------------------------------
// Crear diagnostico
//--------------------------------------------------------------------------------------------------

diagnosticoCtrl.crearDiagnostico = (req, res) => {

  console.log("hasata aqui vamos con esto",req.body);
    // let id_diagnostico = req.body.id_diagnostico;   
    let estudiante = req.body.estudiante; 
    let etapa_proyecto = req.body.etapa_proyecto;
    let sector_proyecto = req.body.sector_proyecto;    
    let ambito_social = req.body.ambito_social;
    let descripcion_proyecto = req.body.descripcion_proyecto;    
    let socios_clave = req.body.socios_clave;
    let actividades_clave = req.body.actividades_clave;
    let recursos_clave = req.body.recursos_clave;
    let propuesta_valor = req.body.propuesta_valor;
    let relacion_clientes = req.body.relacion_clientes;
    let canales = req.body.canales;
    let segmentos_clientes = req.body.segmentos_clientes;
    let estructura_costos = req.body.estructura_costos;
    let fuente_ingresos = req.body.fuente_ingresos;
    let tipo_asesoria = req.body.tipo_asesoria;    

   var query = `INSERT INTO formato_diagnostico (etapa_id_etapa, sector_id_sector, ambito_social, descripcion_proyecto,
     socios_clave, actividades_clave, recursos_clave, propuesta_valor, relacion_clientes, canales, segmentos_clientes, 
     estructura_costos, fuente_ingresos, tipo_asesoria_id_tipo_asesoria, estudiante_id_estudiante, semestre, facultad_id_facultad, fecha)

    SELECT '${etapa_proyecto}','${sector_proyecto}','${ambito_social}','${descripcion_proyecto}',
    '${socios_clave}','${actividades_clave}','${recursos_clave}','${propuesta_valor}','${relacion_clientes}','${canales}','${segmentos_clientes}',
    '${estructura_costos}','${fuente_ingresos}','${tipo_asesoria}','${estudiante}', estudiante.semestre, estudiante.facultad_id_facultad, CURRENT_TIMESTAMP - 5 HOUR
    FROM estudiante 
    WHERE id_estudiante= '${estudiante}'`;
        

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query, function (err, data) {
            if (err) res.json({ error: err })
            else{
              conn.query(`select id_formato_diagnostico from formato_diagnostico order by id_formato_diagnostico desc limit 0,1;`, (err, data) => {
                res.json(data);
              })
            } 

            conn.close(function () {
                console.log('Se ha cerrado la base de datos correctamente');
            });
        });
    });
}
 
diagnosticoCtrl.getEstudiantes = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query("SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario WHERE etapa = 1 AND u.fecha >= CURRENT_DATE - 1 YEAR", (err, data) => {
  
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

  diagnosticoCtrl.getEtapas = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query("SELECT * FROM etapa", (err, data) => {
  
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

  diagnosticoCtrl.getSectores = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
  
      conn.query("SELECT * FROM sector", (err, data) => {
  
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

  diagnosticoCtrl.getAsesorias = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {
      if (err) return console.log("Aja el error",err);
      conn.query("SELECT * FROM tipo_asesoria", (err, data) => {
  
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

  diagnosticoCtrl.putEstudiante = (req, res) => {    
    
    let id_diagnostico = req.body.ID_FORMATO_DIAGNOSTICO;
    let id_estudiante = parseInt(req.params.id_estudiante);  
    
    var query = `UPDATE estudiante SET formato_diagnostico_id_diagnostico='${id_diagnostico}' WHERE id_estudiante='${id_estudiante}'`;

    ibmdb.open(connStr, (err, conn) => {
  
      conn.query(query, (err, data) => {
  
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

module.exports = diagnosticoCtrl; 