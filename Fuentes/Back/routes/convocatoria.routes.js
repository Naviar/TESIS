const express = require('express');
const router = express.Router();
const Convocatoria = require('../controller/convocatoria.controller')


router.post('/abrirConvocatoria', Convocatoria.openAnnouncement);
router.get('/obtenerConvocatorias', Convocatoria.getAnnouncements);
module.exports = router;