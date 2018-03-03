const express = require('express');
const router = express.Router();
const db = require('./db');
var aula = db.aula;

exports.getAulas = (req, res) => {
  Promise.resolve()
    .then(() => listarAulas())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.getAula = (req, res) => {
  Promise.resolve()
    .then(() => buscarAula(req.params.idAula))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave')
    });
};

exports.postAula = (req, res) => {
  Promise.resolve()
    .then(() => crearAula(req.body))
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(500).json('Error grave'));
};

exports.patchAula = (req, res) => {
  Promise.resolve()
    .then(() => modificarAula(req.body, req.params.idAula))
    .then(() => buscarAula(req.params.idAula))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });

};

exports.deleteAula = (req, res) => {
  Promise.resolve()
    .then(() => borrarAula(req.params.idAula))
    .then(() => {
      res.json('Aula eliminado');
    })
    .catch((err) => {
      res.status(500).json('Error grave');
    });
};


/**
 * function for Aula
 */

function listarAulas() {
  return aula.findAll()
    .then(respuesta => {
      console.log("\n***Listando aulas");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => {
      // logger
      throw error;
    });
}

function buscarAula(id) {
  return aula.findById(id)
    .then(respuesta => {
      return respuesta;
    }).catch(error => {
      // logger
      throw error;
    });
}



function crearAula(data) {
  return aula.create(data)
    .then(respuesta => {
      console.log("\n***creando aula", data);
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function modificarAula(data, idAula) {
  var codigo = data.codigo;
  var descripcion = data.descripcion;

  return aula.update({
    codigo,
    descripcion
  }, {
      where: {
        id_aula: idAula,
      },
      // returning: true,
    })
    .then(respuesta => {
      console.log("\n***modificando aula");
      console.log(JSON.stringify(respuesta));
      return respuesta;
    }).catch(error => console.log(error));
}

function borrarAula(idAula) {
  aula.destroy({
    where: { id_aula: idAula },
  })
    .then(respuesta => {
      console.log("\n***Eliminando aula");
      console.log(JSON.stringify(respuesta));
    }).catch(error => console.log(error));

}

