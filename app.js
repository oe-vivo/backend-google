const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require ('dotenv').config();
const passport = require('./src/config/passport-setup');
const authRoutes = require('./src/routes/authRoutes');
const session = require('express-session');
const app = express();



app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Soporte para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Soporte para formularios

// Definir rutas
app.use('/auth', authRoutes);

// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Configurar el puerto y poner el servidor a escuchar
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar la aplicación (opcional, útil para pruebas)
module.exports = app;