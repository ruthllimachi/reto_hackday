app.controller('reservaCtrl', ['$scope', 'service', function ($scope, service) {
	$scope.listaSalas = [];
	$scope.listaPersonas = [];
	$scope.listaEstados = ["LIBRE", "OCUPADO", "CANCELADO"];
	$scope.sw = true;

	$scope.nuevaReserva = function () {
		$scope.reserva = new Object();
		$scope.fecha_reserva_view = new Date(convertDateToDDMMYYY(new Date()));
		$scope.reserva.hora_inicio = (new Date()).getHours().toString() + ":" + (new Date()).getMinutes().toString() + ":" + (new Date()).getSeconds().toString();
		$scope.reserva.hora_final = (new Date()).getHours().toString() + ":" + (new Date()).getMinutes().toString() + ":" + (new Date()).getSeconds().toString();
		$scope.sw = false;
	}

	var refresh = function () {
		service.listaReservas()
			.then(function (res) {
				$scope.listaReserva = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	};


	$scope.gridOptions = {
		data: 'listaReserva',
		enableFiltering: true,
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		multiSelect: false,
		noUnselect: true,
		onRegisterApi: function (gridApi) {
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.reserva = new Object();
				$scope.reserva.id_reserva = row.entity.id_reserva;
				$scope.reserva.fid_persona = row.entity.fid_persona;
				$scope.reserva.fid_sala = row.entity.fid_sala;
				$scope.reserva.fecha_reserva = row.entity.fecha_reserva;
				$scope.fecha_reserva_view = new Date(convertDateToDDMMYYY(new Date(row.entity.fecha_reserva)));
				$scope.reserva.hora_inicio = row.entity.hora_inicio;
				$scope.reserva.hora_final = row.entity.hora_final;
				$scope.reserva.numero_horas = row.entity.numero_horas;
				$scope.reserva.estado = row.entity.estado;
			});
		},
		columnDefs: [
			{
				field: 'sala.codigo',
				displayName: 'Sala Codigo',
				width: '5%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'sala.descripcion',
				displayName: 'Sala Descripcion',
				width: '15%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'persona.nombres',
				displayName: 'Persona Nombres',
				width: '15%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'persona.apellidos',
				displayName: 'Persona Apellidos',
				width: '15%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'fecha_reserva',
				displayName: 'Fecha Reserva',
				width: '10%',
				headerClass: "header-center",
				cellClass: "text-center",
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
			{
				field: 'numero_horas',
				displayName: 'Horas',
				width: '5%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			},
			{
				field: 'estado',
				displayName: 'Estado',
				width: '10%',
				headerClass: "header-center",
				cellClass: "text-left",
				sortable: true
			}

		]
	};

	function init() {
		refresh();
		service.listaSalas()
			.then(function (res) {
				$scope.listaSalas = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})

		service.listaPersonas()
			.then(function (res) {
				$scope.listaPersonas = res.data;
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	init();

	$scope.adicionarReserva = function () {
		var hora_1 = parseInt($scope.reserva.hora_inicio.substring(0, 2));
		var hora_2 = parseInt($scope.reserva.hora_final.substring(0, 2));
		var horas = hora_2 - hora_1;
		$scope.reserva.numero_horas = horas;
		$scope.reserva.fecha_reserva = convertDateToYYYMMDD2($scope.fecha_reserva_view);
		service.nuevaReserva($scope.reserva)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}

	$scope.actualizarReserva = function () {
		service.modificaReserva($scope.reserva)
			.then(function (response) {
				$scope.sw = true;
				refresh();
			});
	}


	function convertDateToDDMMYYY(fechaOrigen) {
		var fechadias;
		var anio = fechaOrigen.getFullYear();
		var mes = fechaOrigen.getMonth() + 1;
		var dia = fechaOrigen.getDate();

		if (mes.toString().length < 2) {
			mes = "0".concat(mes);
		}
		if (dia.toString().length < 2) {
			dia = "0".concat(dia);
		}
		fechadias = mes + "/" + dia + "/" + anio;
		return fechadias;
	}

	function convertDateToYYYMMDD2(fechaOrigen) {
		var fechadias;
		var anio = fechaOrigen.getFullYear();
		var mes = fechaOrigen.getMonth() + 1;
		var dia = fechaOrigen.getDate();

		if (mes.toString().length < 2) {
			mes = "0".concat(mes);
		}

		if (dia.toString().length < 2) {
			dia = "0".concat(dia);
		}
		fechadias = anio + "-" + mes + "-" + dia;
		return fechadias;
	}
}]);
