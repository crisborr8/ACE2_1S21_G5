const { Router } = require('express');
const router = Router();
const cors = require('cors');
var bodyParser = require('body-parser');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '100mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

/**
 * Modulo para Mysql
 */

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '104.154.169.109',
    user: 'root',
    password: 'secret',
    database: 'BoxinPunch',
    port: 33061

   /* host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'dbinter',
    port: 3306*/

});

//-------------------

router.get('/hola', 
    (req,res) => res.json
    (
        {msg: 'bye :D'}
    )
);

// -------------------------------------------------------------------------------------
// fechasHistorial
// -->  /fechasHistorial
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select fecha from Sesion_Entrenamiento where id_User = 1; 
*/
router.post("/fechasHistorial", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select fecha, hora from Sesion_Entrenamiento where id_User = ' + String(request.body.data.id_user);

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        var respuesta = [];
        for (let index = 0; index < rows.length; index++) {
            const element = rows[index];

            

            var fila = String(element.fecha)
            console.log(fila)
            var katydatesplited = fila.split(" ");
            var day = String(katydatesplited[2])
            var month = '';
            var premonth = String(katydatesplited[1])
            var year = String(katydatesplited[3])
            var monthTable = [];
            monthTable.push({ "monthAbbreviation" : "Jan", "number" : "01" });
            monthTable.push({ "monthAbbreviation" : "Feb", "number" : "02" });
            monthTable.push({ "monthAbbreviation" : "Mar", "number" : "03" });
            monthTable.push({ "monthAbbreviation" : "Apr", "number" : "04" });
            monthTable.push({ "monthAbbreviation" : "May", "number" : "05" });
            monthTable.push({ "monthAbbreviation" : "Jun", "number" : "06" });
            monthTable.push({ "monthAbbreviation" : "Jul", "number" : "07" });
            monthTable.push({ "monthAbbreviation" : "Aug", "number" : "08" });
            monthTable.push({ "monthAbbreviation" : "Sep", "number" : "09" });
            monthTable.push({ "monthAbbreviation" : "Oct", "number" : "10" });
            monthTable.push({ "monthAbbreviation" : "Nov", "number" : "11" });
            monthTable.push({ "monthAbbreviation" : "Dec", "number" : "12" });
            for (let index = 0; index < monthTable.length; index++) {
                const element = monthTable[index];
                if (element.monthAbbreviation == premonth) {
                    month = element.number;
                } 
            }
            respuesta.push({ "fecha" : String(year + '-' + month + '-' + day), "hora" : String(element.hora)});
            

        }
        response.json(
            {
                status: "success",
                message: "none",
                data: respuesta
            }
        );
    }); 
});


function casteoFechasfeas(rows)
{
    for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        var fila = String(element.fecha)
        var filasplited = fila.split("T")
        rows[index].fecha = filasplited[0];
    }
}

function getString_of_KatyDATE_becauseSheCannotSendSsAString_ImVeryMad(katydate_sendUs)
{
    // katydate example: Thu Apr 29 2021 18:16:12 GMT-0600
    var katydate = String(katydate_sendUs)
    var katydatesplited = katydate.split(" ");
    var day = String(katydatesplited[2])
    var month = '';
    var premonth = String(katydatesplited[1])
    var year = String(katydatesplited[3])
    var monthTable = [];
    monthTable.push({ "monthAbbreviation" : "Jan", "number" : "01" });
    monthTable.push({ "monthAbbreviation" : "Feb", "number" : "02" });
    monthTable.push({ "monthAbbreviation" : "Mar", "number" : "03" });
    monthTable.push({ "monthAbbreviation" : "Apr", "number" : "04" });
    monthTable.push({ "monthAbbreviation" : "May", "number" : "05" });
    monthTable.push({ "monthAbbreviation" : "Jun", "number" : "06" });
    monthTable.push({ "monthAbbreviation" : "Jul", "number" : "07" });
    monthTable.push({ "monthAbbreviation" : "Aug", "number" : "08" });
    monthTable.push({ "monthAbbreviation" : "Sep", "number" : "09" });
    monthTable.push({ "monthAbbreviation" : "Oct", "number" : "10" });
    monthTable.push({ "monthAbbreviation" : "Nov", "number" : "11" });
    monthTable.push({ "monthAbbreviation" : "Dec", "number" : "12" });
    for (let index = 0; index < monthTable.length; index++) {
        const element = monthTable[index];
        if (element.monthAbbreviation == premonth) {
            month = element.number;
        } 
    }
    return String(day + '/' + month + '/' + year);
}


