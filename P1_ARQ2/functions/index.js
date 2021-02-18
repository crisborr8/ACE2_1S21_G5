const cors = require('cors');
const functions = require("firebase-functions");

const admin =require('firebase-admin')
const  express = require('express')
const app = express()

app.use(cors({origin:true}));


admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

  const db =admin.firestore();

//------------------------------------------------------------------------------------>POST

//Registro de usuario
app.post('/Registrar/Usuario',async(req,res)=>{
    await db.collection('Usuario').doc()
    .create({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: "",
        sexo: "",
        peso: "",
        estatura: "",
        correo: req.body.correo,
        pass: req.body.pass,
        iscoach: "false"

    })
    return res.status(204).json();
});

// Coach_usuario

app.post('/Asociar/coach/usuario',async(req,res)=>{
    await db.collection('Usuario').doc(req.body.id_coach).collection("Atletas").doc("/"+req.body.id_user+"/").create({
        id_user: req.body.id_user
     })
    return res.status(204).json();
   
});

//Añadir Mediciones
app.post('/AddMed/Usuario',async(req,res)=>{
    var timestamp = new Date();
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    
   await db.collection('Usuario').doc(req.body.Id_User).collection("SignosVitales").doc().create({
       Temperatura: req.body.Temperatura,
       Ritmo_Cardiaco: req.body.Ritmo_Cardiaco,
       OxigenoES: req.body.OxigenoES,
       TiempoM: timestamp,
       Fecha: ObtenerFecha(timestamp),
       Hora: ObtenerHora(timestamp-1000*60*60*6)
    })
   return res.status(204).json();
});

//------------------------------------------------------------------------------------>UPDATE
app.put('/Actualizar/Usuario/:id_usu',async(req,res)=>{
    try{
        const documento = db.collection("Usuario").doc(req.params.id_usu);
        await documento.update({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            sexo: req.body.sexo,
            peso: req.body.peso,
            estatura: req.body.estatura,
            correo: req.body.correo,
            pass: req.body.pass,
            iscoach: req.body.iscoach
        });
        return res.status(200).json();
    }catch(error){
        return res.status(500).json();
    }
    
});
//------------------------------------------------------------------------------------>DELETE
app.delete("/delete/asociar/:id_coach/:id_atleta",async(req,res)=>{
    try{
        const document = db.collection("Usuario").doc(req.params.id_coach).collection("Atletas").doc(req.params.id_atleta);
        await document.delete();
        return res.status(200).json();
    }catch(error){
        return res.status(500).json();
    }
});
//------------------------------------------------------------------------------------>GET

//Login
app.get("/login/Usuario/:correo/:pass",async(req,res)=>{

    try{
        const UserCol= db.collection("Usuario");
        const snapshot= await UserCol.where('correo',"==",req.params.correo).where('pass',"==",req.params.pass).get();

        if(snapshot.empty){
            return res.status(400).json();
        }else{
            const response = snapshot.docs.map((doc)=>({
                Id_User:doc.id,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                iscoach: doc.data().iscoach
               
            }));
            return res.status(200).json(response[0]);
        }

        
     }catch(error){
        return res.status(500).send(error);
     }

});

//Perfil
app.get("/profile/Usuario/:id_usu",async(req,res)=>{

    try{
        const UserCol= db.collection("Usuario");
        const snapshot= await UserCol.doc(req.params.id_usu).get();
        
            const response = { 
                nombres: snapshot.data().nombres,
                apellidos: snapshot.data().apellidos,
                edad: snapshot.data().edad,
                sexo: snapshot.data().sexo,
                peso: snapshot.data().peso,
                estatura: snapshot.data().estatura,
                correo: snapshot.data().correo,
                iscoach: snapshot.data().iscoach
            }

            return res.status(200).json(response);

        
     }catch(error){
        return res.status(500).send(error);
     }

});



//===============================================================================OBTENIENDO DATOS DE MEDICIONES

