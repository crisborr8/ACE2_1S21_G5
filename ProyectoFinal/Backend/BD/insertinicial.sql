
insert into Usuario 
(nombre,apellido,usr,psw,edad,peso,estatura,correo,info_Publica)
values
('Emma','Stone','estone','123',26,100,170,'estone@gmail.com',1);


    insert into Sesion_Entrenamiento
    (id_User, fecha, duracion)
    values
    (1,STR_TO_DATE('13/04/2021','%d/%m/%Y'),0);


insert into Datos_Entrenamiento
(id_Sesion, oxigenacion, temperatura, pulso, fuerza, fecha, hora, aceleracion, velocidad)
values
(
    2,100,99,98,100,
    STR_TO_DATE('10/05/2021','%d/%m/%Y'),
    '10:00:00',
    70,71
);



var CONSULTA3 = '';
        CONSULTA3 = CONSULTA3 + 'insert into Datos_Entrenamiento ';
        CONSULTA3 = CONSULTA3 + '(id_Sesion, oxigenacion, temperatura, pulso, fuerza, fecha, hora, aceleracion, velocidad) ';
        CONSULTA3 = CONSULTA3 + 'values(';
        CONSULTA3 = CONSULTA3 + String(request.body.data.idSesion) + ',';
        CONSULTA3 = CONSULTA3 + String(request.body.data.oxigeno) + ',';
        CONSULTA3 = CONSULTA3 + String(request.body.data.temperatura) + ',';
        CONSULTA3 = CONSULTA3 + String(request.body.data.pulso) + ',';
        CONSULTA3 = CONSULTA3 + String(request.body.data.fuerza) + ',';
        CONSULTA3 = CONSULTA3 + 'STR_TO_DATE(\'17/05/2021\',\'%d/%m/%Y\')' + ',';
        CONSULTA3 = CONSULTA3 + '\'' + tiempoFix + '\','
        CONSULTA3 = CONSULTA3 + ')';

        connection.query(CONSULTA3, (error, rows) => {
            if (error) {
                console.log(error);
                response.json(
                    {
                        status: "fail",
                        message: error
                    }
                );
            }
        }); 