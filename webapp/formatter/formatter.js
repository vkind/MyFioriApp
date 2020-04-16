sap.ui.define([],function(){
	
	return {
		
		getState: function(status){
			switch (status) {
				case "Out of stock":
					return "Warning";
				case "Discontinued":
					return "Error";
				default:
					return "Success";
			}
		}
			
	};
		
});