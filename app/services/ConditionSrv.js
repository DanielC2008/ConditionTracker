"use strict"; 

app.service("ConditionSrv", function() {
	
	function ConditionSrv(scope, name, condition) {
		this.scope = scope;
		console.log(name);
////////BLINDED/////////////		
	if (name === "Blinded") {
		if (condition) {
			if (this.scope.tempAC === undefined) {
				this.scope.tempAC = 0;
			}
			if (this.scope.tempAC === '') {
				this.scope.tempAC = 0;
			}
			this.scope.tempAC = (this.scope.tempAC - Math.abs(this.scope.DEX)) - 2;
			this.scope.skill.acrobaticsMM -= 4; 
			this.scope.skill.climbMM -= 4; 
			this.scope.skill.disableDeviceMM -= 4; 
			this.scope.skill.escapeArtistMM -= 4; 
			this.scope.skill.flyMM -= 4; 
			this.scope.skill.rideMM -= 4; 
			this.scope.skill.sleightOfHandMM -= 4; 
			this.scope.skill.stealthMM -= 4; 
			this.scope.skill.swimMM -= 4; 
		}	else {
			this.scope.tempAC = (this.scope.tempAC + Math.abs(this.scope.DEX)) + 2;
			this.scope.skill.acrobaticsMM += 4;	
			this.scope.skill.climbMM += 4; 
			this.scope.skill.disableDeviceMM += 4; 
			this.scope.skill.escapeArtistMM += 4; 
			this.scope.skill.flyMM += 4; 
			this.scope.skill.rideMM += 4; 
			this.scope.skill.sleightOfHandMM += 4; 
			this.scope.skill.stealthMM += 4; 
			this.scope.skill.swimMM += 4; 													
		}													 	
	}
	



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
			this.scope.tempDEX -= 2;
			this.scope.tempSTR -= 2;
		} else {
				this.scope.tempDEX += 2;
				this.scope.tempSTR += 2;
			}	
		}
	}	
	

	return ConditionSrv;
});