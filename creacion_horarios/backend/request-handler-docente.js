const express = require('express');
const router = express.Router();
const db = require('./db');
var docente = db.docente;

exports.getDocentes = (req, res) => {
  Promise.resolve()
    .then(() => listarDocentes())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.getDocente = (req, res) => {
  Promise.resolve()
    .then(() => buscarDocente(req.params.idDocente))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.postDocente = (req, res) => {
  Promise.resolve()
    .then(() => crearDocente(req.body))
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(500).json('Error grave'));
};

exports.patchDocente = (req, res) => {
  Promise.resolve()
    .then(() => modificarDocente(req.body, req.params.idDocente))
    .then(() => buscarDocente(req.params.idDocente))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });
};

exports.deleteDocente = (req, res) => {
  Promise.resolve()
    .then(() => borrarDocente(req.params.idDocente))
    .then(() => {
      res.json('Docente eliminada');
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });
};


/**
 * Docente function
 */

function listarDocentes() {
  return docente.findAll()
    .then(respuesta => {
      console.log("\n***Listando docentes");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => {
      // logger
      throw error;
    });
}

function buscarDocente(id) {
  return docente.findById(id)
    .then(respuesta => {
      return respuesta;
    }).catch(error => {
      // logger
      throw error;
    });
}

function crearDocente(data) {
  return docente.create(data)
    .then(respuesta => {
      console.log("\n***creando docente", data);
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarDocente(data, idDocente) {
  var nombres = data.nombres;
  var apellidos = data.apellidos;
  return docente.update({
    nombres,
    apellidos
  }, {
      where: {
        id_docente: idDocente
      },
      // returning: true,
    })
    .then(respuesta => {
      console.log("\n***modificando docente");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function borrarDocente(idDocente) {
  docente.destroy({
    where: { id_docente: idDocente },
  })
    .then(respuesta => {
      console.log("\n***Eliminando docente");
      console.log(JSON.stringify(respuesta));
    }).catch(error => console.log(error));

}

