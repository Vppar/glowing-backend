App.factory('getAddress', function() {
	return {
		get: function(cep) {
			if(currentCol == col){
				currentDesc = !currentDesc;
			}else{
				currentCol = col;
				currentDesc = false;
			}

			return {"col":currentCol, "desc":currentDesc};
		}
	}
});