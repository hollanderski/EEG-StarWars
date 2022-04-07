#include "MindSet.h"
#include <Monitor.h>

MindSet m3band(Serial);


long prev;

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(57600);
  prev = millis();
  Serial.write(0xc2);
}

void loop() {
  boolean result;
  result = m3band.getPacket();
  if ( result ) {
    digitalWrite(13, HIGH);
    m3band.parsePayload();
    digitalWrite(13, LOW);

    if ( millis() > prev + 500 && m3band.EEG_updated ) {
      prev = millis();

      Serial << "\n";
      if ( m3band.poorSignalQuality() > 0 ) {
        if ( m3band.poorSignalQuality() == 200 )
          Serial << "headset detached!";
        else
          Serial << "poor q: " << m3band.poorSignalQuality();
        Serial << "\n";
      }
      Serial << " att: " << m3band.attention;
      Serial << " med: " << m3band.meditation;
      Serial << " wave: " << m3band.rawWave 
        << "\n";
      if ( m3band.EEG_updated ) {
        Serial << "De: " << m3band.EEG[0];
        Serial << ", Th: " << m3band.EEG[1]; 
        Serial << ", L.A: " << m3band.EEG[2];
        Serial << ", H.A: " << m3band.EEG[3];
        Serial << ", L.B: " << m3band.EEG[4];
        Serial << ", H.B: " << m3band.EEG[5];
        Serial << ", L.G: " << m3band.EEG[6];
        Serial << ", M.G: " << m3band.EEG[7]
          << "\n";
      }
      Serial << "\n";
      delay(233);

    }
  }
}
