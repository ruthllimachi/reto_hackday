const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 1337;
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('./db');

// convertimos el cuerpo del mensaje
app.use(bodyParser.json());



// Sincronizamos la base de datos
models.sequelize.sync().done(() => {
  console.log("\n***Base de datos generada");
  app.listen(port, (err) => {
    err
      ? console.log('Cannot connect...', err)
      : console.log('Connect! Server is listening on port', port);
  });
});

// Habilitamos los logs
app.use(morgan("dev"));

//////app.set('view engine', 'html');

app.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);
//////app.use(express.static(path.join(__dirname, '../frontend')));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

app.use('/api', routes);

/* router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
}); */
