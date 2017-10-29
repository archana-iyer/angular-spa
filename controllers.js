// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
  $scope.city = cityService.city;
  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });
  $scope.submit = function() {
    $location.path("/forecast");
  };
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

  $scope.city = cityService.city;
  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = $resource("https://api.weatherbit.io/v2.0/forecast/daily", {
    callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ city: $scope.city, key: "853ccc5e538746218c86451ceab65ba9", days: $scope.days  });

      $scope.convertToFahrenheit = function(degC) {
        return Math.round((degC * 9/5)+32);
      };

      $scope.convertToMph = function(mps) {
        return Math.round(mps/0.44704);
      };

}]);
