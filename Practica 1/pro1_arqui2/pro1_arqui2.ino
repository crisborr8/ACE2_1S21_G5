//VAR BUZZER Y TIEMPO
unsigned long segundos = 60;
unsigned long segundosArduino = 64;
unsigned long minutos = 0;
int motor = 13;
int buzz = 9;
int botonMembrana = 12;
bool presionado = false;
bool switcheo = false;
int repeticion = 0;
int ritmo = 5;
bool prueba = true;
//----------FIN VARIABLES-----------

void setup() {
  pinMode(motor, OUTPUT);
  digitalWrite(motor, HIGH);
  Serial.begin(9600);
  
  pinMode(buzz, OUTPUT);
  pinMode(botonMembrana, OUTPUT);
 
}

void loop(){

  minuto();
  activarMembranaBoton();
  
  limiteRitmo();
 
}

void limiteRitmo(){
  if(prueba){ //suponiendo que el ritmoMaximo es =10
    digitalWrite(motor, LOW);
    delay(10000);
    digitalWrite(motor, HIGH);
    prueba = false;
  } 
  
}

void activarMembranaBoton(){
  if(digitalRead(botonMembrana)== HIGH) {
      presionado = true;
    }else {
      if(presionado){
        if(switcheo){
          digitalWrite(motor, LOW);
        }else{
          digitalWrite(motor, HIGH);
        }
        switcheo = !switcheo;
        presionado = false;
      }
    }
}

void minuto(){
  unsigned long segundosArd =  (millis())/1000;
  if(segundosArd == segundos){
    segundos += 60;
    minutos++;
    repeticion++;
    //Encender buzzer
    analogWrite(buzz, 50);
    delay(1000);//Buzzer sonando
    //Apagar buzzer
    analogWrite(buzz, 0);
    Serial.print("Min: ");
    Serial.println(minutos);
  }
}


void rendicion(){
  
}
