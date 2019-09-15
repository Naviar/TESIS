const express = require('express');
const router = express.Router();
const Convocatoria = require('../controller/convocatoria.controller')


router.post('/abrirConvocatoria', Convocatoria.openAnnouncement);
router.get('/obtenerConvocatorias', Convocatoria.getAnnouncements);
router.put('/actualizarConvocatoria/:id_convocatoria', Convocatoria.updateAnnouncement);
module.exports = router;