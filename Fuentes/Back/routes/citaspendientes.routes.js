const express = require('express');
const router = express.Router();
const CitasPendientesCtrl = require('../controller/citaspendientes.controller')


router.get('/getCitas', CitasPendientesCtrl.getCitas);
router.get('/getCitasEstudiante/:id_estudiante', CitasPendientesCtrl.getCitasEstudiante);
router.get('/getCitasAsesor/:id_asesor', CitasPendientesCtrl.getCitasAsesor);
router.get('/getCitasLider/:id_lider', CitasPendientesCtrl.getCitasLider);
router.get('/getHorarioId/:id', CitasPendientesCtrl.getHorarioId);


module.exports = router;