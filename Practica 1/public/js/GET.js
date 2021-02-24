function users_Todos(){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/coach/atletas/'
        + sessionStorage.getItem("id"),
        success: function(res_as) {
            $.ajax({
                type:'GET',
                url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Usuarios/Usuario',
                success: function(res) {
                    console.log(res_as);
                    console.log(res);
                    var tb0 = $('#aCargo tbody')
                    var tbl = $('#noaCargo tbody')
                    $.each(res, function(i, item){
                        var ingresado = false;
                        $.each(res_as, function(k, itemRes){
                            if (itemRes.id_user == item.id_usu){
                                ingresado = true;
                                tb0.append(
                                    '<tr class="row100 head">' +
                                    '<th class="cell100 column1" onclick="detachAtleta(\'' + item.id_usu + '\')">▼▼</th>' +
                                    '<th class="cell100 column3" onclick="aCargoPe(\'' + item.id_usu + '\')">' + item.nombres + '</th>' +
                                    '<th class="cell100 column3" onclick="aCargoTe(\'' + item.id_usu + '\')">Observar</th>' +
                                    '<th class="cell100 column3" onclick="aCargoOx(\'' + item.id_usu + '\')">Observar</th>' +
                                    '<th class="cell100 column3" onclick="aCargoPu(\'' + item.id_usu + '\')">Observar</th>' +
                                    '</tr>'
                                );
                            }
                        })
                        if (!ingresado){
                            tbl.append(
                                '<tr class="row100 head" onclick="coach_Asociar(\'' + item.id_usu + '\')">' +
                                '<th class="cell100 column1">♥♥</th>' +
                                '<th class="cell100 column2">' + item.nombres + '</th>' +
                                '<th class="cell100 column3">Agregar</th>' +
                                '</tr>'
                            );
                        }
                    });
                },
                error: function() {
                    alert("Error en solicitud de datos")
                }
            });
        },
        error: function() {
            
        }
    });
}

function user_Login(){
    var dataArray = Array.from(document.querySelectorAll('#sendLogin input')).reduce((acc,input) => 
        ({...acc,[input.id]: input.value}), {});
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/login/Usuario/'
                + dataArray.correo + '/' + dataArray.contra,
        success: function(res) {
            sessionStorage.setItem("id", res.Id_User);
            sessionStorage.setItem("id_user", res.Id_User);
            sessionStorage.setItem("nombre", res.nombres);
            sessionStorage.setItem("apellido", res.apellidos);
            sessionStorage.setItem("iscoach", res.iscoach);
            window.location.href="user.html"
        },
        error: function() {
            alert("Error en datos")
            clearSession();
        }
    });
    alert("Cargando api")
}

function user_Med(){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Mediciones/Fecha/Usuario/' 
            + sessionStorage.getItem("id_user"),
        success: function(res) {
            console.log(res)
            var tbl = $('#med_hist tbody')
            var result = res.reduce((p, c) => 
            (p[c.Fecha] = Object.assign({},{}, p[c.Fecha], c)) && p, {});
            res = Object.keys(result).map(x=>result[x])
            $.each(res, function(i, item){
                tbl.append(
                    '<tr class="row100 head" onclick="reports(\'' + item.Fecha+ '\')">' +
                    '<th class="cell100 column1">♥</th>' +
                    '<th class="cell100 column2">' + item.Fecha+ '</th>' +
                    '<th class="cell100 column3">Ir</th>' +
                    '</tr>'
                );
            });
        },
        error: function() {
            alert("Error en datos")
        }
    });
}

