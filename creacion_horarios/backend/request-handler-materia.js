const express = require('express');
const router = express.Router();
const db = require('./db');
var materia = db.materia;
var docente = db.docente;

exports.getMaterias = (req, res) => {
  Promise.resolve()
    .then(() => listarMaterias())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

/**
 * Busca la materia 
 * Tambien, si la materia ya existe no se puede asignar a otro docente 
 */

exports.getMateria = (req, res) => {
  Promise.resolve()
    .then(() => buscarMateria(req.params.idMateria))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};


exports.postMateria = (req, res) => {
  Promise.resolve()
    .then(() => crearMateria(req.body))
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(500).json('Error grave'));
};

exports.patchMateria = (req, res) => {
  Promise.resolve()
    .then(() => modificarMateria(req.body, req.params.idMateria))
    .then(() => buscarMateria(req.params.idMateria))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });
};


/** 
 * materia function
*/
function listarMaterias() {
  return materia.findAll({
    include: [
      { model: docente, as: 'docente' }
    ],

  })
    .then(respuesta => {
      console.log("\n***Listando de materias");
      console.log(JSON.stringify(respuesta));

      return respuesta;
    }).catch(error => console.log(error));
}

function buscarMateria(id) {
  return materia.findOne({
    where: { id_materia: id },
    include: [
      { model: docente, as: 'docente' }
    ],
  })
    .then(respuesta => {
      console.log("\n***materia encontrado");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function crearMateria(data) {
  return materia.create(data)
    .then(respuesta => {
      console.log("\n***creando materia", data);
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarMateria(data, idMateria) {
  var descripcion = data.descripcion; 
  return materia.update({
    descripcion
  }, {
      where: {
        id_materia: idMateria,
      },
      // returning: true,
    })
    .then(respuesta => {
      console.log("\n***modificando materia");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function buscarCodigo(codigo_materia) {
  return materia.findOne({
    where: { codigo: codigo_materia },
    include: [
      { model: docente, as: 'docente' }
    ],
  })
    .then(respuesta => {
      console.log("\n***materia no valido encontrado ");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}


