# EEG-StarWars
basic example of socket communication with the Force Trainer II to be used as an EEG

The Force Trainer II is a Star Wars toy used to move an hologram with the mind. This toy relies on the TGAM chip, NeuroSky's primary brainwave sensor which is used in entry-level EEG headband. 
Contrary to other EEG headbands, the Force Trainer is inexpensive (I bought one for ~20$ on Ebay). This makes this device one of the most affordable EEG for entertainment purposes.

For this projet, I took inspiration from [this tutorial hacking the the Force Trainer I with an Arduino](https://www.instructables.com/How-to-hack-EEG-toys-with-arduino/).
At first I wanted to reproduce this tutorial by wiring the GND and T pin to an Arduino, but I opted for socket communication with node.js instead of serial RX/TX of Arduino.
The Force Trainer II includes a Bluetooth module, which makes it easier to communicate with.


The [ThinkGear connector](https://www.npmjs.com/package/node-thinkgear-sockets) is required to communicate through sockets with the headset. 
See the documentation [here](http://developer.neurosky.com/docs/lib/exe/fetch.php?media=thinkgear_socket_protocol.pdf).

Troubleshooting of the headset can be done with the app [BrainWave Visualizer](https://store.neurosky.com/products/visualizer), also available on mobile. 
To do so, just turn on the Force Trainer and bluetooth on your computer/smartphone. Then, pair the two together. The led of the Force Trainer should turn blue. 

I provided a minimal example of a node.js app receiving EEG data from the Force Trainer II.
Note that it is important to transmit an appkey generated using an SHA-1 in order to handshake with the device, otherwise communication won't be allowed.

Here is a sample of data received, formatted as JSON : 
```javascript

{
  eSense: { attention: 50, meditation: 40 },
  eegPower: {
    delta: 334492,
    theta: 712039,
    lowAlpha: 406815,
    highAlpha: 429260,
    lowBeta: 111172,
    highBeta: 190516,
    lowGamma: 231593,
    highGamma: 396946
  },
  poorSignalLevel: 0
}

```

It is also possible to get the raw data of the EEG signal. Detailed documentation of ThinkGear data values is available [here](https://cdn.instructables.com/ORIG/F16/FZ5D/I8SLTELN/F16FZ5DI8SLTELN.pdf).
