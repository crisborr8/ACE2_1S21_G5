
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
function api_Act(){
    var dataArray = Array.from(document.querySelectorAll('#sendActual input')).reduce((acc,input) => 
        ({...acc,[input.id]: input.value}), {});
    if(dataArray.iscoach == 'on') dataArray.iscoach ='true'
    else dataArray.iscoach = 'false'
    $.ajax({
        type:'GET',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/Actualizar/Usuario/'
                + sessionStorage.getItem("id"),
        data: dataArray,
        success: function(res) {
            alert("Exito")
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
    window.location.href="login.html"
}

$(document).ready(function(){
    $(".tab a").on("click", function (e) {
        e.preventDefault();
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        target = $(this).attr("href");
        $(".tab-content > div").not(target).hide();
        $(target).fadeIn(600);
    });
      
    $(".form").find("input, textarea").on("keyup blur focus", function (e) {
    var $this = $(this), label = $this.prev("label");
        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        }
        else if (e.type === "blur") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.removeClass("highlight");
            }
        }
        else if (e.type === "focus") {
            if ($this.val() === "") {
                label.removeClass("highlight");
            } else if ($this.val() !== "") {
                label.addClass("highlight");
            }
        }
    });
    
    $( "#sendRegist" ).submit(function( event ) {  
        alert("Envio de datos registro");
    }); 
});
