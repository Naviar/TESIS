const subirarchivosCtrl = {};
var ibmdb = require("ibm_db");
let connStr = require('../database');
let db = require('../db_connection');
const nodemailer = require('nodemailer');
//autenticacion para enviar correo
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'consultorio.usta.DRSU@gmail.com',
        pass: 'consultoriousta123'
    }
});


subirarchivosCtrl.upload = (req, res) => {





    db.query("SELECT * FROM usuario", (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json({ data: data })
        }
    });

}

subirarchivosCtrl.getAnnouncementCurrent = (req, res) => {

    try {
        query = `select * from convocatoria where id_convocatoria = (select max(id_convocatoria) from convocatoria)`;


        db.query(query, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                console.log(`encontro esta announcement ${JSON.stringify(data[0])}`);
                res.json(data[0]);
            }
        })

    } catch (error) {

        res.state(500).json({ error });

    }

}

subirarchivosCtrl.getDocumentos = (req, res) => {



    db.query("SELECT * FROM documento", (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}

subirarchivosCtrl.getProyectosByEtapa = (req, res) => {

    const etapa = req.params.etapa;



    db.query(`SELECT p.* , u.NOMBRE, u.APELLIDO, u.CORREO , U.celular FROM proyecto as p INNER JOIN usuario as u ON p.USUARIO_ID_USUARIO = u.ID_USUARIO where p.ETAPA = '${etapa}' AND p.CONVOCATORIA_ID_CONVOCATORIA = (SELECT MAX(ID_CONVOCATORIA) FROM CONVOCATORIA)`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}
subirarchivosCtrl.updateFixes = (req, res) => {

    try {
        const { ID_PROYECTO } = req.params;
        const state = req.body.stateFixes;
        const correo = req.body.correo;
        const nombreProyecto = req.body.nombreProyecto;
        const documento = req.body.documento;




        db.query(`UPDATE PROYECTO SET CORRECCIONES = '${state}', CORREGIDO = '${!state}'   WHERE ID_PROYECTO = '${ID_PROYECTO}' `, (err, data) => {


            const mailOptions = {
                from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                to: `${correo}`, // lista de los destinatarios del 
                subject: `tiene correciones para el proyecto ${nombreProyecto}`, // Línea del asunto 
                html: `<h1>CORRECCIONES PENDIENTES</h1>
                        <p>tu proyecto <b>${nombreProyecto}</b> tiene correciones pendientes para el documento ${documento}</p>
                        <p>por favor entrar a la plataforma y subir el documento atendiendo las correciones , gracias.</p>` // cuerpo de texto sin formato 
            };

            transporter.sendMail(mailOptions, function(err, info) {


                console.log(info);
                res.json({ exito: true });


            });


        });


    } catch (error) {
        res.state(404).json({ error });
    }

}

subirarchivosCtrl.getProyectos = (req, res) => {


    db.query("SELECT * FROM proyecto", (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda de proyectos" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}

subirarchivosCtrl.getProyectosById = (req, res) => {
    let id_usuario = req.params.id_usuario;



    db.query(`SELECT * FROM proyecto WHERE usuario_id_usuario= '${id_usuario}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda de proyectos" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}
subirarchivosCtrl.getUsuarioById = (req, res) => {
    let id_usuario = req.params.id_usuario;


    db.query(`SELECT * FROM usuario WHERE id_usuario= '${id_usuario}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda de proyectos" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}
subirarchivosCtrl.getProyectosByNombre = (req, res) => {
    let nombre_proyecto = req.params.nombre_proyecto;



    db.query(`SELECT * FROM proyecto WHERE nombre_proyecto= '${nombre_proyecto}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda de proyectos" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}
subirarchivosCtrl.getDistintDocument = (req, res) => {
    let documento = req.params.documento;



    db.query(`SELECT * FROM documento WHERE etapa= '${2}' AND nombre_documento !='${documento}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda de documentos" + JSON.stringify(err));
        } else {

            res.json(data);
        }
    });

}

subirarchivosCtrl.getProyectosFacultad = (req, res) => {

    console.log(req.info);
    let id_facultad = req.params.facultad;



    db.query(`SELECT * FROM proyecto AS p INNER JOIN asesor AS a ON p.usuario_id_usuario = a.usuario_id_usuario WHERE a.facultad_id_facultad = '${id_facultad}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    })

}

subirarchivosCtrl.getProyectosDocente = (req, res) => {

    console.log("###", req.params.docente);
    let id_usuario = req.params.docente;



    db.query(`SELECT * FROM proyecto AS p INNER JOIN asesor AS a ON p.usuario_id_usuario = a.usuario_id_usuario WHERE a.usuario_id_usuario = '${id_usuario}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {
            res.json(data);
        }
    });

}

subirarchivosCtrl.getDocumentosEtapa = (req, res) => {


    let etapa = req.params.etapa;



    db.query(`SELECT * FROM documento WHERE etapa <= '${etapa}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}

subirarchivosCtrl.getDocumentosByEtapa = (req, res) => {


    let etapa = req.params.etapa;



    db.query(`SELECT * FROM documento WHERE etapa = '${etapa}'`, (err, data) => {
        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}



subirarchivosCtrl.crearProyecto = (req, res) => {

    let nombre = req.body.NOMBRE_PROYECTO;
    let etapa = parseInt(req.body.ETAPA);
    let id_usuario = req.body.USUARIO_ID_USUARIO;
    let id_convocatoria = parseInt(req.body.CONVOCATORIA_ID_CONVOCATORIA);
    console.log(`llego ${JSON.stringify(req.body)}`);
    var query = `INSERT INTO proyecto (nombre_proyecto, etapa, usuario_id_usuario, fecha , CONVOCATORIA_ID_CONVOCATORIA, CORRECCIONES, CORREGIDO)
    VALUES  ('${nombre}', '${etapa}', '${id_usuario}', CURRENT_DATE , '${id_convocatoria}', false, false)`;



    db.query(query, (err, data) => {

        if (err) {
            res.json({ error: err })
            console.log("Hubo un error en la creacion del proyecto" + err);
        } else {

            res.json("Se creo el proyecto")
        }
    });

}

subirarchivosCtrl.proyectoDuplicado = (req, res) => {

    let nombre = req.body.NOMBRE_PROYECTO;

    var query = `SELECT COUNT(*) AS duplicate from proyecto where nombre_proyecto='${nombre}'`;




    db.query(query, function(err, data) {

        if (err) res.json({ error: err })
        else res.json(data)

    });

}

subirarchivosCtrl.updateProject = (req, res) => {

    const { ID_PROYECTO } = req.params;
    const correcciones = req.body.correcciones;
    const corregido = req.body.corregido;
    console.log(`llego esto correcciones:${correcciones} y corregido : ${corregido}`);
    try {


        db.query(`UPDATE proyecto SET correcciones = '${correcciones}', corregido = '${corregido}' WHERE id_proyecto = '${ID_PROYECTO}'`, (err, data) => {
            if (err) {
                console.log("Hubo un error en la busqueda" + err);
            } else {

                res.json(data);
            }
        });

    } catch (error) {
        res.state(404).json({ error });
    }
}

subirarchivosCtrl.updateStageProjects = (req, res) => {

    try {

        const { ID_PROYECTO } = req.params;
        const etapa = req.body.etapa;
        const correo = req.body.correo;
        const nombreProyecto = req.body.nombreProyecto;


        db.query(`UPDATE PROYECTO SET ETAPA = '${etapa}',CORREGIDO = '${false}',CORRECCIONES = '${false}' WHERE ID_PROYECTO = '${ID_PROYECTO}' `, (err, data) => {




            const mailOptions = {
                from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                to: `${correo}`, // lista de los destinatarios del 
                subject: `el proyecto ${nombreProyecto} ha pasado a la siguiente etapa`, // Línea del asunto 
                html: `<h1>ETAPA ACTUALIZADA</h1>
                            <p>tu proyecto <b>${nombreProyecto}</b> ha cumplido con los requisitos de la etapa actual y ha avanzado a la siguiente etapa</p>
                            <p>puedes entrar a la plataforma para seguir con el proceso del proyecto</p> ` // cuerpo de texto sin formato 
            };

            transporter.sendMail(mailOptions, function(err, info) {


                console.log(info);
                res.json({ exito: true });


            });


            res.json(data);

        });


    } catch (error) {
        res.state(404).json({ error });
    }

}

module.exports = subirarchivosCtrl;