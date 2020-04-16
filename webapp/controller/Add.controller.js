sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			
		},
		oFragmentSupplier: null,
		onRequest: function(){
			
			//MessageBox.confirm("This page is under construction.... please come back later");
			if(!this.oFragmentSupplier){
				this.oFragmentSupplier = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup");	
				//making all the view resources available for your friend child called fragment
				//view has a model(s) these models will be accessed by the fragments now
				this.getView().addDependent(this.oFragmentSupplier);
				this.oFragmentSupplier.bindAggregation("items",{
					path: '/SupplierSet',
					template: new sap.m.StandardListItem({
						title: "{BP_ID}",
						description: "{COMPANY_NAME}",
						icon: "sap-icon://supplier"
					})
				});
				this.oFragmentSupplier.setTitle("Suppliers");
				this.oFragmentSupplier.setMultiSelect(false);
				this.oFragmentSupplier.attachConfirm(this.onItemSelect, this);
				this.oFragmentSupplier.attachSearch(this.onPopupSearch,this);
				
			}
			this.oFragmentSupplier.open();
		},
		onPopupSearch: function(oEvent){
			var searchStr = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("COMPANY_NAME", sap.ui.model.FilterOperator.Contains, searchStr);
			
			this.oFragmentSupplier.getBinding("items").filter([oFilter]);
		},
		onItemSelect: function(oEvent){
			var selectedSupp = oEvent.getParameter("selectedItem").getTitle();
			var oAnubhavModel = this.getView().getModel("anubhavModel");
			oAnubhavModel.setProperty("/productData/SUPPLIER_ID", selectedSupp);
		},
		onBack: function(){
			//Step 1: Get the parent object 
			var oApp = this.getView().getParent();
			//Step 2: parent will ask the view 1 to load
			oApp.to("idView1");
		},
		onSave: function(oEvent){
			//MessageBox.alert("This functionality is under construction, please check later");
			var payload = this.getView().getModel("anubhavModel").getProperty("/productData");
			var oDataModel = this.getView().getModel();
			oDataModel.create("/ProductSet", payload,{
				success: function(oData){
					MessageToast.show("Wallah!! Anubhav it worked when i did things right");
				},
				error: function(oError){
					
				}
			});
			
		}

	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

});