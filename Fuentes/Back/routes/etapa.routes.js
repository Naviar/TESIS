const express = require('express');
const router = express.Router();
const etapa = require('../controller/etapa.controller')


router.get('/getEtapa/:id_estudiante', etapa.getEtapa);
router.put('/putEtapa/:id_estudiante', etapa.putEtapa);

module.exports = router;