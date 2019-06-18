const express = require('express');
const router = express.Router();
const horariosCtrl = require('../controller/horarios.controller')

router.post('/AddHorario', horariosCtrl.postHorario);
router.post('/disponibilidades', horariosCtrl.postDisponibilidades);
router.get('/gethorarios/:id', horariosCtrl.getHorarios);
router.get('/getTiposReunion', horariosCtrl.getTipoReunion);
router.get('/getTiposAsesorias', horariosCtrl.getTiposAsesorias);
router.get('/getDisponibilidades/:id', horariosCtrl.getDisponibilidadeslibreshorario);
router.delete('/deleteHorario/:id', horariosCtrl.deleteHorario);
// router.put('/updateHorario', horariosCtrl.updateHorario);


module.exports = router;