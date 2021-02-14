$(document).ready(function(){
    var nombre = sessionStorage.getItem('nombre') + " " + sessionStorage.getItem('apellido')
    document.getElementById('user_name').innerHTML = nombre
})

if(sessionStorage.getItem('id') == null ){
    clearSession();
}


function grafReal(tipo){
    sessionStorage.setItem('graph', tipo);
    window.location.href="grafReal.html";
}

function reports(date){
    sessionStorage.setItem('date', date);
    window.location.href="historial.html";
}