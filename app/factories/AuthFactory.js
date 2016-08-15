"use strict";
	
app.factory("AuthFactory", function($window) {

	let currentUserId = null;
	let provider = new firebase.auth.GoogleAuthProvider();


	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			$window.localStorage.setItem('user', JSON.stringify(user.uid));
			currentUserId = user.uid;
		} 
	});

	const authWithProvider = function() {
		return firebase.auth().signInWithPopup(provider);
	};

	const isAuthenticated = function() {
		return (currentUserId) ? true : false;
	};

	const getUser = function() {
	  let storageUser = $window.localStorage.getItem('user');
		if (currentUserId) {
      return currentUserId;
	  }
	  else {
	      let user = JSON.parse(storageUser);
	      return user;
	    } 
	};

	const logout = function(){
		firebase.auth().signOut().then(function(){
			$window.localStorage.removeItem('user');
			currentUserId = null;
		}, function(error){
		});
	};

	return {authWithProvider, isAuthenticated, getUser, logout};

});