const express = require('express');
const router = express.Router();
const reporteCtrl = require('../controller/reporte.controller');

router.get('/general', reporteCtrl.getReporteGeneral);


module.exports = router;