// -------------------------------------------------------------------------------------
// entrenamientosFecha
// -->  /entrenamientosFecha
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select se.idSesion_Entrenamiento as id, count(*) as duracion, se.hora
    from Sesion_Entrenamiento se
    inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion)
    where se.id_User = 1
    and se.fecha = STR_TO_DATE('13/04/2021','%d/%m/%Y')
    group by se.idSesion_Entrenamiento, se.hora

    select se.idSesion_Entrenamiento as id, se.hora
    from Sesion_Entrenamiento se
    inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion)
    where se.id_User = 1
    and se.fecha = STR_TO_DATE('13/04/2021','%d/%m/%Y')
*/
router.post("/entrenamientosFecha", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select se.idSesion_Entrenamiento as id, count(*) as duracion, se.hora '
    CONSULTA1 = CONSULTA1 + 'from Sesion_Entrenamiento se '
    CONSULTA1 = CONSULTA1 + 'inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion) '
    CONSULTA1 = CONSULTA1 + 'where se.id_User = ' + String(request.body.data.id_user);
    CONSULTA1 = CONSULTA1 + ' and se.fecha = STR_TO_DATE(\'' + String(request.body.data.fecha) + '\',\'%d/%m/%Y\')';
    CONSULTA1 = CONSULTA1 + ' group by se.idSesion_Entrenamiento, se.hora '

    /**
     * select count(*) as no
     * from Datos_Entrenamiento de
     * inner join Sesion_Entrenamiento se on (se.idSesion_Entrenamiento = de.id_Sesion)
     * where se.id_User = 1
     * and se.decha = XXX
     */
    var CONSULTA2 = '';
    CONSULTA2 = CONSULTA2 + 'select count(*) as no from  d inner join Sesion_Entrenamiento se on (se.idSesion_Entrenamiento = de.id_Sesion) ';
    CONSULTA2 = CONSULTA2 + 'where se.id_User = ' + String(request.body.data.id_user);
    CONSULTA2 = CONSULTA2 + ' and se.fecha = STR_TO_DATE(\'' + String(request.body.data.fecha) + '\',\'%d/%m/%Y\')';

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: rows
            }
        );
    }); 

});


// -------------------------------------------------------------------------------------
// historialMedicion
// -->  /fechasHistorial
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select de.XXX
    from Sesion_Entrenamiento se
    inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion)
    where se.idSesion_Entrenamiento = XXX
*/
router.post("/historialMedicion", (request, response, next) => {

    var mediciones = [];
    mediciones.push({"katyname" : "Fuerza", "BDname" : "fuerza"});
    mediciones.push({"katyname" : "Oxigeno", "BDname" : "oxigenacion"});
    mediciones.push({"katyname" : "Aceleracion", "BDname" : "aceleracion"});
    mediciones.push({"katyname" : "Temperatura", "BDname" : "temperatura"});
    mediciones.push({"katyname" : "Ritmo Cardiaco", "BDname" : "pulso"});

    var campomedicion = 'fuerza';
    for (let index = 0; index < mediciones.length; index++) {
        const element = mediciones[index];
        if (element.katyname == String(request.body.data.medicion)) {
            campomedicion = element.BDname;
        }
    }

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select de.' + campomedicion + ' as valor ';
    CONSULTA1 = CONSULTA1 + 'from Sesion_Entrenamiento se ';
    CONSULTA1 = CONSULTA1 + 'inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion) ';
    CONSULTA1 = CONSULTA1 + 'where se.idSesion_Entrenamiento = ' + String(request.body.data.id_entrenamiento);

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: rows
            }
        );
    }); 
});


// -------------------------------------------------------------------------------------
// minMedMax
// -->  /minMedMax
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select min(de.fuerza) as valor, avg(de.fuerza) as valor, max(de.fuerza) as valor
    from Sesion_Entrenamiento se
    inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion)
    where se.idSesion_Entrenamiento = 1;
