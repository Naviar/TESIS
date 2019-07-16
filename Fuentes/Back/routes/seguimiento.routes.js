const express = require('express');
const router = express.Router();
const seguimientoCtrl = require('../controller/seguimiento.controller')

router.get('/getEstudiantes',seguimientoCtrl.getEstudiantes);





module.exports = router;