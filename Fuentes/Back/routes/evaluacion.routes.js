const express = require('express');
const router = express.Router();
const evaluacion = require('../controller/evaluacion.controller')

// router.get('/',loginCtrl.obtenerUsuarios);
router.post('/', evaluacion.crearEvaluacion);
router.put('/updateEvalDiagnostico', evaluacion.updateEvaluacionDiagnostico);
router.put('/updateEvalAsesoria', evaluacion.updateEvaluacionAsesoria);


module.exports = router;