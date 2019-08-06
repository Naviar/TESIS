const CitasPendientesCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');


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

module.exports = CitasPendientesCtrl;