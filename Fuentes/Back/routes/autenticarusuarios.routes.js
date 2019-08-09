const express = require('express');
const router = express.Router();
const AutenticarUsuariosCtrl = require('../controller/autenticarusuarios.controller')


router.get('/getAsesores', AutenticarUsuariosCtrl.getAsesores);
router.get('/getEstudiantes', AutenticarUsuariosCtrl.getEstudiantes);
router.get('/getUsuarios', AutenticarUsuariosCtrl.getUsuarios);
router.get('/getAsesorId/:id', AutenticarUsuariosCtrl.getAsesorId);
router.get('/getEstudianteId/:id', AutenticarUsuariosCtrl.getEstudianteId);
router.put('/changeStatus/:id', AutenticarUsuariosCtrl.changeStatus);

module.exports = router;