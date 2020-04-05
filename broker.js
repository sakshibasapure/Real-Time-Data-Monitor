// MQTT broker
var mosca = require('mosca')
var settings = {port: 1234}
var broker = new mosca.Server(settings)


broker.on('ready', function(){
    console.log('Broker is ready!')
})

