try {
	var device = $.request.parameters.get("DEVICE_ID");
	var sensor = $.request.parameters.get("SENSOR_ID");

	var connection = $.hdb.getConnection();
	var fnSell = connection.loadProcedure('IOTSCHEMA', 'IoTPackage::rule');
	var result = fnSell('X');

	$.response.contentType = "application/json";
	$.response.status = 200;

	$.response.setBody(JSON.stringify(result));
} catch (e) {

	$.response.status = 500;
	$.response.setBody(JSON.stringify(e.toString()));

}