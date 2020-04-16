sap.ui.define(
	["sap/ui/model/json/JSONModel"],
	function(JSONModel){
				return {
					createFruitsModel: function(){
						var oModel = new JSONModel();
						oModel.loadData("models/mockData/fruits.json");
						return oModel;
					}
				};			  	
	}
);
