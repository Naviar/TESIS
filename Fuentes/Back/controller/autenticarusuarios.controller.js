const AutenticarUsuariosCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let dbStr = require("../database")
let db = require('../db_connection');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');

AutenticarUsuariosCtrl.getAsesores = (req, res) => {



    db.query(`SELECT * FROM usuario WHERE rol_id_rol = '${2}' AND fecha >= CURRENT_DATE - 1 YEAR;`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE ASESORES" + err);
        } else {

            res.json(data);
        }
    });

}

AutenticarUsuariosCtrl.getEstudiantes = (req, res) => {



    db.query(`SELECT * FROM usuario WHERE rol_id_rol = '${3}' AND fecha >= CURRENT_DATE - 1 YEAR;`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE ESTUDIANTES" + err);
        } else {

            res.json(data);
        }
    });

}
AutenticarUsuariosCtrl.getUsuarios = (req, res) => {



    db.query(`SELECT * FROM usuario WHERE rol_id_rol in ('${3}' , '${2}' , '${1}')`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE USUARIOS" + err);
        } else {

            res.json(data);
        }
    });

}
AutenticarUsuariosCtrl.getLiderId = (req, res) => {
    let id = req.params.id;



    db.query(`SELECT * FROM usuario WHERE id_usuario = '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE LIDERES" + err);
        } else {

            res.json(data);
        }
    });

}
AutenticarUsuariosCtrl.getAsesorId = (req, res) => {
    let id = req.params.id;



    db.query(`SELECT u.*, a.facultad_id_facultad FROM usuario AS u INNER JOIN asesor AS a ON u.id_usuario = a.usuario_id_usuario WHERE u.id_usuario = '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE ASESORES" + err);
        } else {

            res.json(data);
        }
    });

}

AutenticarUsuariosCtrl.getEstudianteId = (req, res) => {
    let id = req.params.id;



    db.query(`SELECT u.*, e.* FROM usuario AS u INNER JOIN estudiante AS e ON u.id_usuario = e.usuario_id_usuario WHERE u.id_usuario = '${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda DE ESTUDIANTES" + err);
        } else {

            res.json(data);
        }
    });

}

AutenticarUsuariosCtrl.changeStatus = async(req, res) => {

    const { id } = req.params;
    const activo = req.body.status;

    console.log(`change status ${id} , activo: ${activo} y req.body= ${req.body}`);




    db.query(`UPDATE usuario SET activo='${activo}' WHERE id_usuario='${id}' `, (err, data) => {
        if (err) {
            res.json({ status: false });
            console.log("Hubo un error actualizando el status asesoria" + err);
        } else {

            res.json({ status: true });
        }
    });


}

module.exports = AutenticarUsuariosCtrl;