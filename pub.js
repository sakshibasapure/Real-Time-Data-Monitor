// MQTT publisher
var mqtt = require('mqtt') 
var schedule = require('node-schedule');
var client = mqtt.connect('mqtt://broker.hivemq.com')
var topic = 'Testdata'

//Extra librabries and declarations
var message = []
var i=0;
var _ = require('underscore')
var epochTime,publishMessage

//Unix Epoch Time
let ts = Date.now();

Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
Date.time = function() { return new Date().toUnixTime(); }

//Reading from excel sheet, converting into json and publishing
var xlsx = require('xlsx');
var file = xlsx.readFile('SampleData.xlsx',{cellDates:true});
var worksheet = file.Sheets["EnergyValues"];
var message = xlsx.utils.sheet_to_json(worksheet)



//Publishing the data every 30 minutes
client.on('connect', function() {
    var event = schedule.scheduleJob("0,30 * * * *", function() {


        epochTime = {'Epoch Time' : Date.time()}

        //combining epochtime and data
        publishMessage = _.extend(epochTime, message[i]);

        //converting array into string (mqtt publishes data in string format)
        bufferMessage = JSON.stringify(publishMessage)
        client.publish(topic, bufferMessage)
        console.log(publishMessage)


        //taking each document one by one
        i=i+1
    })

});





