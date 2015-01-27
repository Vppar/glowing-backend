App.factory('TableOrder', function() {
	return {
		sort: function(col, currentCol, currentDesc) {
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