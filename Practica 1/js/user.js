$(document).ready(function(){
    var nombre = sessionStorage.getItem('nombre') + " " + sessionStorage.getItem('apellido')
    document.getElementById('user_name').innerHTML = nombre
    if(sessionStorage.getItem('id') == null ){
        window.location.href="login.html"
    }
})

if(sessionStorage.getItem('id') == null ){
    window.location.href="login.html"
}