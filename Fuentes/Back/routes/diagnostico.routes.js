const express = require('express');
const router = express.Router();
const diagnostico = require('../controller/diagnostico.controller')

// router.get('/',loginCtrl.obtenerUsuarios);
router.post('/', diagnostico.crearDiagnostico);
router.get('/getEstudiantes', diagnostico.getEstudiantes);
router.get('/getEtapas', diagnostico.getEtapas);
router.get('/getSectores', diagnostico.getSectores);
router.get('/getAsesorias', diagnostico.getAsesorias);
router.put('/putEstudiante/:id_estudiante',diagnostico.putEstudiante);

module.exports = router;