const express = require('express');
const router = express.Router();
const subirarchivosCtrl = require('../controller/subirarchivos.controller')

router.get('/upload', subirarchivosCtrl.upload);
router.get('/getDocumentos', subirarchivosCtrl.getDocumentos);
router.get('/getProyectos', subirarchivosCtrl.getProyectos);
router.get('/getProyectosById/:id_usuario', subirarchivosCtrl.getProyectosById);
router.get('/getProyectosFacultad/:facultad', subirarchivosCtrl.getProyectosFacultad);
router.get('/getProyectosDocente/:docente', subirarchivosCtrl.getProyectosDocente);
router.get('/getProyectosByEtapa/:etapa', subirarchivosCtrl.getProyectosByEtapa);
router.get('/getDocumentosEtapa/:etapa', subirarchivosCtrl.getDocumentosEtapa);
router.get('/getDocumentosByEtapa/:etapa', subirarchivosCtrl.getDocumentosByEtapa);
router.post('/crearProyecto', subirarchivosCtrl.crearProyecto);
router.post('/proyectoDuplicado', subirarchivosCtrl.proyectoDuplicado);
router.put('/updateProjectStage/:ID_PROYECTO', subirarchivosCtrl.updateStageProjects);
router.put('/updateFixes/:ID_PROYECTO', subirarchivosCtrl.updateFixes);


module.exports = router;