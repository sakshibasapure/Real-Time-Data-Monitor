// MQTT subscriber and storing data into MongoDB
var mqtt = require('mqtt') 
var client = mqtt.connect('mqtt://broker.hivemq.com')
var topic = 'Testdata'
//mongodb
var mongodb = require('mongodb')
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/SampleData'
var collection

client.on('message', function(topic, bufferMessage){
    
    //converting string data into json data
    var jsonMessage = JSON.parse(bufferMessage);
    console.log(jsonMessage)

    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
        if(err) throw err;
        console.log('Connection is okay')

        var dbo = db.db("EnergyMonitoringSystem").collection('DailyValues2')
    
        dbo.insertOne({
            message: jsonMessage
        }, function(){
            console.log('Data saved to MongoDB')
            db.close()
        } 
        )
    
    })
    
})

client.on('connect', function(){
    console.log('Subscription Done')
    client.subscribe(topic)
})
    






