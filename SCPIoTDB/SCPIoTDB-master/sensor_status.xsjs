try
{var device = $.request.parameters.get("DEVICE_ID");
var sensor = $.request.parameters.get("SENSOR_ID");

// var querySelect = "SELECT MAX( \"ID\" ) FROM \"TEST_BACKGROUND\".\"background::table.XSJOB\"";
var querySelect = "SELECT FLAG FROM \"IOTSCHEMA\".\"IoTPackage::iotdb.FM\" WHERE ID = ( " +
                  " SELECT MAX(ID) FROM \"IOTSCHEMA\".\"IoTPackage::iotdb.FM\" WHERE UNID LIKE '%"+ device + "%"+ sensor+ "%' )";
var connection1 = $.db.getConnection();
var statement1 = connection1.prepareStatement(querySelect);
statement1.execute();
var oResultSet1 = statement1.getResultSet();
var  sen_status = '';
while (oResultSet1.next()) {
    sen_status = oResultSet1.getString(1);
}
oResultSet1.close();
statement1.close();
connection1.close();

$.response.contentType = "application/json";
$.response.status = 200;
$.response.setBody(JSON.stringify(sen_status));
}
catch(e){

	    $.response.status = 500;
	    $.response.setBody(JSON.stringify(e.toString()));

}