*/
router.post("/minMedMax", (request, response, next) => {

    var mediciones = [];
    mediciones.push({"katyname" : "Fuerza", "BDname" : "fuerza"});
    mediciones.push({"katyname" : "Oxigeno", "BDname" : "oxigenacion"});
    mediciones.push({"katyname" : "Aceleracion", "BDname" : "aceleracion"});
    mediciones.push({"katyname" : "Temperatura", "BDname" : "temperatura"});
    mediciones.push({"katyname" : "Ritmo Cardiaco", "BDname" : "pulso"});

    var campomedicion = 'fuerza';
    for (let index = 0; index < mediciones.length; index++) {
        const element = mediciones[index];
        if (element.katyname == String(request.body.data.medicion)) {
            campomedicion = element.BDname;
        }
    }

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select min(de.' + campomedicion + ') as valormin, ';
    CONSULTA1 = CONSULTA1 + 'avg(de.' + campomedicion + ') as valormed, ';
    CONSULTA1 = CONSULTA1 + 'max(de.' + campomedicion + ') as valormax ';
    CONSULTA1 = CONSULTA1 + 'from Sesion_Entrenamiento se ';
    CONSULTA1 = CONSULTA1 + 'inner join Datos_Entrenamiento de on (se.idSesion_Entrenamiento = de.id_Sesion) ';
    CONSULTA1 = CONSULTA1 + 'where se.idSesion_Entrenamiento = ' + String(request.body.data.id_entrenamiento);

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: rows
            }
        );
    }); 
    
});


// -------------------------------------------------------------------------------------
// login
// -->  /login
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select idUsuario 
    from Usuario 
    where usr = 'estone'
    and psw = '123'
    ;
*/
router.post("/login", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select * from Usuario ';
    CONSULTA1 = CONSULTA1 + 'where usr = \'' + String(request.body.data.usuario) + '\'';
    CONSULTA1 = CONSULTA1 + ' and psw = \'' + String(request.body.data.contrasena) + '\'';

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }

        var respuesta = rows;

        if (respuesta.length == 0) 
        {
            // no hay usuarios  
            var jsonrespuesta = {
                "existe" : 0,
                "idUser" : 0
            };

            response.json(
                {
                    status: "success",
                    message: "none",
                    data: jsonrespuesta
                }
            );  
        } 
        else 
        {
            var fila = respuesta[0];
            var jsonrespuesta = {
                "existe" : 1,
                "idUser" : String(fila.idUsuario),
                "nombre" : String(fila.nombre),
                "apellido" : String(fila.apellido),
                "usuario" : String(fila.usr),
                "edad" : String(fila.edad),
                "peso" : String(fila.peso),
                "estatura" : String(fila.estatura),
                "correo" : String(fila.correo),
            };

            response.json(
                {
                    status: "success",
                    message: "none",
                    data: jsonrespuesta
                }
            );

        }

        
    }); 
});


// -------------------------------------------------------------------------------------
// ultimaSesion
// -->  /ultimaSesion
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    select idSesion_Entrenamiento as idSesion from Sesion_Entrenamiento where id_User = 1
    order by idSesion_Entrenamiento desc limit; 
*/
router.post("/ultimaSesion", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select idSesion_Entrenamiento as idSesion from Sesion_Entrenamiento where id_User = ' + String(request.body.data.idUser);
    CONSULTA1 = CONSULTA1 + ' order by idSesion_Entrenamiento desc limit 1';


    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: rows[0]
            }
        );
    }); 
});


// -------------------------------------------------------------------------------------
// registro
// -->  /registro
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    
    insert into Usuario 
    (nombre,apellido,usr,psw,edad,peso,estatura,correo,info_Publica)
    values
    ('Emma','Stone','estone','123',26,100,170,'estone@gmail.com',1);

*/
router.post("/registro", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'insert into Usuario ';
    CONSULTA1 = CONSULTA1 + '(nombre,apellido,usr,psw,edad,peso,estatura,correo,info_Publica) ';
    CONSULTA1 = CONSULTA1 + 'values (';
    CONSULTA1 = CONSULTA1 + '\'' + String(request.body.data.nombre) + '\',';
    CONSULTA1 = CONSULTA1 + '\'' + String(request.body.data.apellido) + '\',';
    CONSULTA1 = CONSULTA1 + '\'' + String(request.body.data.usuario) + '\',';
    CONSULTA1 = CONSULTA1 + '\'' + String(request.body.data.contrasena) + '\',';
    CONSULTA1 = CONSULTA1 + '' + String(request.body.data.edad) + ',';
    CONSULTA1 = CONSULTA1 + '' + String(request.body.data.peso) + ',';
    CONSULTA1 = CONSULTA1 + '' + String(request.body.data.estatura) + ',';
    CONSULTA1 = CONSULTA1 + '\'' + String(request.body.data.correo) + '\'';
    CONSULTA1 = CONSULTA1 + ',1)';


    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error,
                    data: {
                        "guardado" : "false"
                    }
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: {
                    "guardado" : "true"
                }
            }
        );
    }); 
});



// -------------------------------------------------------------------------------------
// CrearSesion
// -->  /CrearSesion
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)

    insert into Sesion_Entrenamiento
    (id_User, fecha, duracion)
    values
    (1,STR_TO_DATE('10/05/2021','%d/%m/%Y'),0);
