const express = require('express');
const router = express.Router();
const seguimientoCtrl = require('../controller/seguimiento.controller')

router.get('/getEstudiantes', seguimientoCtrl.getEstudiantes);
router.get('/getEstudianteAsesoria/:id_asesoria', seguimientoCtrl.getEstudianteAsesoria);
router.get('/getDiagnosticos/:id_estudiante', seguimientoCtrl.getDiagnosticos);
router.get('/getDiagnostico/:id_diagnostico', seguimientoCtrl.getDiagnostico);
router.get('/getAsesorias/:id_estudiante', seguimientoCtrl.getAsesorias);
router.get('/getAsesoria/:id_asesoria', seguimientoCtrl.getAsesoria);
router.get('/getEvaluaciones/:id_estudiante', seguimientoCtrl.getEvaluaciones);
router.get('/getEvaluacion/:id_evaluacion', seguimientoCtrl.getEvaluacion);
router.get('/getConvocatoria/:id_usuario', seguimientoCtrl.getConvocatoria);
router.get('/getProyecto/:id_usuario', seguimientoCtrl.getProyecto);
router.get('/getDocente/:id_usuario', seguimientoCtrl.getDocente);
router.get('/getEstudiante/:id_usuario', seguimientoCtrl.getEstudiante);
router.get('/getNameAsesoria/:id_asesoria', seguimientoCtrl.getNameAsesoria);
router.get('/getCompromisosAsesoria/:id_asesoria', seguimientoCtrl.getCompromisosAsesoria);





module.exports = router;