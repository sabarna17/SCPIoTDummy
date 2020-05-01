import requests
import datetime
import time
import random

url = "https://sapnttdbp1942508301trial.hanatrial.ondemand.com/IoTPackage/odata.xsodata/IOTDATA"

querystring = {"DEVICE_ID":"DEVICE1","SENSOR_ID":"SENSOR1"}
sensor_check_url = "https://sapnttdbp1942508301trial.hanatrial.ondemand.com/IoTPackage/sensor_status.xsjs"
headers = {
    'content-type': "application/json",
    'Accept': "application/json",
    'authorization': "Basic XXXXXXXXXXXXX"
    }

def timestamp():
    timestamp=int(time.time())
    ts = time.time()
    st = datetime.datetime.fromtimestamp(ts).strftime('%Y%m%d%H%M%S')
    date1 = datetime.datetime.fromtimestamp(ts).strftime('%d') + '.' + datetime.datetime.fromtimestamp(ts).strftime('%m') + '.' + datetime.datetime.fromtimestamp(ts).strftime('%Y')
    time1 = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
    print(st)
    return st

def temperature():
    temp = random.randint(40, 64)
    print(temp)
    return temp

def checksensorstatus():
    response = requests.request("GET", sensor_check_url, headers=headers, params=querystring, verify=False)    
    print(response.text)
    return response.text

while True:
    sen_status = checksensorstatus()
    st = timestamp()
    temp = temperature()
    payload = "{\"DEVICE_ID\": \"DEVICE1\",\"SENSOR_ID\": \"SENSOR1\",\"TIMESTAMP\": \"" + str(st) + "\",\"TEMP\": \"" + str(temp) + "\"}"    
    print(payload)
    if sen_status == '"N"':
        print('Not okay')
    else:
        response = requests.request("POST", url, data=payload, headers=headers,verify=False)
        print(response.text)
        print('Sensor Running')                
    time.sleep(5)