*/
router.post("/CrearSesion", (request, response, next) => {

    console.log('entro a crear sesion')

    var CONSULTA10 = 'SELECT CURTIME() as tiempo';
    connection.query( CONSULTA10, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }

        console.log(rows)

        var hora = incrementarTime(String(rows[0].tiempo))
        console.log(hora)
        var CONSULTA1 = '';
        CONSULTA1 = CONSULTA1 + 'insert into Sesion_Entrenamiento ';
        CONSULTA1 = CONSULTA1 + '(id_User, fecha, duracion, hora) ';
        CONSULTA1 = CONSULTA1 + 'values (';
        CONSULTA1 = CONSULTA1 + '' + String(request.body.data.idUser) + ',';
        CONSULTA1 = CONSULTA1 + '' + 'CURDATE()' + ',';
        CONSULTA1 = CONSULTA1 + '0,';
        CONSULTA1 = CONSULTA1 + '\'' + String(hora) + '\'';
        CONSULTA1 = CONSULTA1 + ')';
        
        connection.query(CONSULTA1, (error, rows) => {
            if (error) {
                console.log(error);
                response.json(
                    {
                        status: "fail",
                        message: error
                    }
                );
            }
            
            var CONSULTA2 = 'select idSesion_Entrenamiento from Sesion_Entrenamiento where id_User = ' + String(request.body.data.idUser) + ' order by idSesion_Entrenamiento desc limit 1';
            connection.query(CONSULTA2, (error, rows) => {
                if (error) {
                    console.log(error);
                    response.json(
                        {
                            status: "fail",
                            message: error
                        }
                    );
                }

                console.log(rows)
                
                response.json(
                    {
                        status: "success",
                        message: "none",
                        data: {
                            "idSesion" : rows[0].idSesion_Entrenamiento
                        }
                    }
                );
            });
    
        }); 

    }); 
});


 

// -------------------------------------------------------------------------------------
// guardarDatos
// -->  /guardarDatos
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    insert into Datos_Entrenamiento
    (id_Sesion, oxigenacion, temperatura, pulso, fuerza, fecha, hora, aceleracion, velocidad)
    values
    (
        1,100,99,98,100,
        STR_TO_DATE('10/05/2021','%d/%m/%Y'),
        '10:00:00',
        70,71
    );
*/
router.post("/guardarDatos", (request, response, next) => {

    var CONSULTA1 = 'SELECT CURTIME() as tiempo';

    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        var tiempo = rows[0].tiempo;
        var tiempoFix = incrementarTime(String(tiempo));
        console.log(tiempo)
        console.log(tiempoFix)

        try {

            var CONSULTA2 = '';
            CONSULTA2 = CONSULTA2 + 'select u.peso from Usuario u inner join Sesion_Entrenamiento se on (se.id_User = u.idUsuario) ';
            CONSULTA2 = CONSULTA2 + 'where se.idSesion_Entrenamiento = ' + String(request.body.data.idSesion);
            connection.query(CONSULTA2, (error, rows) => {
                if (error) {
                    console.log(error);
                    response.json(
                        {
                            status: "fail",
                            message: error
                        }
                    );
                }

                console.log(rows)
                console.log(rows[0])
                if (rows.length == 0) {
                    response.json(
                        {
                            status: "fail",
                            message: "IdSesion invalido"
                        }
                    );
                    return
                }

                if (rows[0] == 0) {
                    response.json(
                        {
                            status: "fail",
                            message: "IdSesion invalido"
                        }
                    );
                }


                var peso = rows[0].peso;
                var masa = Math.trunc((peso / 9.8)); //  m = f / a
                var aceleracion = Math.trunc(Number(String(request.body.data.fuerza)) / masa); // f =ma : a = f / m
                var velocidad = Math.trunc(aceleracion * 0.6) // Vmedia = a * t 


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
                CONSULTA3 = CONSULTA3 + String(aceleracion) + ',';
                CONSULTA3 = CONSULTA3 + String(velocidad) + '';
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
                    response.json(
                        {
                            status: "fail",
                            message: error,
                            data : {
                                "guardado" : "true"
                            }
                        }
                    );
                }); 

            }); 
            
        } catch (error) {
            response.json(
                {
                    status: "fail",
                    message: "IdSesion invalido"
                }
            )
        }


    }); 
});


