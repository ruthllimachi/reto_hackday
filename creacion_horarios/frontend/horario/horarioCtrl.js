app.controller('horarioCtrl', ['$scope', 'service', function ($scope, service) {
	$scope.listaAulas = [];
	$scope.listaMaterias = [];
	$scope.listaDias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
	$scope.sw = true;

	$scope.nuevoHorario = function () {
		$scope.horario = new Object();
		$scope.horario.hora_inicio = (new Date()).getHours().toString() + ":" + (new Date()).getMinutes().toString() + ":" + (new Date()).getSeconds().toString();
		$scope.horario.hora_final = (new Date()).getHours().toString() + ":" + (new Date()).getMinutes().toString() + ":" + (new Date()).getSeconds().toString();
		$scope.sw = false;
	}

	var refresh = function () {
		service.listaHorarios()
			.then(function (res) {
				$scope.listaHorarios = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	};


	$scope.gridOptions = {
		data: 'listaHorarios',
		enableFiltering: true,
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		multiSelect: false,
		noUnselect: true,
		onRegisterApi: function (gridApi) {
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.horario = new Object();
				$scope.horario.id_horario = row.entity.id_horario;
				$scope.horario.fid_aula = row.entity.fid_aula;
				$scope.horario.fid_materia = row.entity.fid_materia;
				$scope.horario.dia = row.entity.dia;
				$scope.horario.hora_inicio = row.entity.hora_inicio;
				$scope.horario.hora_final = row.entity.hora_final;
			});
		},
		columnDefs: [
			{
				field: 'materia.codigo',
				displayName: 'Codigo Materia',
				width: '5%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'materia.descripcion',
				displayName: 'Descripcion Materia',
				width: '15%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'aula.codigo',
				displayName: 'Codigo Aula',
				width: '5%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'aula.descripcion',
				displayName: 'Descripcion Aula',
				width: '15%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'dia',
				displayName: 'Dia Semana',
				width: '10%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'hora_inicio',
				displayName: 'Hora Inicio',
				width: '7%',
				headerClass: "header-center",
				cellClass: "text-right",
				sortable: true
			},
			{
				field: 'hora_final',
				displayName: 'Hora Final',
				width: '7%',
				headerClass: "header-center",
				cellClass: "text-right",
				sortable: true
			},
		]
	};

	function init() {
		refresh();
		service.listaAulas()
			.then(function (res) {
				$scope.listaAulas = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})

		service.listaMaterias()
			.then(function (res) {
				$scope.listaMaterias = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	init();

	$scope.adicionarHorario = function () {
		console.log("nuevo horario", $scope.horario);
		service.nuevoHorario($scope.horario)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}

	$scope.actualizarHorario = function () {
		service.modificaHorario($scope.horario)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}
}]);
