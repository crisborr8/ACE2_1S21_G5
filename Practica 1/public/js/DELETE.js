// /delete/asociar/:id_coach/:id_atleta

function detachAtleta(id){
    alert(id)
    $.ajax({
        type:'DELETE',
        url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/delete/asociar/'
            + sessionStorage.getItem("id") + "/" + id,
        success: function(res) {
            console.log(res);
            alert("USUARIO DESASOCIADO")
            window.location.href="atletas.html";
        },
        error: function() {
            alert("Error en datos")
            window.location.href="atletas.html";
        }
    });
}