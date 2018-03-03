app.controller('docenteCtrl', ['$scope', 'service', function ($scope, service) {
	var refresh = function () {
		service.listaDocentes()
			.then(function (res) {
				$scope.lista = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	};


	function init() {
		refresh();
	}

	$scope.editDocente = function (id) {
		service.buscarDocente(id)
			.then(function (response) {
				$scope.docente = response.data;
			});
	};
	

	$scope.addDocente = function () {
		service.nuevaDocente($scope.docente)
			.then(function (response) {
				$scope.docente = {};
				refresh();
			});
	};

	$scope.updateDocente = function () {
		service.modificarDocente($scope.docente)
			.then(function (response) {
				$scope.docente = {};
				refresh();
			});
	};

	init();
}]);
