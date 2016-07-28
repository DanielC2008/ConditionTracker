"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $location) {

	$scope.login = function() {
		AuthFactory.authWithProvider()
		.then(function() {
			$location.path("/tracker/hero");
			$scope.$apply();
		});
	};

});