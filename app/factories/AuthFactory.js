"use strict";
	
app.factory("AuthFactory", function() {

	let currentUserId = null;
	let provider = new firebase.auth.GoogleAuthProvider();


	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
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
		return currentUserId;
	};

	const logout = function(){
		firebase.auth().signOut().then(function(){
			currentUserId = null;
		}, function(error){
		})
	};
	
	return {authWithProvider, isAuthenticated, getUser, logout};

});