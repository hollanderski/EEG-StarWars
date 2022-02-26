var min_channels = [10000000,10000000,10000000,10000000,10000000,10000000,10000000,10000000]
var max_channels = [0,0,0,0,0,0,0,0]
var couleurs = ["rouge", "orange", "jaune", "vert", "cyan", "bleu", "violet", "rose"]


var SerialPort = require('serialport').SerialPort;
 // include the serialport library
var portName = process.argv[2]; // get the port name from the command line
var myPort =  new SerialPort({
  path:"COM6",
  baudRate:9600
});



var thinkgear = require('node-thinkgear-sockets');


var options = {
  appName: 'openminded',
  appKey: '0fc2141b1b45c573cc2d3a763b8d71c5bde2391',
  enableRawOutput: false,
  format: 'Json' //'BinaryPacket'
};

var client = thinkgear.createClient(options);


 
// these are the definitions for the serial events:
myPort.on('open', openPort); // called when the serial port opens
 
function openPort() {

  console.log('port open');
  console.log('baud rate: ' + myPort.options);

 
client.on('data',function(data){
  //brightness = (data.eSense.meditation * 255)/100;
  //console.log(data);
  var arr= Object.values(data.eegPower)
  //console.log(arr)

  var newValues = compute_values(arr)

  //console.log(newValues); 
  var color = indexOfMax(newValues);
  console.log(couleurs[color])
  myPort.write(color.toString()); 
}); 


client.on('blink_data',function(data){
  console.log(data);
});




client.on('error',function(error){
  console.log(error);
});

client.on('close',function(){
  console.log('closing.');
});

client.connect();


}



function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}



Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function update_boundaries(channels){

  for(var i=0; i<channels.length; i++){
    if(min_channels[i]>channels[i])
      min_channels[i]=channels[i]
    if(max_channels[i]<channels[i])
      max_channels[i]=channels[i]
  }
  //console.log("min", min_channels, "max", max_channels)

}

function compute_values(channels){

  var newValues = channels.slice();
  update_boundaries(channels);
  //console.log(newValues)

  for(var i=0; i<channels.length; i++){

    newValues[i] = newValues[i].map(min_channels[i], max_channels[i], 0, 100)

  }

  return newValues;
}