function incrementarTime(tiempoInicial)
{
    var tiempoInicial_ = String(tiempoInicial);
    var tiemposplitted =  tiempoInicial_.split(":");
    var hora = tiemposplitted[0];
    var minuto = tiemposplitted[1];
    var segundo = tiemposplitted[2];

    var segundoint = Number(segundo);
    segundoint = segundoint;
    segundo = String(segundoint)

    var agregadohora = 0;
    if (segundoint >= 60) {
        segundoint = segundoint - 60;

        if (segundoint == 0) {
            segundo =String("00")
        }
        else
        {
            segundo =String(segundoint)
        }

        
        var minutoint = Number(minuto)
        minutoint = minutoint + 1;
        minuto = String(minutoint)

        if (minutoint == 60) {
            minuto = String("00")
            agregadohora = 1;
        }

    }

    var horaint = Number(hora);
    horaint = horaint + 17 + agregadohora;

    if (horaint >= 24) {
        horaint = horaint - 24;
    }

    return String(String(horaint) + ':' + minuto + ":" + String(segundo))
}

// -------------------------------------------------------------------------------------
// ObtenerMediciones
// -->  /ObtenerMediciones
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)
    
    select oxigenacion as oxigeno, pulso as ritmocardiaco, temperatura, fuerza, velocidad, aceleracion
    from Usuario u 
    inner join Sesion_Entrenamiento se on (se.id_User = u.idUsuario)
    inner join Datos_Entrenamiento de on (de.id_Sesion = se.idSesion_Entrenamiento)
    where u.idUsuario = 1
    and se.idSesion_Entrenamiento = 1
    and de.hora = 'hora';
     
    3
    28
*/
router.post("/ObtenerMediciones", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'select oxigenacion as oxigeno, pulso as ritmocardiaco, temperatura, fuerza, velocidad, aceleracion ';
    CONSULTA1 = CONSULTA1 + 'from Usuario u ';
    CONSULTA1 = CONSULTA1 + 'inner join Sesion_Entrenamiento se on (se.id_User = u.idUsuario) ';
    CONSULTA1 = CONSULTA1 + 'inner join Datos_Entrenamiento de on (de.id_Sesion = se.idSesion_Entrenamiento) ';
    CONSULTA1 = CONSULTA1 + 'where u.idUsuario = ' + String(request.body.data.idusuario);
    CONSULTA1 = CONSULTA1 + ' and se.idSesion_Entrenamiento = ' + String(request.body.data.idsesion);
    CONSULTA1 = CONSULTA1 + ' and de.hora = \'' + String(request.body.data.hora) + '\'';

    console.log("--> " + String(request.body.data.hora))
    console.log("--> idusuario:" + String(request.body.data.idusuario))
    console.log("--> idsesion: " + String(request.body.data.idsesion))


    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error
                }
            );
        }
        console.log(rows)
        console.log(rows[0])
        var respuesta = rows[0]
        response.json(
            //{
                /*status: "success",
                message: "none",
                data: respuesta*/
                respuesta
            //}
        );
    }); 
});



// -------------------------------------------------------------------------------------
// EditarDatos
// -->  /EditarDatos
// -------------------------------------------------------------------------------------
/*
    String(request.body.data.cosa)


*/
router.post("/EditarDatos", (request, response, next) => {

    var CONSULTA1 = '';
    CONSULTA1 = CONSULTA1 + 'update Usuario set ';
    CONSULTA1 = CONSULTA1 + ' nombre = \'' + String(request.body.data.nombre) + '\',';
    CONSULTA1 = CONSULTA1 + ' apellido = \'' + String(request.body.data.apellido) + '\',';
    CONSULTA1 = CONSULTA1 + ' psw = \'' + String(request.body.data.contrasena) + '\',';
    CONSULTA1 = CONSULTA1 + ' edad = ' + String(request.body.data.edad) + ',';
    CONSULTA1 = CONSULTA1 + ' peso = ' + String(request.body.data.peso) + ',';
    CONSULTA1 = CONSULTA1 + ' estatura = ' + String(request.body.data.estatura) + ',';
    CONSULTA1 = CONSULTA1 + ' correo = \'' + String(request.body.data.correo) + '\'';
    CONSULTA1 = CONSULTA1 + ' where usr = \'' + String(request.body.data.usuario) + '\'';


    connection.query(CONSULTA1, (error, rows) => {
        if (error) {
            console.log(error);
            response.json(
                {
                    status: "fail",
                    message: error,
                    data: {
                        "guardado" : "false"
                    }
                }
            );
        }
        response.json(
            {
                status: "success",
                message: "none",
                data: {
                    "guardado" : "true"
                }
            }
        );
    }); 
});

module.exports = router;


