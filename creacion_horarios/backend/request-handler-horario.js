const express = require('express');
const router = express.Router();
const db = require('./db');
var horario = db.horario;
var materia = db.materia;
var aula = db.aula;


exports.getHorarios = (req, res) => {
  Promise.resolve()
    .then(() => listarHorarios())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.getHorario = (req, res) => {
  Promise.resolve()
    .then(() => buscarHorario(req.params.idHorario))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.postHorario = (req, res) => {
  Promise.resolve()
    .then(() => crearHorario(req.body))
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(500).json('Error grave'));
};

exports.patchHorario = (req, res) => {
  Promise.resolve()
    .then(() => modificarHorario(req.body, req.params.idHorario))
    .then(() => buscarHorario(req.params.idHorario))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });
};


/** 
 * horario function
*/
function listarHorarios() {
  return horario.findAll({
    include: [
      { model: materia, as: 'materia' },
      { model: aula, as: 'aula' }
    ],

  })
    .then(respuesta => {
      console.log("\n***Listando de Horarios");
      console.log(JSON.stringify(respuesta));

      return respuesta;
    }).catch(error => console.log(error));
}

function buscarHorario(id) {
  return horario.findOne({
    where: { id_horario: id },
    include: [
      { model: materia, as: 'materia' },
      { model: aula, as: 'aula' }
    ],

  })
    .then(respuesta => {
      console.log("\n***horario encontrado");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function crearHorario(data) {
  return horario.create(data)
    .then(respuesta => {
      console.log("\n***creando horario", data);
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarHorario(data, idHorario) {
  return horario.update({
    estado
  }, {
      where: {
        id_horario: idHorario,
      },
      // returning: true,
    })
    .then(respuesta => {
      console.log("\n***modificando horario");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}
