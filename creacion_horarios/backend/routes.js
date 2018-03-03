const express = require('express');
const router = express.Router();
const requestHandlerDocente = require('./request-handler-docente');
const requestHandlerAula = require('./request-handler-aula');
const requestHandlerMateria = require('./request-handler-materia');
const requestHandlerHorario = require('./request-handler-horario');

router.get('/docentes', requestHandlerDocente.getDocentes);
router.get('/docente/:idDocente', requestHandlerDocente.getDocente);
router.post('/docente', requestHandlerDocente.postDocente);
router.patch('/docente/:idDocente', requestHandlerDocente.patchDocente);
router.delete('/docente/:idDocente', requestHandlerDocente.deleteDocente);

router.get('/aulas', requestHandlerAula.getAulas);
router.get('/aula/:idAula', requestHandlerAula.getAula);
router.post('/aula', requestHandlerAula.postAula);
router.patch('/aula/:idAula', requestHandlerAula.patchAula);
router.delete('/aula/:idAula', requestHandlerAula.deleteAula);

router.get('/materias', requestHandlerMateria.getMaterias);
router.get('/materia/:idMateria', requestHandlerMateria.getMateria);
router.post('/materia', requestHandlerMateria.postMateria);
router.patch('/materia/:idMateria', requestHandlerMateria.patchMateria);

router.get('/horarios', requestHandlerHorario.getHorarios);
router.get('/horario/:idMateria', requestHandlerHorario.getHorario);
router.post('/horario', requestHandlerHorario.postHorario);
router.patch('/horario/:idMateria', requestHandlerHorario.patchHorario);



module.exports = router;