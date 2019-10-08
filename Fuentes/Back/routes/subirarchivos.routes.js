const express = require('express');
const router = express.Router();
const subirarchivosCtrl = require('../controller/subirarchivos.controller')

router.get('/upload', subirarchivosCtrl.upload);
router.get('/getDocumentos', subirarchivosCtrl.getDocumentos);
router.get('/getProyectos', subirarchivosCtrl.getProyectos);
router.get('/getProyectosFacultad/:facultad', subirarchivosCtrl.getProyectosFacultad);
router.get('/getProyectosDocente/:docente', subirarchivosCtrl.getProyectosDocente);
router.get('/getDocumentosEtapa/:etapa', subirarchivosCtrl.getDocumentosEtapa);
router.post('/crearProyecto', subirarchivosCtrl.crearProyecto);
router.post('/proyectoDuplicado', subirarchivosCtrl.proyectoDuplicado);


module.exports = router;