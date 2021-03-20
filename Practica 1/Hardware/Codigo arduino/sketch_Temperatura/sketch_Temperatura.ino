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

String envio = "";
int PulseSensor = 7;
int Signal = 0;                  
int Threshold = 350;   
int pulso = 0;
int tiempoT, tiempoS;
int ppm;

int maxPulso = 345;
int minPulso = 335;
int pps = 0;
bool pulsado;

void setup(){
  Serial.begin(9600);   // comunicacion de monitor serial a 9600 bps
  Serial.println("Listo");  // escribe Listo en el monitor
  miBT.begin(9600);    // comunicacion serie entre Arduino y el modulo a 38400 bps

  tiempoT = 0;
  tiempoS = 0;
  ppm = 1;
  pps = 0;

  pulsado = false;
}

void loop(){
/* Modulo de temperatura */
  temperatura_LM35 = 0;
  temperatura_LM35 = analogRead(pin_LM35); 
  temperatura_LM35 = (1.1 * temperatura_LM35 * 100.0) / 1024.0; 
  temperatura_LM35 = temperatura_LM35 + 32;

  if(temperatura_LM35 > 33 && temperatura_LM35 < 40)
  {
    temperatura_LM35_LAST = temperatura_LM35;
    temperatura_LM35_SEND = temperatura_LM35; 
  }
   else
   {
    temperatura_LM35_SEND = temperatura_LM35_LAST; 
  }
  
  Signal = analogRead(PulseSensor);  //Lectura de datos del sensor de ritmo cardiaco
  if(Signal >= maxPulso){   
    if(pulsado == false){
      pps++;
    }
    pulsado = true;
    delay(30);
   } 
   if(Signal <= minPulso){
    pulsado = false;
   }
        //Serial.println(Signal);
   delay(100);
   tiempoS++;

   
   if(tiempoS >= 10){
      tiempoS = 0;
      tiempoT++;
      ppm = (60*pps)/tiempoT;
      if(tiempoT >= 15){
        tiempoT = 0;
        pps = 0;
      }
      Signal = (Signal - 300 + ppm)/2;
      if(Signal < 30) Signal = 0;
      envio = "";
    if (miBT.available())
    {
        envio.concat(temperatura_LM35_SEND);
        envio.concat(",");
        envio.concat(pps);
        envio.concat(",");
        envio.concat(ppm);
        envio.concat(",");
        envio.concat(Signal);
        envio.concat("\n");
        miBT.print(envio);
        Serial.println(envio);
    } 
    else{
        envio.concat(temperatura_LM35_SEND);
        envio.concat(",");
        envio.concat(pps);
        envio.concat(",");
        envio.concat(ppm);
        envio.concat(",");
        envio.concat(Signal);
        envio.concat("\n");
        miBT.print(envio);
        Serial.println(envio);
     }  
   }
   
}


/***************************************************************************
* Modulo de velocidad
*/
void velocidad()
{

}

/***************************************************************************
* Modulo de velocidad cool con ultrasonico
*/
void velocidad_neryversion()
{

}

/***************************************************************************
* minuto cumplido 
*/
void minuto()
{

}

/***************************************************************************
* distancia total por ciclo
*/
void distancia()
{

}

/***************************************************************************
* indicador de falla por ritmo cardiaco
*/
void fallacardiaca()
{

}

/***************************************************************************/