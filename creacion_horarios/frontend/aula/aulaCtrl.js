app.controller('aulaCtrl', ['$scope', 'service', function ($scope, service) {
	var refresh = function () {
		service.listaAulas()
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

	$scope.editAula = function (id) {
		service.buscarAula(id)
			.then(function (response) {
				$scope.aula = response.data;
			});
	};
	

	$scope.addAula = function () {
		service.nuevaAula($scope.aula)
			.then(function (response) {
				$scope.aula = {};
				refresh();
			});
	};

	$scope.updateAula = function () {
		service.modificarAula($scope.aula)
			.then(function (response) {
				$scope.aula = {};
				refresh();
			});
	};

	init();
}]);
