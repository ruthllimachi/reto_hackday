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
    //////////////////////////////////////////    

    this.listaReservas = function () {
        return $http.get('/api/reservas');
    }

    this.nuevaReserva = function (data) {
        return $http.post('/api/reserva/', data);
    }

    this.modificaReserva = function (data) {
        return $http.patch('/api/reserva/' + data.id_reserva, data);
    }
}]);