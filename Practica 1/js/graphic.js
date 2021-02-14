$(document).ready(function(){
    document.getElementById('prueba').innerHTML = sessionStorage.getItem('graph')
})

if(sessionStorage.getItem('graph') == null ){
    clearSession();
}