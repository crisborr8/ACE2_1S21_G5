-- create database BoxinPunch;
-- use BoxinPunch;

-- -----------------------------------------------------
-- Table BoxinPunch.log
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS BoxinPunch.log (
  id_log INT NOT NULL AUTO_INCREMENT,
  clausula VARCHAR(1000) NULL,
  fecha date NULL,
  PRIMARY KEY (id_log))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS BoxinPunch.Usuario (
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NULL, 
  apellido varchar(100) NULL,
  usr VARCHAR(1000) NULL,
  psw VARCHAR(1000) NULL,
  edad int NULL, 
  peso float(5,2)  NULL, 
  estatura float(5,2)  NULL, 
  correo varchar(1000)  NULL,
  info_Publica int  NULL,
  PRIMARY KEY (idUsuario))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS BoxinPunch.Sesion_Entrenamiento (
  idSesion_Entrenamiento INT NOT NULL AUTO_INCREMENT,
  id_User int null,
  fecha date null,
  hora VARCHAR(1000) null,
  duracion int null,
  FOREIGN KEY(id_User) REFERENCES Usuario(idUsuario),
  PRIMARY KEY (idSesion_Entrenamiento))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS BoxinPunch.Datos_Entrenamiento (
  idDatos_Entrenamiento INT NOT NULL AUTO_INCREMENT,
  id_Sesion int NOT NULL,
  oxigenacion int not null,
  temperatura int not null,
  pulso int not null,
  fuerza float(5,2) NULL,
  fecha date null,
  hora VARCHAR(1000) null,
  aceleracion int null,
  velocidad int null,
  FOREIGN KEY(id_Sesion) REFERENCES Sesion_Entrenamiento(idSesion_Entrenamiento),
  PRIMARY KEY (idDatos_Entrenamiento))
ENGINE = InnoDB;

            

--- Correciones

 alter table Sesion_Entrenamiento add hora time;
 update Sesion_Entrenamiento set hora = '00:10:01';