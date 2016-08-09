"use strict"; 

app.service("ConditionSrv", function() {
	
	function ConditionSrv(scope, name, condition) {
		this.scope = scope;

		
////////FATIGUED/////////////		
	if (name === "Fatigued") {
		// ensuring everything is a number
		if (this.scope.tempDEX === undefined) {
			this.scope.tempDEX = 0;
		}
		if (this.scope.tempSTR === undefined) {
			this.scope.tempSTR = 0;
		}
		if (this.scope.tempDEX === '') {
			this.scope.tempDEX = 0;
		}
		if (this.scope.tempSTR === '') {
			this.scope.tempSTR = 0;
		}
		// if true add it, if false reverse it
		if (condition === true) {
			this.scope.tempDEX = parseInt(this.scope.tempDEX) - 2;
			this.scope.tempSTR = parseInt(this.scope.tempSTR) - 2;
		} else {
				this.scope.tempDEX = parseInt(this.scope.tempDEX) + 2;
				this.scope.tempSTR = parseInt(this.scope.tempSTR) + 2;
			}	
		}
	}	
	

	return ConditionSrv;
});