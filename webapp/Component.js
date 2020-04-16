sap.ui.define(
	["sap/ui/core/UIComponent"], 
	function(UIComponent){
		return UIComponent.extend("ibm.fin.ar.Component",{
			metadata: {
				manifest: "json"
			},
			init: function(){
				//super->constructor();	
				//this is the way we call the super class contructor
				sap.ui.core.UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				
				//Router will now go and find the configuration inside manifest.json
				//if it doesnt find the config - Dump
				oRouter.initialize();
			},
			// createContent: function(){
			// 	var oView = new sap.ui.view("idApp",{
			// 		viewName: "ibm.fin.ar.view.App",
			// 		type: "XML"
			// 	});
			// 	return oView;
			// },
			destroy: function(){
				
			}
		});
	}
);