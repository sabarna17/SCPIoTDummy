# SCPIoTDB
SCP IoT DB Artifacts


# Preface
This is a Basic Structure of IoT in SCP.


# Considerations
-----------------------------------------------------
1. Sensor / Device Master Details is not considered, though table structure are created in .hdbcds format
2. Only 1 Device and 1 Sensors are taken


# Scope to Extend
------------------------------------------------------
1. Unlimited numbers of Sensors and Devices.
2. Predictive analytics in SCP to trigger the Rule
3. Easy connectivity with .XSHTTPDEST file


# File details
-----------------------------------------------------
.hdbschema -> New Schema Name 

iotdb.hdbdd -> CDS Table details

.xsaccess, .xsapp, index.html -> XSC Config files for the Package

odata.xsodata -> ODATA to Update/Read IoT Sensor Table

rule.hdbprocedure -> Procedure which checks the Sensor run table and Manage Field Service Management table(FM)

iot.xsjs, iot.xsjob -> Execution of rule.procedure in background

sensor_status.xsjs -> Returns all the Sensor Status

fm_success.xsjs -> Whenever field service Management is set OKAY then again the rules will be executed 


# Dynamic Schedule of JOB
https://jetcloud01proda21657417.hana.ondemand.com/public/sap/docs/hana/ide/help/default.html?891d9e6dd5144bac8c071ad155ddee8e.html
https://help.sap.com/viewer/d89d4595fae647eabc14002c0340a999/2.0.02/en-US/891d9e6dd5144bac8c071ad155ddee8e.html
https://stackoverflow.com/questions/52972829/table-for-hana-xsjobs