function temp_(){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Mediciones/Temperatura/Usuario/' 
            + sessionStorage.getItem('id_user') + '/' + sessionStorage.getItem("date"),
        success: function(res) {
            var max = 0, min = 0;
            var fecha = sessionStorage.getItem('date').split('-');
            var date = fecha[1] + '-' + fecha[0] + '-' + fecha[2]
            var dt = new Date(date)

            var tbl = $('#temp1 tbody')
            $.each(res, function(i, item){
                var h = item.Hora.split(':')
                var d = dt.setHours(parseInt(h[0]), parseInt(h[1]),parseInt(h[2]))
                
                tbl.append(
                    '<tr class="row100 head">' +
                    '<th class="cell100 column1">' + (i + 1) + '</th>' +
                    '<th class="cell100 column2">' + item.Temperatura + '</th>' +
                    '<th class="cell100 column3">' + item.Hora + '</th>' +
                    '</tr>'
                );

                if(parseInt(item.Temperatura) > parseInt(res[max].Temperatura)) max = i
                if(parseInt(item.Temperatura) < parseInt(res[min].Temperatura)) min = i
                
                item.x = new Date(d)
                item.y = parseInt(item.Temperatura)
            });
            
            var p = (Object.values(res).reduce((avg, { y }, _, { length }) => 
                    avg + y / length, 0)).toFixed(2);

            document.getElementById('temp3').innerHTML = p
            document.getElementById('temp4').innerHTML = res[max].y
            document.getElementById('temp5').innerHTML = res[min].y
            res[min].indexLabel = "\u2691 Menor"
            res[max].indexLabel = "\u2605 Mayor"

            graficarTemperatura_Barra(res);
        },
        error: function() {
            alert("Error en datos")
        }
    });
}
function oxig_(){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Mediciones/OxigenoF/Usuario/' 
            + sessionStorage.getItem('id_user') + '/' + sessionStorage.getItem("date"),
        success: function(res) {
            var max = 0, min = 0;
            var fecha = sessionStorage.getItem('date').split('-');
            var date = fecha[1] + '-' + fecha[0] + '-' + fecha[2]
            var dt = new Date(date)

            var tbl = $('#oxig1 tbody')
            $.each(res, function(i, item){
                var h = item.Hora.split(':')
                var d = dt.setHours(parseInt(h[0]), parseInt(h[1]),parseInt(h[2]))
                
                tbl.append(
                    '<tr class="row100 head">' +
                    '<th class="cell100 column1">' + (i + 1) + '</th>' +
                    '<th class="cell100 column2">' + item.OxigenoES + '</th>' +
                    '<th class="cell100 column3">' + item.Hora + '</th>' +
                    '</tr>'
                );

                if(parseInt(item.OxigenoES) > parseInt(res[max].OxigenoES)) max = i
                if(parseInt(item.OxigenoES) < parseInt(res[min].OxigenoES)) min = i
                
                item.x = new Date(d)
                item.y = parseInt(item.OxigenoES)
            });
            
            var p = (Object.values(res).reduce((avg, { y }, _, { length }) => 
                    avg + y / length, 0)).toFixed(2);

            document.getElementById('oxig3').innerHTML = p
            res[min].indexLabel = "\u2691 Menor"
            res[max].indexLabel = "\u2605 Mayor"

            graficarOxigenacion_Barra(res);
        },
        error: function() {
            alert("Error en datos")
        }
    });
}
function puls_(){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Mediciones/RitmoCF/Usuario/' 
            + sessionStorage.getItem('id_user') + '/' + sessionStorage.getItem("date"),
        success: function(res) {
            var max = 0, min = 0;
            var fecha = sessionStorage.getItem('date').split('-');
            var date = fecha[1] + '-' + fecha[0] + '-' + fecha[2]
            var dt = new Date(date)

            var tbl = $('#puls1 tbody')
            $.each(res, function(i, item){
                var h = item.Hora.split(':')
                var d = dt.setHours(parseInt(h[0]), parseInt(h[1]),parseInt(h[2]))
                
                tbl.append(
                    '<tr class="row100 head">' +
                    '<th class="cell100 column1">' + (i + 1) + '</th>' +
                    '<th class="cell100 column2">' + item.Ritmo_Cardiaco + '</th>' +
                    '<th class="cell100 column3">' + item.Hora + '</th>' +
                    '</tr>'
                );

                if(parseInt(item.Ritmo_Cardiaco) > parseInt(res[max].Ritmo_Cardiaco)) max = i
                if(parseInt(item.Ritmo_Cardiaco) < parseInt(res[min].Ritmo_Cardiaco)) min = i
                
                item.x = new Date(d)
                item.y = parseInt(item.Ritmo_Cardiaco)
            });
            
            var p = (Object.values(res).reduce((avg, { y }, _, { length }) => 
                    avg + y / length, 0)).toFixed(2);

            document.getElementById('puls3').innerHTML = p
            res[min].indexLabel = "\u2691 Menor"
            res[max].indexLabel = "\u2605 Mayor"

            graficarPulsoCardiaco_Barra(res);
        },
        error: function() {
            alert("Error en datos")
        }
    });
}

function getRealTimeData(fecha, tipo){
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Mediciones/' + tipo + '/Usuario/' 
            + sessionStorage.getItem('id_user'),
        success: function(res) {
            if(tipo == 'OxigenoFHoy')
                localStorage.setItem('data', res[0].OxigenoES)
            else if(tipo == 'Temperatura')
                localStorage.setItem('data', res[0].Temperatura)
            else
                localStorage.setItem('data', res[0].Ritmo_Cardiaco)
        },
        error: function() {
            console.log("error en datos")
        }
    });
    return parseInt(localStorage.getItem('data'))
}