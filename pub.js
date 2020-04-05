// MQTT publisher
var mqtt = require('mqtt') 
var schedule = require('node-schedule');
var client = mqtt.connect('mqtt://broker.hivemq.com')
var topic = 'Testdata'
var message = []
var i=0;


//Reading from excel sheet, converting into json and publishing
var xlsx = require('xlsx');
var file = xlsx.readFile('SampleData.xlsx',{cellDates:true});
var worksheet = file.Sheets["EnergyValues"];
var message = xlsx.utils.sheet_to_json(worksheet)


//Publishing the data every 30 minutes
client.on('connect', function() {
    var event = schedule.scheduleJob("0,30 * * * *", function() {

        //converting array into string
        bufferMessage = JSON.stringify(message[i]);

        client.publish(topic, bufferMessage)
        
        console.log('Message sent!', message[i])  

        //taking each document one by one
        i=i+1
    })

});



