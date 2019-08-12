const CitasPendientesCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'consultorio.usta.DRSU@gmail.com',
        pass: 'consultoriousta123'
    }
});


CitasPendientesCtrl.getCitas = (req, res) => {

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE DISPONIBILIDADES" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}
CitasPendientesCtrl.getCitasEstudiante = (req, res) => {
    let id = req.params.id_estudiante;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad  WHERE id_estudiante = '${id}' ORDER BY id_disponibilidad DESC LIMIT 0,1`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE DISPONIBILIDADES" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}
CitasPendientesCtrl.getCitasAsesor = (req, res) => {
    let id = req.params.id_asesor;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad AS d INNER JOIN horario AS h ON d.horario_id_horario = h.id_horario WHERE d.id_estudiante IS NOT NULL AND h.usuario_id_usuario = '${id}' AND  h.tipo_reunion_id_tipo_reunion = '${2}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE DISPONIBILIDADES" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}
CitasPendientesCtrl.getCitasLider = (req, res) => {
    let id = req.params.id_lider;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad AS d INNER JOIN horario AS h ON d.horario_id_horario = h.id_horario WHERE d.id_estudiante IS NOT NULL AND h.usuario_id_usuario = '${id}' AND  h.tipo_reunion_id_tipo_reunion = '${1}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE DISPONIBILIDADES" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })

                res.json(data)
            }
        })
    })
}
CitasPendientesCtrl.getHorarioId = (req, res) => {
    let id = req.params.id;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE id_horario='${id}'`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE HORARIOS" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}

CitasPendientesCtrl.getEstudianteId = (req, res) => {
    let id = req.params.id;
    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT e.*, u.nombre, u.apellido, u.correo, u.celular FROM estudiante AS e INNER JOIN usuario AS u ON e.usuario_id_usuario = u.id_usuario WHERE e.id_estudiante = '${id}'`, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}

CitasPendientesCtrl.deleteCita = (req, res) => {

    const { id_cita } = req.params;
    const Motivo = req.body.Motivo;
    const Asunto = req.body.Asunto;
    const id_horario = req.body.id_horario;
    var query = '';
    if (id_horario != undefined) {
        query = `select correo from usuario where id_usuario = (select usuario_id_usuario from horario where id_horario='${id_horario}')`;
    } else {
        query = `select correo  from usuario  where id_usuario = (select usuario_id_usuario from estudiante where id_estudiante = (select id_estudiante from disponibilidad where id_disponibilidad = ${id_cita}))`;

    }

    console.log('llego:', id_horario);
    ibmdb.open(connStr, async(err, conn) => {

        conn.query(query, async(err, data) => {
            if (err) {
                res.status(500).json({ error: err })
                console.log("Hubo un error en la busqueda DE correo" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })

                console.log(data[0].CORREO);
                const correo = data[0].CORREO;
                borro = await deleteCita(id_cita);
                console.log('borroooo:', borro);

                if (id_horario == undefined)
                    DevolverEtapa(correo);

                const mailOptions = {
                    from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                    to: correo, // lista de los destinatarios del 
                    subject: `${Asunto}`, // Línea del asunto 
                    html: `<h1>Cancelacion de cita consultorio socio-empresarial</h1>
                        <p>${Motivo}</p>` // cuerpo de texto sin formato 
                };

                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        console.log(err)

                        res.json({ exito: true, message: `se cancelo la cita pero no se pudo enviar el mensaje , favor comunicarse con ${correo}` });
                    } else {
                        console.log(info);
                        res.json({ exito: true, message: `se cancelo la cita y se envio el mensaje con su asunto y motivo de cancelacion a ${correo}` });
                        conn.close(() => {
                            console.log("Se ha cerrado la base de datos")

                        });
                    }

                });

            }
        })
    })

}



async function deleteCita(id_cita) {

    console.log('id_cita:', id_cita);
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`DELETE FROM DISPONIBILIDAD WHERE ID_DISPONIBILIDAD = '${id_cita}'`, (err, data) => {
            if (err) {

                console.log("Hubo un error en eldelete DE DISPONIBILIDADES" + err);
                return false;
            } else {

                return true;
            }
        })
    })
}

async function DevolverEtapa(correo) {


    var queryE = `UPDATE estudiante SET etapa = etapa-1 WHERE usuario_id_usuario = (select id_usuario from usuario where correo = '${correo}')`;

    ibmdb.open(connStr, (err, conn) => {

        conn.query(queryE, (err, data) => {

            if (err) {

                console.log("Hubo un error en la actualizacion de la etapa" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos ")
                })
                console.log('se actualizo la etapa correctamente');
            }
        });
    })
}




module.exports = CitasPendientesCtrl;