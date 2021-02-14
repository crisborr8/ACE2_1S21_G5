$.ajax({
    type:'GET',
    url: 'https://us-central1-arqui2-practica1-5598e.cloudfunctions.net/app/profile/Usuario/'
            + sessionStorage.getItem("id"),
    success: function(res) {
        console.log(res);
        document.getElementById("nombres").value = res.nombres
        document.getElementById("apellidos").value = res.apellidos
        document.getElementById("estatura").value = res.estatura
        document.getElementById("peso").value = res.peso
        document.getElementById("edad").value = res.edad
        document.getElementById("sexo").value = res.sexo
        document.getElementById("correo").value = res.correo
        $("#isCoach").prop('checked', res.iscoach);
    },
    error: function() {
        alert("Error en solicitud de datos")
        clearSession();
    }
});
