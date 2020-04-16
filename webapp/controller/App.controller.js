sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ibm/fin/ar/models/models"
], function(Controller, models) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.App
		 */
		onInit: function() {
			// //step 1: get the container control object - which will encapsulate my views
			// var oApp = this.getView().byId("myApp");
			// //step 2: create the objects of views which needs to be added inside container
			// var oView1 = new sap.ui.view("idView1", {
			// 	viewName: "ibm.fin.ar.view.View1",
			// 	type: "XML"
			// });
			// var oView2 = new sap.ui.view("idView2", {
			// 	viewName: "ibm.fin.ar.view.View2",
			// 	type: "XML"
			// });
			// var oEmptyView = new sap.ui.view("idEmpty", {
			// 	viewName: "ibm.fin.ar.view.Empty",
			// 	type: "XML"
			// });
			// //step 3: add your newly created views inside the container control
			// oApp.addMasterPage(oView1).addDetailPage(oEmptyView).addDetailPage(oView2);
			
			//Initialize Model and Set at the App view level -
			//ultimately sets the model at the application level
			// var oModel = models.createFruitsModel();
			// this.getView().setModel(oModel);
			var myData = {
				mario: true
			};
			var oModelNew = new sap.ui.model.json.JSONModel();
			oModelNew.setData(myData);
			this.getView().setModel(oModelNew, "mario");
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});