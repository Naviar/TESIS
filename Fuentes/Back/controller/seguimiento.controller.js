const seguimientoCtrl = {};
var ibmdb = require("ibm_db");
let dbStr = require('../database');
const db = require('../db_connection');


seguimientoCtrl.getEstudiantes = (req, res) => {

    // console.log(req.info);


    db.query("SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario", (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}

seguimientoCtrl.getEstudianteAsesoria = (req, res) => {

    const { id_asesoria } = req.params;



    db.query(`SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario and e.id_estudiante = (select estudiante_id_estudiante from estudiante_has_formato_asesoria where formato_asesoria_id_formato_asesoria = '${id_asesoria}')`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });


}
seguimientoCtrl.getDiagnosticos = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);


    db.query(`SELECT * FROM formato_diagnostico WHERE estudiante_id_estudiante = '${id_estudiante}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getDiagnostico = (req, res) => {

    let id_diagnostico = parseInt(req.params.id_diagnostico);


    db.query(`SELECT * FROM formato_diagnostico WHERE id_formato_diagnostico = '${id_diagnostico}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getAsesorias = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);


    db.query(`SELECT f.* FROM  formato_asesoria AS f INNER JOIN estudiante_has_formato_asesoria AS i ON i.formato_asesoria_id_formato_asesoria = f.id_formato_asesoria WHERE i.estudiante_id_estudiante = '${id_estudiante}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getConvocatoria = (req, res) => {

    let id_usuario = parseInt(req.params.id_usuario);


    db.query(`SELECT * FROM  convocatoria WHERE usuario_id_usuario = '${id_usuario}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getProyecto = (req, res) => {

    let id_usuario = parseInt(req.params.id_usuario);


    db.query(`SELECT * FROM  proyecto WHERE usuario_id_usuario = '${id_usuario}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getDocente = (req, res) => {

    let id_usuario = parseInt(req.params.id_usuario);


    db.query(`SELECT * FROM  asesor WHERE usuario_id_usuario = '${id_usuario}'`, (err, data) => {

        if (err) {  
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getEstudiante = (req, res) => {

    let id_usuario = parseInt(req.params.id_usuario);


    db.query(`SELECT * FROM  estudiante WHERE usuario_id_usuario = '${id_usuario}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getNameAsesoria = (req, res) => {
    const { id_asesoria } = req.params;


    db.query(`SELECT NOMBRE_TIPO_ASESORIA FROM TIPO_ASESORIA WHERE ID_TIPO_ASESORIA = '${id_asesoria}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}

seguimientoCtrl.getCompromisosAsesoria = (req, res) => {
    const { id_asesoria } = req.params;




    db.query(`SELECT c.actividad ,c.fecha, c.observacion , u.nombre , u.apellido, c.id_compromiso , u.rol_id_rol FROM COMPROMISO AS c INNER JOIN usuario AS u ON c.id_usuario = u.id_usuario WHERE c.formato_asesoria_id_formato_asesoria = '${id_asesoria}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}

seguimientoCtrl.getAsesoria = (req, res) => {

    let id_asesoria = parseInt(req.params.id_asesoria);


    db.query(`SELECT * FROM formato_asesoria WHERE id_formato_asesoria = '${id_asesoria}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}
seguimientoCtrl.getEvaluaciones = (req, res) => {

    let id_estudiante = parseInt(req.params.id_estudiante);


    db.query(`SELECT e.* FROM formato_evaluacion AS e INNER JOIN formato_diagnostico AS d ON e.id_formato_evaluacion = d.formato_evaluacion_id_formato_evaluacion WHERE d.estudiante_id_estudiante = '${id_estudiante}'
                  UNION 
                  SELECT e.* FROM formato_evaluacion AS e INNER JOIN formato_asesoria AS a ON e.id_formato_evaluacion = a.formato_evaluacion_id_formato_evaluacion INNER JOIN estudiante_has_formato_asesoria AS i ON i.formato_asesoria_id_formato_asesoria = a.id_formato_asesoria WHERE i.estudiante_id_estudiante = '${id_estudiante}'`,
        (err, data) => {

            if (err) {
                res.json({ error: err });
                console.log("Hubo un error en la busqueda" + err);
            } else {

                res.json(data);
            }
        });

}
seguimientoCtrl.getEvaluacion = (req, res) => {

    let id_evaluacion = parseInt(req.params.id_evaluacion);


    db.query(`SELECT * FROM formato_evaluacion WHERE id_formato_evaluacion = '${id_evaluacion}'`, (err, data) => {

        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda" + err);
        } else {

            res.json(data);
        }
    });

}


module.exports = seguimientoCtrl;