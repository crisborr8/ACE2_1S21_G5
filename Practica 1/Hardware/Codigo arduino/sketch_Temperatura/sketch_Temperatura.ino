#include <SoftwareSerial.h>  // libreria que permite establecer pines digitales
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

SoftwareSerial miBT(10, 11);   // pin 10 como RX, pin 11 como TX

/* Soporte para modulo de temperatura */
int temperatura_LM35;   // Variable para almacenar el valor obtenido del sensor de temperatura
int temperatura_LM35_LAST; 
int temperatura_LM35_SEND; 
int pin_LM35 = 0;         // Pin ANALOGICO A0


/* Soporte para modulo de pulsos y oxigeno */
PulseOximeter pox;
uint32_t tsLastReport = 0;


int PulseSensor = 7;
int Signal = 0;                
int Threshold = 500;
int pulso = 0;

void setup(){
  Serial.begin(9600);   // comunicacion de monitor serial a 9600 bps
  Serial.println("Listo");  // escribe Listo en el monitor
  miBT.begin(9600);    // comunicacion serie entre Arduino y el modulo a 38400 bps
}

void loop(){

  Signal = analogRead(PulseSensor);                                              
  Serial.println(Signal);

  if(Signal > Threshold){                           
     Serial.println("PULSO");
     pulso = 1;
     delay(30);
   }

  /* Modulo de temperatura */
  temperatura_LM35 = 0;
  temperatura_LM35 = analogRead(pin_LM35); 
  temperatura_LM35 = (1.1 * temperatura_LM35 * 100.0) / 1024.0; 
  temperatura_LM35 = temperatura_LM35 + 32;

  //Serial.print("Temperatura: ");
  //Serial.print(temperatura_LM35);
  //Serial.print("\n");
  if(temperatura_LM35 > 33 && temperatura_LM35 < 40)
  {
    Serial.print("Temperatura: ");
    Serial.print(temperatura_LM35);
    Serial.print("\n");
    temperatura_LM35_LAST = temperatura_LM35;
    temperatura_LM35_SEND = temperatura_LM35; 
  }
   else
   {

    Serial.print("Temperaturas: ");
    Serial.print(temperatura_LM35_LAST);
    Serial.print("\n");
    temperatura_LM35_SEND = temperatura_LM35_LAST; 
    }
  
  /* Modulo de pulso y oxigeno 
  pox.update();
  Serial.print("Ritmo:");
  Serial.print(pox.getHeartRate());
  Serial.print(" / Oxigeno:");
  Serial.print(pox.getSpO2());
  Serial.println("%"); */


if (miBT.available())
{
  miBT.write(temperatura_LM35_SEND);
  miBT.write(",");
  if(pulso == 1)
  {
    miBT.write("1");  
  }
  else{
    miBT.write("0");
  }
  miBT.write(",0");
  miBT.write("\n");
} 
else{
  miBT.write(temperatura_LM35_SEND);
  miBT.write(",");
  if(pulso == 1)
  {
    miBT.write("1");  
  }
  else{
    miBT.write("0");
  }
  miBT.write(",0");
  miBT.write("\n");
  }  

  pulso = 0;
  delay(1000);
/*if (miBT.available())       // si hay informacion disponible desde modulo
   Serial.write(miBT.read());   // lee Bluetooth y envia a monitor serial de Arduino

if (Serial.available())     // si hay informacion disponible desde el monitor serial
   miBT.write(Serial.read());   // lee monitor serial y envia a Bluetooth
*/
}