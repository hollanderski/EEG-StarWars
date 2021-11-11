var express = require('express');
var app = express();

var thinkgear = require('node-thinkgear-sockets');


var options = {
  appName: 'openminded',
  appKey: '0fc2141b1b45c573cc2d3a763b8d71c5bde2391',
  enableRawOutput: false,
  format: 'Json' //'BinaryPacket'
};

var client = thinkgear.createClient(options);

client.on('data',function(data){
  console.log(data);
});

client.on('error',function(error){
  console.log(error);
});

client.on('close',function(){
  console.log('closing.');
});

client.connect();
