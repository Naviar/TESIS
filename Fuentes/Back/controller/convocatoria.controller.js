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

        if (err) res.json({ error: err })

        conn.query(`INSERT INTO CONVOCATORIAS (FECHA_INICIO, FECHA_FIN, FECHA_INFORME_INICIAL, FECHA_INFORME_FINAL, ID_USUARIO) VALUES ('${announcement.FECHA_INICIO}', '${announcement.FECHA_FIN}', '${announcement.FECHA_INFORME_INICIAL}', '${announcement.FECHA_INFORME_FINAL}', ${announcement.ID_USUARIO});`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error abriendo la convocatoria" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ mensaje: 'se abrio la convocatoria exitosamente.' });
            }
        });
    })


}

module.exports = ConvocatoriaCtrl;