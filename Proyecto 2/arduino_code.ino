#include <Wire.h>
#include <HX711_ADC.h>
#if defined(ESP8266)|| defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif
//**********************************************************************************************************************
//************************************************** SENSOR DE FUERZA **************************************************
//**************************************************  PINES  A5 Y A6  **************************************************
//**********************************************************************************************************************
const int HX711_dout = 6; //mcu > HX711 dout pin AZUL
const int HX711_sck = 7; //mcu > HX711 sck pin MORADO

HX711_ADC LoadCell(HX711_dout, HX711_sck);
const int calVal_calVal_eepromAdress = 0;
unsigned long t = 0;
float fuerza;
//**********************************************************************************************************************
//************************************************** SENSOR DE TEMPER **************************************************
//**************************************************     PINES  7     **************************************************
//**********************************************************************************************************************
int Sensor = 7 ; // Prog_15_1 
float temp;

//**********************************************************************************************************************
//************************************************** SENSOR DE OXIGEN **************************************************
//**************************************************     PINES  ?     **************************************************
//**********************************************************************************************************************
float oxigen;
float pulso;

//**********************************************************************************************************************
//**************************************************** SETUP Y LOOP ****************************************************
//**********************************************************************************************************************
void setup() {
  Serial.begin(9600); 
  delay(500);
  //miBT.begin(9600);    // comunicacion serie entre Arduino y el modulo a 38400 bps
  sensor_Fuerza_SET();

  oxigen = 0;
  fuerza = 0;
  pulso = 0;
  temp = 0;
}
//*********************************************************************************************************************
String texto;
void loop() {
  sensor_Fuerza_LOOP();
  sensor_Temperatura_LOOP();
  texto = "";
  texto.concat(pulso);
  texto.concat(",");
  texto.concat(oxigen);
  texto.concat(",");
  texto.concat(temp);
  texto.concat(",");
  texto.concat(fuerza);
  texto.concat("$");
    Serial.println(texto);
  delay(500);
}

//**********************************************************************************************************************
//************************************************** SENSOR DE TEMPER **************************************************
//**********************************************************************************************************************
void sensor_Temperatura_LOOP(){
  int lectura = analogRead(Sensor);
  float voltaje = 5.0 /1024 * lectura ; // Atencion aqui
  temp = voltaje * 100 ; // para el LM35DZ 
}

//**********************************************************************************************************************
//************************************************** SENSOR DE FUERZA **************************************************
//**********************************************************************************************************************
void sensor_Fuerza_SET(){
  float calibrationValue; // calibration value
  calibrationValue = 696.0; // uncomment this if you want to set this value in the sketch
  
  LoadCell.begin();
  unsigned long stabilizingtime = 2000; // tare preciscion can be improved by adding a few seconds of stabilizing time
  boolean _tare = true; //set this to false if you don't want tare to be performed in the next step
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
  }
  else {
    LoadCell.setCalFactor(calibrationValue); // set calibration factor (float)
    Serial.println("Startup is complete");
  }
  while (!LoadCell.update());
  Serial.print("Calibration value: ");
  Serial.println(LoadCell.getCalFactor());
  Serial.print("HX711 measured conversion time ms: ");
  Serial.println(LoadCell.getConversionTime());
  Serial.print("HX711 measured sampling rate HZ: ");
  Serial.println(LoadCell.getSPS());
  Serial.print("HX711 measured settlingtime ms: ");
  Serial.println(LoadCell.getSettlingTime());
  Serial.println("Note that the settling time may increase significantly if you use delay() in your sketch!");
  if (LoadCell.getSPS() < 7) {
    Serial.println("!!Sampling rate is lower than specification, check MCU>HX711 wiring and pin designations");
  }
  else if (LoadCell.getSPS() > 100) {
    Serial.println("!!Sampling rate is higher than specification, check MCU>HX711 wiring and pin designations");
  }
}
//*********************************************************************************************************************
void sensor_Fuerza_LOOP(){
  static boolean newDataReady = 0;
  const int serialPrintInterval = 500; //increase value to slow down serial print activity

  // check for new data/start next conversion:
  if (LoadCell.update()) newDataReady = true;

  // get smoothed value from the dataset:
  if (newDataReady) {
    if (millis() > t + serialPrintInterval) {
      float i = LoadCell.getData(); //LECTURA DEL VALOR DE FUERZA EN LA CELULA
      //Serial.print("Load_cell output val: ");
      //Serial.println(i);
      fuerza = i;
      if(fuerza < 0) fuerza = fuerza * -1;
      newDataReady = 0;
      t = millis();
    }
  }

  // receive command from serial terminal, send 't' to initiate tare operation:
  if (Serial.available() > 0) {
    char inByte = Serial.read();
    if (inByte == 't') LoadCell.tareNoDelay();
  }

  // check if last tare operation is complete:
  if (LoadCell.getTareStatus() == true) {
    //Serial.println("Tare complete");
  }
}
//*********************************************************************************************************************
//*********************************************************************************************************************
//*********************************************************************************************************************
