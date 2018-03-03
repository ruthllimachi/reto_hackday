var app = angular.module('app', ["ngRoute", "ngRoute", "ui.grid", "ui.grid.edit", "ui.grid.selection", "ngMask"]);

// create the controller and inject Angular's $scope
app.controller('mainCtrl', function ($scope) {
	// create a message to display in our view
	$scope.message = 'Hello world!';
});

app.config(function ($routeProvider) {

	$routeProvider
		.when("/docente", {
			templateUrl: "docente/docente.html",
			controller: "docenteCtrl"
		})
		.when("/aula", {
			templateUrl: "aula/aula.html",
			controller: "aulaCtrl"
		})		
		.otherwise({ redirectTo: "/" });
})
