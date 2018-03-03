app.controller('materiaCtrl', ['$scope', 'service', function ($scope, service) {
	$scope.listaDocentes = [];
	$scope.sw = true;

	$scope.nuevaMateria = function () {
		$scope.materia = new Object();		
		$scope.sw = false;
	}

	var refresh = function () {
		service.listaMaterias()
			.then(function (res) {
				$scope.listaMaterias = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	};


	$scope.gridOptions = {
		data: 'listaMaterias',
		enableFiltering: true,
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		multiSelect: false,
		noUnselect: true,
		onRegisterApi: function (gridApi) {
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.materia = new Object();
				$scope.materia.id_materia = row.entity.id_materia;
				$scope.materia.fid_docente = row.entity.fid_docente;
				$scope.materia.codigo = row.entity.codigo;
				$scope.materia.descripcion = row.entity.descripcion;
			});
		},
		columnDefs: [
			{
				field: 'docente.nombres',
				displayName: 'Nombres Docente',
				width: '20%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'docente.apellidos',
				displayName: 'Apellidos Docente',
				width: '30%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'codigo',
				displayName: 'Codigo Materia',
				width: '20%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'descripcion',
				displayName: 'Descripcion Materia',
				width: '40%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			}

		]
	};

	function init() {
		refresh();
		service.listaDocentes()
			.then(function (res) {
				$scope.listaDocentes = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	init();

	$scope.adicionarMateria = function () {
		console.log("materia tiene ", $scope.materia);
		service.nuevaMateria($scope.materia)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}

	$scope.actualizarMateria = function () {
		service.modificaMateria($scope.materia)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}
	
}]);
