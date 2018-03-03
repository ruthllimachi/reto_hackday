app.service('service', ['$http', function ($http) {
    this.listaDocentes = function () {
        return $http.get('/api/docentes');
    }

    this.modificarDocente = function (data) {
        return $http.patch('/api/docente/' + data.id_docente, data);
    }


    this.nuevaDocente = function (data) {
        return $http.post('/api/docente/', data);
    }

    this.buscarDocente = function (id) {
        return $http.get('/api/docente/' + id);
    }

    this.listaAulas = function () {
        return $http.get('/api/aulas');
    }

    this.modificarAula = function (data) {
        return $http.patch('/api/aula/' + data.id_aula, data);
    }

    this.nuevaAula = function (data) {
        return $http.post('/api/aula/', data);
    }

    this.buscarAula = function (id) {
        return $http.get('/api/aula/' + id);
    }


    this.listaMaterias = function () {
        return $http.get('/api/materias');
    }

    this.nuevaMateria = function (data) {
        return $http.post('/api/materia/', data);
    }

    this.modificaMateria = function (data) {
        return $http.patch('/api/materia/' + data.id_materia, data);
    }
}]);