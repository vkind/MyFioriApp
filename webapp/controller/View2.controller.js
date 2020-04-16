sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View2", {

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
			var mySelectedFruitId = oEvent.getParameter("arguments").fruitId;
			//var sPath = "/fruits/" + mySelectedFruitId;
			this.getView().bindElement("/" + mySelectedFruitId);
			this.getView().byId("simpleForm").bindElement("ToSupplier");
		},
		onBack: function(){
			//Step 1: Get the parent object 
			var oApp = this.getView().getParent();
			//Step 2: parent will ask the view 1 to load
			oApp.to("idView1");
		},
		onEdit: function(){
			//idDetails
			
			if(this.getView().getModel("mario").getProperty("/mario") === false){
				this.getView().getModel("mario").setProperty("/mario", true);	
			}
			else{
				this.getView().getModel("mario").setProperty("/mario", false);
			}
		},
		oFragmentSupplier: null,
		onFilter: function(){
			//MessageBox.confirm("This page is under construction.... please come back later");
			if(!this.oFragmentSupplier){
				this.oFragmentSupplier = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup");	
				//making all the view resources available for your friend child called fragment
				//view has a model(s) these models will be accessed by the fragments now
				this.getView().addDependent(this.oFragmentSupplier);
				this.oFragmentSupplier.bindAggregation("items",{
					path: '/supplier',
					template: new sap.m.StandardListItem({
						title: "{name}",
						description: "{city}",
						icon: "sap-icon://supplier"
					})
				});
				this.oFragmentSupplier.setTitle("Suppliers Elle");
			}

			this.oFragmentSupplier.open();
			
			//in abap when we create alv in PBO, it gets called again and again
			//what we do to avoid that? --- check for initial
			
		},
		oCityPopup: null,
		selectedFieldId: "",
		onF4Help: function(oEvent){
			//we need id of the field later to popuplate the value of that input field on which
			//f4 was pressed
			this.selectedFieldId = oEvent.getSource().getId();
			//MessageBox.confirm("This page is under construction.... please come back later");
			if(!this.oCityPopup){
				this.oCityPopup = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup");
				this.getView().addDependent(this.oCityPopup);
				this.oCityPopup.bindAggregation("items",{
					path: '/cities',
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{knownFor}"
					})
				});
				this.oCityPopup.setTitle("Unity in Diversity");
				this.oCityPopup.setMultiSelect(false);
				//step 2: attach a confirm event to our popup so when user choose
				//an item it will trigger my event handler
				this.oCityPopup.attachConfirm(this.onConfirm, this);
			}
			this.oCityPopup.open();
		},
		onConfirm: function(oEvent){
			var selectedItem = oEvent.getParameter("selectedItem");
			var citySelected = selectedItem.getLabel();
			console.log("this is the id of your field on which f4 was done ", this.selectedFieldId);
			sap.ui.getCore().byId(this.selectedFieldId).setValue(citySelected);
		},
		locationOfHoliday: "Singapore",
		onApprove: function(){
			//alert(this.locationOfHoliday);
			//this.oFragmentSupplier.open();
			var that = this;
			MessageBox.confirm("Are you sure, you wanna me go for vacation?",{
				title: "Yo Yo Holiday",
				onClose: this.afterMsgClose.bind(this)
			});
		},
		afterMsgClose: function(response){
			//will show later
			if(response === "OK"){
				MessageToast.show("Wallah! your vacation is now approved location " + this.locationOfHoliday);
			}
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});