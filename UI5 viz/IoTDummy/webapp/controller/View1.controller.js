sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format'
], function (Controller, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("iotStartup.IoTDummy.controller.View1", {
		oVizFrame: null,
		onInit: function () {
			this._data = {};
			this._data.results={};
			this.jModel = new sap.ui.model.json.JSONModel(this._data);
			
			var url = "/SCPNTT_DB/IoTPackage/odata.xsodata/IOTDATA?$orderby=TIMESTAMP desc &$top=20";
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			var that = this;
			jQuery.sap.require("sap/suite/ui/commons/ChartContainer");
			var vizframe = this.byId("idVizFrame");
			var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
				icon: "sap-icon://horizontal-bar-chart",
				title: "vizFrame Bar Chart Sample",
				content: [vizframe]
			});
			var oChartContainer = new sap.suite.ui.commons.ChartContainer({
				content: [oChartContainerContent]
			});
			oChartContainer.setShowFullScreen(true);
			oChartContainer.setAutoAdjustHeight(true);
			this.byId('chartFixFlex').setFlexContent(oChartContainer);
			this.oVizFrame.setModel(this.jModel);
			function foo() {
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": url,
					// /SMARTBIN_ML_IOT/sensor_data.xsodata/RPI_DATA1
					// "url": "/SCPNTT_DB/SCPNTT_TRAIN/odata.xsodata/IOTDATA?$format=json",
					"method": "GET",
					"headers": {
						"authorization": "Basic XXXXXX",
						"accept": "application/json",
						"content-type": "application/json",
						"cache-control": "no-cache"
					}
				};

				$.ajax(settings).done(function (response) {
					var results = [];
					for (var i=response.d.results.length-1;i>=0;i--){
						results.push(response.d.results[i]);
					}
					that._data.results = results;
					that.jModel.setData(that._data);
					
					that.jModel.refresh();
				});
				setTimeout(foo, 5000);
			}
			// if (this._data.close === 0) {
			foo();
			
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2
							// visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: true,
					text: 'IoT Real-time'
				}
			});
			var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);			
		},
		onFM_success: function(){
			// Call this when button is clicked
			var settings = { 
				"async": true,
				"crossDomain": true,
				"url": "/SCPNTT_DB/IoTPackage/fm_success.xsjs?DEVICE_ID=DEVICE1&SENSOR_ID=SENSOR1",
				"method": "GET",
				"headers": {
    				"authorization": "Basic XXXXXXX",
    				"content-type": "application/json",
    				"cache-control": "no-cache",
    				"postman-token": "bc6b4fe6-b68f-558b-eaa8-2cf5f8078016"
				}
			};

			$.ajax(settings).done(function (response) {
					// console.log(response);
			});
		}
		// onafter
	});
});
