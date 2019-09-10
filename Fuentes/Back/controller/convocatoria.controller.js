const ConvocatoriaCtrl = {}

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

ConvocatoriaCtrl.openAnnouncement = (req, res) => {
    const announcement = req.body;

    console.log(announcement);

    ibmdb.open(connStr, (err, conn) => {

        if (err) res.sendStatus(500).json({ error: err, mensaje: 'error abriendoconvocatoria' });

        conn.query(`INSERT INTO CONVOCATORIAS (FECHA_INICIO, FECHA_FIN, FECHA_INFORME_INICIAL, FECHA_INFORME_FINAL, ID_USUARIO) VALUES ('${announcement.FECHA_INICIO}', '${announcement.FECHA_FIN}', '${announcement.FECHA_INFORME_INICIAL}', '${announcement.FECHA_INFORME_FINAL}', ${announcement.ID_USUARIO});`, (err, data) => {
            if (err) {
                res.sendStatus(500).json({ error: err, mensaje: 'error abriendo convocatoria' })
                console.log("Hubo un error abriendo la convocatoria" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ mensaje: 'se abrio la convocatoria exitosamente.' });
            }
        });
    });


}

ConvocatoriaCtrl.getAnnouncements = (req, res) => {

    const query = `SELECT C.ID_CONVOCATORIA, C.FECHA_INICIO, C.FECHA_FIN, C.FECHA_INFORME_INICIAL, C.FECHA_INFORME_FINAL, U.ID_USUARIO , U.NOMBRE , U.APELLIDO FROM CONVOCATORIAS AS C INNER JOIN USUARIO AS U ON C.ID_USUARIO = U.ID_USUARIO ORDER BY C.FECHA_INICIO ASC`;

    ibmdb.open(connStr, (err, conn) => {

        if (err) res.sendStatus(500).json({ error: err, mensaje: 'error obteniendo convocatorias' });

        conn.query(query, (err, data) => {
            if (err) {
                res.sendStatus(500).json({ error: err, mensaje: 'error abriendo convocatoria' })
                console.log("Hubo un error obteniendo las convocatorias" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ convocatorias: data, mensaje: 'se obtuvo las convocatorias exitosamente.' });
            }
        });
    });
}

module.exports = ConvocatoriaCtrl;