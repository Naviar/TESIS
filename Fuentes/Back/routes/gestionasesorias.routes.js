const express = require('express');
const router = express.Router();
const gestionarAsesoria = require('../controller/gestionAsesorias.controller');

router.get('/asesorias', gestionarAsesoria.getAsesorias);
router.put('/status/:id', gestionarAsesoria.changeStatus);
router.post('/nuevaasesoria', gestionarAsesoria.nuevaAsesoria);

module.exports = router;