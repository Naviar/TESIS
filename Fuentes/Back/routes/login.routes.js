const express = require('express');
const router = express.Router();
const loginCtrl = require('../controller/login.controller')

router.get('/',loginCtrl.obtenerUsuarios);
router.get('/logout',loginCtrl.logout);
router.post('/login',loginCtrl.authentication);
router.post('/register',loginCtrl.register);
router.post('/registerAsesor',loginCtrl.registerAsesor);
router.post('/registerDecano',loginCtrl.registerDecano);
router.post('/registerEstudiante',loginCtrl.registerEstudiante);
router.get('/logout',loginCtrl.logout);
router.get('/roles', loginCtrl.getRoles);
router.get('/facultades', loginCtrl.getFacultades);
router.get('/docentes', loginCtrl.getDocentes);
router.get('/jornadas', loginCtrl.getJornadas);
router.get('/id/:correo', loginCtrl.getIdUsuario);
router.post('/usuarioDuplicado', loginCtrl.usuarioDuplicado);
router.post('/estudianteDuplicado', loginCtrl.estudianteDuplicado);
router.post('/recoveryPassword', loginCtrl.recoveryPassword);
router.post('/recoveryCode', loginCtrl.recoveryCode);




module.exports = router;