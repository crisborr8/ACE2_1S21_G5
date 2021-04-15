#include <SoftwareSerial.h>  // libreria que permite establecer pines digitales

SoftwareSerial miBT(10, 11);   // pin 10 como RX, pin 11 como TX
String envio = "";

// Variables de caudal
volatile int NumPulsos; //variable para la cantidad de pulsos recibidos
int PinSensor = 2;    //Sensor conectado en el pin 2
float factor_conversion=7.11; //para convertir de frecuencia a caudal
float volumen=0;
int vol=0;
long dt=0; //variación de tiempo por cada bucle
long t0=0; //millis() del bucle anterior

//---Función que se ejecuta en interrupción---------------
void ContarPulsos ()  
{ 
  NumPulsos++;  //incrementamos la variable de pulsos
} 

//---Función para obtener frecuencia de los pulsos--------
int ObtenerFrecuecia() 
{
  int frecuencia;
  NumPulsos = 0;   //Ponemos a 0 el número de pulsos
  interrupts();    //Habilitamos las interrupciones
  delay(1000);   //muestra de 1 segundo
  noInterrupts(); //Deshabilitamos  las interrupciones
  frecuencia=NumPulsos; //Hz(pulsos por segundo)
  return frecuencia;
}

void setup()
{
  Serial.begin(9600);   // comunicacion de monitor serial a 9600 bps
  Serial.println("Listo");  // escribe Listo en el monitor
  miBT.begin(9600);    // comunicacion serie entre Arduino y el modulo a 38400 bps
  pinMode(PinSensor, INPUT); 
  attachInterrupt(0,ContarPulsos,RISING);//(Interrupción 0(Pin2),función,Flanco de subida)
  t0=millis();
}

void loop()
{
    float frecuencia=ObtenerFrecuecia(); //obtenemos la frecuencia de los pulsos en Hz
    float caudal_L_m=frecuencia/factor_conversion; //calculamos el caudal en L/m
    dt=millis()-t0; //calculamos la variación de tiempo
    t0=millis();
    volumen= (caudal_L_m/60)*(dt/1000); // volumen(L)=caudal(L/s)*tiempo(s)
    
    //-----Enviamos por el puerto serie---------------
    //Serial.print ("Caudal: "); 
    //Serial.print (caudal_L_m,3); 
    //Serial.print ("L/min\tVolumen: "); 
    vol = volumen * (500/0.250);
    Serial.print (vol);
    Serial.println ('$'); 
    //Serial.println (" L");
    
    if (miBT.available())
    {
        envio = "";
        //int vol = (int) volumen;
        //envio.concat(volumen,3);
        //envio.concat("$");
        //miBT.print(envio);
        //Serial.println(envio);
    } 
    else
    {
        envio = "";
        //int vol = (int) volumen;
        //envio.concat(volumen,3);
        //envio.concat("$");
        //miBT.print(envio);
        //Serial.println(envio);
     } 
}
