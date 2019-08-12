const express = require('express');
const router = express.Router();
const agendarCitaCtrl = require('../controller/agendarCita.controller')


router.get('/getHorarios', agendarCitaCtrl.getHorarios);
router.get('/getHorarioId/:id', agendarCitaCtrl.getHorarioId);
router.get('/getDisponibilidadId/:id', agendarCitaCtrl.getDisponibilidadId);
router.post('/agendarCita', agendarCitaCtrl.agendarCita);
router.post('/disponibilidadesLibres', agendarCitaCtrl.disponibilidadesLibres);
router.post('/disponibilidadesOcupadas', agendarCitaCtrl.disponibilidadesOcupadas);

router.get('/getAsesorias/:id_estudiante', agendarCitaCtrl.getAsesorias);
router.post('/asesoriasLibres', agendarCitaCtrl.asesoriasLibres);
router.post('/asesoriasOcupadas', agendarCitaCtrl.asesoriasOcupadas);

module.exports = router;