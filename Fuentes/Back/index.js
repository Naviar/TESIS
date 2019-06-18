const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
const path = require('path');
//Inicializaciones
const app = express();

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
app.use('/usuario', require('./routes/login.routes'));
app.use('/diagnostico', require('./routes/diagnostico.routes'));
app.use('/Horarios', require('./routes/horarios.routes'));
app.use('/agendarCita', require('./routes/agendarCita.routes'));
app.use('/evaluacion', require('./routes/evaluacion.routes'));
app.use('/gestion', require('./routes/gestionasesorias.routes'));
app.use('/asesoria', require('./routes/asesoria.routes'));
app.use('/citasPendientes', require('./routes/citaspendientes.routes'));
app.use('/autenticarUsuarios', require('./routes/autenticarusuarios.routes'));
app.use('/etapa', require('./routes/etapa.routes'));


//Archivos publicos

//Arrancar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})