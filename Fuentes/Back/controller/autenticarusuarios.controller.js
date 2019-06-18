const AutenticarUsuariosCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');

AutenticarUsuariosCtrl.getAsesores =  (req, res) => {

    ibmdb.open(connStr, (err, conn) => {

       conn.query(`SELECT * FROM usuario WHERE rol_id_rol = '${2}'`, (err, data) => {
           if (err) {
               res.json({ error: err })
               console.log("Hubo un error en la busqueda DE ASESORES" + err);
           } else {
               conn.close(() => {
                   console.log("Se ha cerrado la base de datos")
               })
               res.json(data)
           }
       })
   })
}

AutenticarUsuariosCtrl.getEstudiantes =  (req, res) => {

    ibmdb.open(connStr, (err, conn) => {

       conn.query(`SELECT * FROM usuario WHERE rol_id_rol = '${3}'`, (err, data) => {
           if (err) {
               res.json({ error: err })
               console.log("Hubo un error en la busqueda DE ESTUDIANTES" + err);
           } else {
               conn.close(() => {
                   console.log("Se ha cerrado la base de datos")
               })
               res.json(data)
           }
       })
   })
}
AutenticarUsuariosCtrl.getAsesorId =  (req, res) => {
    let id = req.params.id;

    ibmdb.open(connStr, (err, conn) => {

       conn.query(`SELECT u.*, a.facultad_id_facultad FROM usuario AS u INNER JOIN asesor AS a ON u.id_usuario = a.usuario_id_usuario WHERE u.id_usuario = '${id}'`, (err, data) => {
           if (err) {
               res.json({ error: err })
               console.log("Hubo un error en la busqueda DE ASESORES" + err);
           } else {
               conn.close(() => {
                   console.log("Se ha cerrado la base de datos")
               })
               res.json(data)
           }
       })
   })
}

AutenticarUsuariosCtrl.getEstudianteId =  (req, res) => {
    let id = req.params.id;

    ibmdb.open(connStr, (err, conn) => {

       conn.query(`SELECT u.*, e.* FROM usuario AS u INNER JOIN estudiante AS e ON u.id_usuario = e.usuario_id_usuario WHERE u.id_usuario = '${id}'`, (err, data) => {
           if (err) {
               res.json({ error: err })
               console.log("Hubo un error en la busqueda DE ESTUDIANTES" + err);
           } else {
               conn.close(() => {
                   console.log("Se ha cerrado la base de datos")
               })
               res.json(data)
           }
       })
   })
}

AutenticarUsuariosCtrl.changeStatus = async(req, res) => {

    const { id } = req.params;
    const activo = req.body.status;

    console.log(`change status ${id} , activo: ${activo} y req.body= ${req.body}`);

    await ibmdb.open(connStr, (err, conn) => {


        conn.query(`UPDATE usuario SET activo='${activo}' WHERE id_usuario='${id}' `, (err, data) => {
            if (err) {
                res.json({ status: false })
                console.log("Hubo un error actualizando el status asesoria" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ status: true })
            }
        })
    })

}

module.exports = AutenticarUsuariosCtrl;