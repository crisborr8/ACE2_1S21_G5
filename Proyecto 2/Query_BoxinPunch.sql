CREATE DATABASE BoxinPunch;
Use BoxinPunch;
create table Usuario (id smallint AUTO_INCREMENT PRIMARY KEY, usr varchar(20) NOT NULL, psw varchar(20) NOT NULL,
						nombre varchar(100) NOT NULL, apellido varchar(100), edad tinyint NOT NULL, 
                        peso float(5,2) NOT NULL, estatura float(5,2) NOT NULL, correo varchar(255) NOT NULL,
                        isCoach bool NOT NULL, info_Publica bool NOT NULL);
create table Coaching (id int AUTO_INCREMENT PRIMARY KEY, id_Coach smallint NOT NULL, id_User smallint NOT NULL,
						FOREIGN KEY(id_Coach) REFERENCES Usuario(id),
                        FOREIGN KEY(id_User) REFERENCES Usuario(id));
create table Sesion_Entrenamiento (id int AUTO_INCREMENT PRIMARY KEY, id_User smallint NOT NULL, 
									fecha datetime NOT NULL, duracion time NOT NULL,
									FOREIGN KEY(id_User) REFERENCES Usuario(id));
create table Datos_Entrenamiento (id int AUTO_INCREMENT PRIMARY KEY, id_Sesion int NOT NULL, pulso smallint NOT NULL,
									oxigenacion smallint NOT NULL, temperatura tinyint NOT NULL, fuerza float(5,2) NOT NULL,
                                    FOREIGN KEY(id_Sesion) REFERENCES Sesion_Entrenamiento(id));

