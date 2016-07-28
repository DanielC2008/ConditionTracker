"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $location) {

	$scope.login = function() {
		AuthFactory.authWithProvider()
		.then(function() {
			$location.url("#/tracker/hero");
		});
	};

});