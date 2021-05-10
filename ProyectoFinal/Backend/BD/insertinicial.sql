
insert into Usuario 
(nombre,apellido,usr,psw,edad,peso,estatura,correo,info_Publica)
values
('Emma','Stone','estone','123',26,100,170,'estone@gmail.com',1);


insert into Sesion_Entrenamiento
(id_User, fecha, duracion)
values
(1,STR_TO_DATE('10/05/2021','%d/%m/%Y'),0);


insert into Datos_Entrenamiento
(id_Sesion, oxigenacion, temperatura, pulso, fuerza, fecha, hora, aceleracion, velocidad)
values
(
    1,100,99,98,100,
    STR_TO_DATE('10/05/2021','%d/%m/%Y'),
    '10:00:00',
    70,71
);