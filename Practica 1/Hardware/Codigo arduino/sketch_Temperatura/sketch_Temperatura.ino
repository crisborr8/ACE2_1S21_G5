#include <SoftwareSerial.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

SoftwareSerial BTSerial(2, 3);

/* Soporte para modulo de temperatura */
float temperatura_LM35;   // Variable para almacenar el valor obtenido del sensor de temperatura
int pin_LM35 = 0;         // Pin ANALOGICO A0

/* Soporte para modulo de pulsos y oxigeno */
PulseOximeter pox;
uint32_t tsLastReport = 0;

void setup() 
{
  // analogReference(INTERNAL);
  Serial.begin(9600);
  BTSerial.begin(9600);
}
 
void loop() 
{

  /* Modulo de temperatura */
  temperatura_LM35 = analogRead(pin_LM35); 
  temperatura_LM35 = (1.1 * temperatura_LM35 * 100.0) / 1024.0; 
  Serial.print("Temperatura: ");
  Serial.print(temperatura_LM35);
  Serial.print("\n");

  /* Modulo de pulso y oxigeno */
  pox.update();
  Serial.print("Ritmo:");
  Serial.print(pox.getHeartRate());
  Serial.print(" / Oxigeno:");
  Serial.print(pox.getSpO2());
  Serial.println("%");


  //CONEXION BLUETOOTH
  if (BTSerial.available()) 
  {
    BTSerial.print(String(temperatura_LM35) + String(pox.getHeartRate()) + String(pox.getSpO2()));
  }

  delay(1000);
}
