(function(a, window){var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
  // See Listing 19-2 for complete code
}]);

app.factory('EmployeeService', ['$resource', function($resource) {
  // See Listing 19-3 for complete code
}]);
app.controller('edit', ['$scope', 'EmployeeService','$routeParams', function($scope, EmployeeService, $routeParams) {
  // See Listing 19-3 for complete code
}]);
app.controller('view', ['$scope', 'EmployeeService', function($scope, EmployeeService) {
  // See Listing 19-3 for complete code
}]);}(angular,window));