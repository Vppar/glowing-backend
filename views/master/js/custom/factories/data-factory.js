App.factory('TableOrder', function() {
	return {
		sort: function(col, currentCol, currentDesc) {
			data = {"col":currentCol, "desc":currentDesc};
			console.log(col);
			console.log(currentCol);
			console.log(currentDesc);
			if(currentCol == col){
				currentDesc = !currentDesc;
			}else{
				$currentCol = col;
				$currentDesc = false;
			}

			return {"col":currentCol, "desc":currentDesc};
		}
	}
});