"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, $location) {
	
		$scope.logout = function() {
			AuthFactory.logout();
			$location.url("/login");
		};

});