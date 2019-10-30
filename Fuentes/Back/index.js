const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
const path = require('path');
//Inicializaciones
const app = express();

//notificaciones
const notificaciones = require('../Back/controller/notificaciones.controller');







//Configuraciones
app.set('port', process.env.PORT || 3500)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname + '/public')));


//Variables globales

app.get('/front/*', (req, res) => {
    res.sendFile(path.join(__dirname + 'public/index.html'));
})

//Rutas
app.use('/api/usuario', require('./routes/login.routes'));
app.use('/api/diagnostico', require('./routes/diagnostico.routes'));
app.use('/api/Horarios', require('./routes/horarios.routes'));
app.use('/api/agendarCita', require('./routes/agendarCita.routes'));
app.use('/api/evaluacion', require('./routes/evaluacion.routes'));
app.use('/api/gestion', require('./routes/gestionasesorias.routes'));
app.use('/api/asesoria', require('./routes/asesoria.routes'));
app.use('/api/citasPendientes', require('./routes/citaspendientes.routes'));
app.use('/api/autenticarUsuarios', require('./routes/autenticarusuarios.routes'));
app.use('/api/etapa', require('./routes/etapa.routes'));
app.use('/api/seguimiento', require('./routes/seguimiento.routes'));
app.use('/api/reporte', require('./routes/reporte.routes'));
app.use('/api/subirarchivos', require('./routes/subirarchivos.routes'));
app.use('/api/convocatoria', require('./routes/convocatoria.routes'));



//Archivos publicos

//Arrancar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})