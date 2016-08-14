"use strict"; 

app.service("ConditionSrv", function() {
	
	function ConditionSrv(scope, name, condition) {
		this.scope = scope;
		console.log(name);
////////BLINDED/////////////		
	if (name === "Blinded") {
		let x;
		let y; 
		let z;
		condition ? (x = Math.abs(this.scope.DEX), y = 2, z = 4) : (x = -Math.abs(this.scope.DEX), y = -2, z = -4);
		this.scope.tempAC = (this.scope.tempAC - x) - y; 
		this.scope.skill.acrobaticsMM -= z; 
		this.scope.skill.climbMM -= z; 
		this.scope.skill.disableDeviceMM -= z; 
		this.scope.skill.escapeArtistMM -= z; 
		this.scope.skill.flyMM -= z; 
		this.scope.skill.rideMM -= z; 
		this.scope.skill.sleightOfHandMM -= z; 
		this.scope.skill.stealthMM -= z; 
		this.scope.skill.swimMM -= z;													 	
	}

////////COWERING/////////////		
	if (name === "Cowering") {	
		if (condition) {
			this.scope.tempAC -= 2;
			this.scope.mettle.speed = 0;
			this.scope.tempDEX -= this.scope.originalDEX; 
		} else {
			this.scope.tempAC += 2;
			this.scope.mettle.speed = this.scope.originalSpeed; 
			this.scope.tempDEX += this.scope.originalDEX;
		} 
	}	

////////DAZZLED/////////////		
	if (name === "Dazzled") {
		let x = condition ? 1 : -1;
		this.scope.tempAB -= x;
	}	


////////DEAFENED/////////////		
	if (name === "Deafened") {
		let x = condition ? 4 : -4;
		this.scope.mettle.MMinitiation -= x;
	}


////////ENERGY DRAINED/////////////		
	if (name === "Energy Drained") {
		let x;
		let y; 
		condition ? (x = 1, y = 5) : (x = -1, y = -5);
		this.scope.tempCHA -= x;
		this.scope.tempCON -= x;
		this.scope.tempDEX -= x;
		this.scope.tempINT -= x;
		this.scope.tempSTR -= x;
		this.scope.tempWIS -= x;
		this.scope.tempAB -= x;
		this.scope.tempAC -= -x;
		this.scope.tempCMD -= -x;
		this.scope.mettle.healthPoints -= y;
		this.scope.mettle.currHealth -= y;
	}

////////ENTANGLED/////////////		
	if (name === "Entangled") {
		let x;
		let y;
		let z;
		condition ? (x = 2, y = 2, z = 4) : (x = .5, y = -2, z = -4);
		this.scope.mettle.speed /= x;
		this.scope.tempAB -= y;
		this.scope.tempDEX -= z;
	}

////////EXHAUSTED/////////////		
	if (name === "Exhausted") {
		let x;
		let y;
		condition ? (x = 6, y = 2) : (x = -6, y = .5);
		this.scope.tempDEX -= x;
		this.scope.tempSTR -= x;
		this.scope.mettle.speed /= y;
	}	

////////FATIGUED/////////////		
	if (name === "Fatigued") {
		let x;
		condition ? x = 2 : x = -2;
		this.scope.tempDEX -= x;
		this.scope.tempSTR -= x;	
		}

////////FRIGHTENED/////////////		
	if (name === "Frightened") {
		let x = condition ? 2 : -2;
		this.scope.tempCHA -= x;
		this.scope.tempCON -= x;
		this.scope.tempDEX -= x;
		this.scope.tempINT -= x;
		this.scope.tempSTR -= x;
		this.scope.tempWIS -= x;
		this.scope.tempAB -= x;
		this.scope.tempAC -= -x;
		this.scope.tempCMD -= -(x * 2);
	}		

////////GRAPPLED/////////////		
	if (name === "Grappled") {
		let x;
		let y;
		condition ? (x = 4, y = 2) : (x = -4, y = 2);
		this.scope.tempDEX -= x;
		this.scope.tempAB -= y;	
		this.scope.tempCMB -= y;	
	}

////////HELPLESS/////////////		
	if (name === "Helpless") {
		if (condition) {
			this.scope.mettle.speed = 0;
			this.scope.tempDEX =  0 - Math.abs(this.scope.tempDEX) - Math.abs(this.scope.originalDEX) - 5;
		} else {
				 this.scope.mettle.speed = this.scope.originalSpeed;
				 this.scope.tempDEX = this.scope.tempDEX + Math.abs(this.scope.originalDEX) + 5;		
			}	
	}

////////PANICKED/////////////		
	if (name === "Panicked") {
		let x = condition ? 2 : -2;
		console.log(this.scope.tempCMD);
		this.scope.tempCHA -= x;
		this.scope.tempCON -= x;
		this.scope.tempDEX -= x;
		this.scope.tempINT -= x;
		this.scope.tempSTR -= x;
		this.scope.tempWIS -= x;
		this.scope.tempAC -= -x;
		this.scope.tempCMD -= -(x * 2);
	}

////////PARALYZED/////////////		
	if (name === "Paralyzed") {
				if (condition) {
			this.scope.mettle.speed = 0;
			this.scope.tempDEX =  0 - Math.abs(this.scope.tempDEX) - Math.abs(this.scope.originalDEX) - 5;
		  this.scope.tempSTR =  0 - Math.abs(this.scope.tempSTR) - Math.abs(this.scope.originalSTR) - 5;
		} else {
				 this.scope.mettle.speed = this.scope.originalSpeed;
				 this.scope.tempDEX = this.scope.tempDEX + Math.abs(this.scope.originalDEX) + 5;	
				 this.scope.tempSTR = this.scope.tempSTR + Math.abs(this.scope.originalSTR) + 5;		
			}	
	}

	////////PINNED/////////////		
	if (name === "Pinned") {
		if (condition) {
		this.scope.mettle.speed = 0;
		this.scope.tempAC -= 4;
		this.scope.tempDEX -= Math.abs(this.scope.originalDEX);
		} else {
			this.scope.mettle.speed = this.scope.originalSpeed;
			this.scope.tempAC += 4;
			this.scope.tempDEX += Math.abs(this.scope.originalDEX);
		}
  }

	//////// SHAKEN/////////////		
	if (name === "Shaken") {
		let x = condition ? 2 : -2;
		this.scope.tempCHA -= x;
		this.scope.tempCON -= x;
		this.scope.tempDEX -= x;
		this.scope.tempINT -= x;
		this.scope.tempSTR -= x;
		this.scope.tempWIS -= x;
		this.scope.tempAB -= x;
		this.scope.tempAC -= -x;
		this.scope.tempCMD -= -(x * 2);
	}

	//////// STUNNED/////////////		
	if (name === "Stunned") {	
		let x;
		let y; 
		condition ? (x = Math.abs(this.scope.DEX), y = 2) : (x = -Math.abs(this.scope.DEX), y = -2);
		this.scope.tempAC = (this.scope.tempAC - x) - y;  
	}




	
// dont touch 
	}	
	return ConditionSrv;
});