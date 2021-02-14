
function api_login(){
    var dataArray = Array.from(document.querySelectorAll('#sendLogin input')).reduce((acc,input) => 
        ({...acc,[input.id]: input.value}), {});
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/login/Usuario/'
                + dataArray.correo + '/' + dataArray.contra,
        success: function(res) {
            sessionStorage.setItem("id", res.Id_User);
            sessionStorage.setItem("nombre", res.nombres);
            sessionStorage.setItem("apellido", res.apellidos);
            window.location.href="user.html"
        },
        error: function() {
            alert("Error en datos")
            clearSession();
        }
    });
    alert("Cargando api")
}
//var requ = require('../../functions/index.js')

function api_Act(){
    var dataArray = Array.from(document.querySelectorAll('#sendActual input')).reduce((acc,input) => 
        ({...acc,[input.id]: input.value}), {});
    if(dataArray.iscoach == 'on') dataArray.iscoach ='true'
    else dataArray.iscoach = 'false'
    $.ajax({
        type:'PUT',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Actualizar/Usuario/'
                + sessionStorage.getItem("id"),
        data: dataArray,
        success: function(res) {
            alert("Exito")
            sessionStorage.setItem("nombre", dataArray.nombres);
            sessionStorage.setItem("apellido", dataArray.apellidos);
        },
        error: function() {
            alert("Error en datos")
        }
    });
    alert("Cargando api")
}
function api_Reg(){
    var dataArray = Array.from(document.querySelectorAll('#sendRegist input')).reduce((acc,input) => 
        ({...acc,[input.id]: input.value}), {});
    if(dataArray.iscoach == 'on') dataArray.iscoach ='true'
    else dataArray.iscoach = 'false'
    $.ajax({
        type:'POST',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Registrar/Usuario',
        data: dataArray,
        success: function(res) {
            alert("USUARIO REGISTRADO")
        },
        error: function() {
            alert("Error en datos")
        }
    });
    alert("Cargando api")
}

function clearSession(){
    sessionStorage.setItem("id", null);
    sessionStorage.setItem("nombre", null);
    sessionStorage.setItem("apellido", null);
    sessionStorage.setItem('graph', null);
    sessionStorage.setItem('date', null);
    window.location.href="login.html"
}
$(document).ready(function(){
    //console.log(requ.date('https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a'))
})