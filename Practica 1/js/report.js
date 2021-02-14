$(document).ready(function(){
    document.getElementById('prueba').innerHTML = sessionStorage.getItem('date')
})

if(sessionStorage.getItem('date') == null ){
    clearSession();
}