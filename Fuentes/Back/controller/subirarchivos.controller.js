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

subirarchivosCtrl.getDocumentos = (req, res) => {

    console.log(req.info);

    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM documento", (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}

subirarchivosCtrl.getProyectos = (req, res) => {

    console.log(req.info);

    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM proyecto", (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}

subirarchivosCtrl.getProyectosFacultad = (req, res) => {

    console.log(req.info);
    let id_facultad = req.params.facultad;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM proyecto AS p INNER JOIN asesor AS a ON p.usuario_id_usuario = a.usuario_id_usuario WHERE a.facultad_id_facultad = '${id_facultad}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}

subirarchivosCtrl.getProyectosDocente = (req, res) => {

    console.log("###",req.params.docente);
    let id_usuario = req.params.docente;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM proyecto AS p INNER JOIN asesor AS a ON p.usuario_id_usuario = a.usuario_id_usuario WHERE a.usuario_id_usuario = '${id_usuario}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}

subirarchivosCtrl.getDocumentosEtapa = (req, res) => {

    console.log(req.info);
    let etapa = req.params.etapa;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM documento WHERE etapa <= '${etapa}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}



subirarchivosCtrl.crearProyecto = (req, res) => {

    let nombre = req.body.NOMBRE_PROYECTO;
    let etapa = parseInt(req.body.ETAPA);
    let id_usuario = req.body.USUARIO_ID_USUARIO;
    
    var query = `INSERT INTO proyecto (nombre_proyecto, etapa, usuario_id_usuario, fecha)
    VALUES  ('${nombre}', '${etapa}', '${id_usuario}', CURRENT_DATE)`;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(query, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la creacion del proyecto" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos ")
                })
                res.json("Se creo el proyecto")
            }
        });
    })
}

subirarchivosCtrl.proyectoDuplicado = (req, res) => {

    let nombre = req.body.NOMBRE_PROYECTO;    

    var query = `SELECT COUNT(*) AS duplicate from proyecto where nombre_proyecto='${nombre}'`;

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query, function (err, data) {

            if (err) res.json({ error: err })
            else res.json(data)
            conn.close(function () {
                console.log('termino de buscar');
            });
        });
    });
}

module.exports = subirarchivosCtrl;