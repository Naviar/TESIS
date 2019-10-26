const ConvocatoriaCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let dbStr = require("../database")
let db = require('../db_connection');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');
// const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'consultorio.usta.DRSU@gmail.com',
//         pass: 'consultoriousta123'
//     }
// });

ConvocatoriaCtrl.openAnnouncement = (req, res) => {
    const announcement = req.body;

    console.log(announcement);





    db.query(`INSERT INTO CONVOCATORIA (NOMBRE,FECHA_INICIO, FECHA_FIN, FECHA_INFORME_INICIAL, FECHA_INFORME_FINAL, ID_USUARIO) VALUES ('${announcement.NOMBRE}','${announcement.FECHA_INICIO}', '${announcement.FECHA_FIN}', '${announcement.FECHA_INFORME_INICIAL}', '${announcement.FECHA_INFORME_FINAL}', ${announcement.ID_USUARIO});`, (err, data) => {
        if (err) {
            res.sendStatus(500).json({ error: err, message: 'error abriendo convocatoria' })
            console.log("Hubo un error abriendo la convocatoria" + err);
        } else {

            res.json({ message: 'se abrio la convocatoria exitosamente.' });
        }
    });



}

ConvocatoriaCtrl.getAnnouncements = (req, res) => {

    const query = `SELECT C.NOMBRE AS NOMBRE_CONVOCATORIA,C.ID_CONVOCATORIA, C.FECHA_INICIO, C.FECHA_FIN, C.FECHA_INFORME_INICIAL, C.FECHA_INFORME_FINAL, U.ID_USUARIO , U.NOMBRE , U.APELLIDO FROM CONVOCATORIA AS C INNER JOIN USUARIO AS U ON C.ID_USUARIO = U.ID_USUARIO ORDER BY C.FECHA_INICIO desc`;





    db.query(query, (err, data) => {
        if (err) {
            res.sendStatus(500).json({ error: err, message: 'error obteniendo convocatoria' });
            console.log("Hubo un error obteniendo las convocatoria" + err);
        } else {

            res.json({ convocatoria: data, message: 'se obtuvo las convocatoria exitosamente.' });
        }
    });

}

ConvocatoriaCtrl.updateAnnouncement = (req, res) => {

    const ID_CONVOCATORIA = req.params.id_convocatoria;
    const update = req.body;
    console.log(`actualirzar${ID_CONVOCATORIA} id convocatoria con ${JSON.stringify(req.body)}`);

    const query = `UPDATE CONVOCATORIA SET NOMBRE = '${update.NOMBRE}' , FECHA_INICIO = '${update.FECHA_INICIO}', FECHA_FIN = '${update.FECHA_FIN}', FECHA_INFORME_INICIAL = '${update.FECHA_INFORME_INICIAL}', FECHA_INFORME_FINAL = '${update.FECHA_INFORME_FINAL}', ID_USUARIO = '${update.ID_USUARIO}' WHERE ID_CONVOCATORIA = '${ID_CONVOCATORIA}'`;
    try {





        db.query(query, (err, data) => {
            if (err) {
                res.sendStatus(401).json({ error: err, message: 'error en el servidor actualizando la convocatoria' })
                console.log("Hubo un error actualizando las convocatoria" + err);
            } else {

                res.json({ message: 'se actualizo la convocatoria exitosamente.' });
            }
        });

    } catch (E) {
        console.log('error', E);
        res.sendStatus(500).json({ error: E, message: 'error en el servidor actualizando la convocatoria' })
    }
}

module.exports = ConvocatoriaCtrl;