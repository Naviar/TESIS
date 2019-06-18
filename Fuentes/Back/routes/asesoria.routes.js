const express = require('express');
const router = express.Router();
const asesoriaCtrl = require('../controller/asesoria.controller')

router.get('/getEstudiantes', asesoriaCtrl.getEstudiantes);
router.get('/getAsesorias', asesoriaCtrl.getAsesorias);
router.get('/getAsesoriaActual/:id', asesoriaCtrl.getAsesoriaActual);
router.post('/postFormAsesoria', asesoriaCtrl.postFormAsesoria);
router.post('/postAsesoriaEstudiante', asesoriaCtrl.postAsesoriaEstudiante);
router.post('/postCompromisos', asesoriaCtrl.postCompromisos);
module.exports = router;