function execute() {
	var connection = $.hdb.getConnection();
	var fnSell = connection.loadProcedure('IOTSCHEMA', 'IoTPackage::rule');
	var result = fnSell(' ');
	if (result !== null) {
		// Logic for ERP Processes..
		var querySelect = "SELECT MAX( \"ID\" ) FROM \"IOTSCHEMA\".\"IoTPackage::iotdb.XSJOB\"";

		var connection1 = $.db.getConnection();
		var statement1 = connection1.prepareStatement(querySelect);
		statement1.execute();
		var oResultSet1 = statement1.getResultSet();
		var run_no = 0;
		while (oResultSet1.next()) {
			run_no = oResultSet1.getInteger(1);
		}
		oResultSet1.close();
		statement1.close();
		connection1.close();
		run_no = run_no + 1;

		var query_insert = "INSERT INTO \"IOTSCHEMA\".\"IoTPackage::iotdb.XSJOB\" VALUES(" + run_no + ",'" + 
		                   "Action Triggered: " + result.UNID + "')";
		connection1 = $.db.getConnection();
		statement1 = connection1.prepareStatement(query_insert);
		statement1.execute();
		connection1.commit();
		connection1.close();
		$.response.setBody(JSON.stringify(result));
	}
}
execute();