//Obtener mediciones de oxigeno
app.get("/Mediciones/Oxigeno/Usuario/:id_usu",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM","desc").get();
        const response = snapshot.docs.map((doc)=>({
            
            OxigenoES: doc.data().OxigenoES,
            Hora: QuitarEspacio(doc.data().Hora)
            
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

app.get("/Mediciones/OxigenoF/Usuario/:id_usu/:fecha",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",req.params.fecha).get();
        const response = snapshot.docs.map((doc)=>({
            
            OxigenoES: doc.data().OxigenoES,
            Hora: QuitarEspacio(doc.data().Hora)
            
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

//Obtener mediciones de ritmo cardiaco
app.get("/Mediciones/RitmoC/Usuario/:id_usu",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM","desc").get();
        const response = snapshot.docs.map((doc)=>({
            Ritmo_Cardiaco: doc.data().Ritmo_Cardiaco,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

app.get("/Mediciones/RitmoCF/Usuario/:id_usu/:fecha",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",req.params.fecha).get();
        const response = snapshot.docs.map((doc)=>({
            Ritmo_Cardiaco: doc.data().Ritmo_Cardiaco,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

//obtener mediciones de temperatura
app.get("/Mediciones/Temperatura/Usuario/:id_usu",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM","desc").get();

        const response = snapshot.docs.map((doc)=>({
            Temperatura: doc.data().Temperatura,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

app.get("/Mediciones/Temperatura/Usuario/:id_usu/:fecha",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",req.params.fecha).get();

        const response = snapshot.docs.map((doc)=>({
            Temperatura: doc.data().Temperatura,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

//===============================================================================
//Todos los usuarios a cargo del coach logueado 
app.get('/coach/atletas/:id_usu',async(req,res)=>{
    try{
        const CoachLog= db.collection('Usuario');
        const snapshot= await CoachLog.doc(req.params.id_usu).collection("Atletas").get();
        const response = snapshot.docs.map((doc)=>({
            id_user: doc.data().id_user
        }));
        return res.status(200).json(response);
    }catch(error){}
});

//Obtener todos los usuarios con sus id
app.get("/Usuarios/Usuario",async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.get();
        const response = snapshot.docs.map((doc)=>({
            id_usu: doc.id,
            nombres: doc.data().nombres
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});



//obtener tiempos de mediciones de forma descendente (de la fecha mas actual -> a la fecha mas antigua)
app.get('/Mediciones/Fecha/Usuario/:id_usu',async(req,res)=>{
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM","desc").get();

        const response = snapshot.docs.map((doc)=>({
           
            Fecha: doc.data().Fecha
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

//Obtener valores en tiempo real
app.get("/Mediciones/Actual/Oxigeno/Usuario/:id_usu",async(req,res)=>{
    let timestamp = Date.now();
    let Fecha = ObtenerFecha(timestamp);
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",Fecha).limit(20).get();
        const response = snapshot.docs.map((doc)=>({
            
            OxigenoES: doc.data().OxigenoES,
            Hora: QuitarEspacio(doc.data().Hora)
            
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

app.get("/Mediciones/Actual/RitmoC/Usuario/:id_usu",async(req,res)=>{
    let timestamp = Date.now();
    let Fecha = ObtenerFecha(timestamp);
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",Fecha).limit(20).get();
        const response = snapshot.docs.map((doc)=>({
            Ritmo_Cardiaco: doc.data().Ritmo_Cardiaco,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});


app.get("/Mediciones/Actual/Temperatura/Usuario/:id_usu",async(req,res)=>{
    let timestamp = Date.now();
    let Fecha = ObtenerFecha(timestamp);
    try{
        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").where("Fecha","==",Fecha).limit(20).get();

        const response = snapshot.docs.map((doc)=>({
            Temperatura: doc.data().Temperatura,
            Hora: QuitarEspacio(doc.data().Hora)
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});

//datos añadidos 



app.get("/Mediciones/OxigenoFHoy/Usuario/:id_usu",async(req,res)=>{
    try{
        var timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds());

        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM",'desc').limit(1).get();

        const Condicion = snapshot.docs.map((doc)=>({
            
            Fecha: doc.data().Fecha,
            Hora:doc.data().Hora

        }));

        const response = snapshot.docs.map((doc)=>({
            
            OxigenoES: doc.data().OxigenoES

        }));
        var FechAc= ObtenerFecha(timestamp);
        var HoraA= ObtenerHora(timestamp-1000*60*60*6);
        if((FechAc==Condicion[0].Fecha)&&(HoraA==Condicion[0].Hora)){
                
            return res.status(200).json(response);
        }
            

    }catch(e){
    }
    return res.status(200).json([{OxigenoES:"0"}]);
});

app.get("/Mediciones/RitmoCFHoy/Usuario/:id_usu",async(req,res)=>{
    try{
        var timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds());

        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM",'desc').limit(1).get();

        const Condicion = snapshot.docs.map((doc)=>({
            
            Fecha: doc.data().Fecha,
            Hora:doc.data().Hora

        }));

        const response = snapshot.docs.map((doc)=>({
            
            Ritmo_Cardiaco: doc.data().Ritmo_Cardiaco

        }));
        var FechAc= ObtenerFecha(timestamp);
        var HoraA= ObtenerHora(timestamp-1000*60*60*6);
        if((FechAc==Condicion[0].Fecha)&&(HoraA==Condicion[0].Hora)){
                
            return res.status(200).json(response);
        }
            

    }catch(e){
    }
    return res.status(200).json([{OxigenoES:"0"}]);
});

app.get("/Mediciones/TemperaturaFHoy/Usuario/:id_usu",async(req,res)=>{
    try{
        var timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds());

        const UserCol= db.collection("Usuario");
        const snapshot = await UserCol.doc(req.params.id_usu).collection("SignosVitales").orderBy("TiempoM",'desc').limit(1).get();

        const Condicion = snapshot.docs.map((doc)=>({
            
            Fecha: doc.data().Fecha,
            Hora:doc.data().Hora

        }));

        const response = snapshot.docs.map((doc)=>({
            
            Temperatura: doc.data().Temperatura

        }));
        var FechAc= ObtenerFecha(timestamp);
        var HoraA= ObtenerHora(timestamp-1000*60*60*6);
        if((FechAc==Condicion[0].Fecha)&&(HoraA==Condicion[0].Hora)){
                
            return res.status(200).json(response);
        }
            

    }catch(e){
    }
    return res.status(200).json([{OxigenoES:"0"}]);
});
//==================================================================== Funciones
function DateTime(timestamp) {
	const date = new Date(timestamp).toLocaleString('en-GB');
	return date;
}

function ObtenerFecha(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const FechaA = Separar[0];
    const desglose= FechaA.split("/",3);
    const Fin= desglose[0]+"-"+desglose[1]+"-"+desglose[2];
    return Fin;
}

function ObtenerHora(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return Hora;
}

function QuitarEspacio(cadena){
    const Separar = cadena.split(" ",2);
    const dat = Separar[1];
    return dat;
}

exports.app =functions.https.onRequest(app);