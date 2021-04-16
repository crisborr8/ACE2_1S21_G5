const cors = require('cors');
const functions = require("firebase-functions");
const admin =require('firebase-admin');
const express= require('express');
const app=express()

app.use(cors({origin:true}));
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db =admin.firestore();
//-1000*60*60*6
app.post('/Iniciar/vo2max',async(req,res)=>{
   var tiempo= new Date();
   const Usuario= await db.collection('Aire').doc()
    .create({
        Amplitud :req.body.Amplitud,
        Hora: ObtenerHora(tiempo)
    })
     res.status(204).json();
});

app.get("/volmax",async(req,res)=>{
    try{
        const UserCol= db.collection("Aire");
        const snapshot = await UserCol.orderBy('Amplitud','desc').limit(1).get();
        const response = snapshot.docs.map((doc)=>({
            Data: doc.data().Amplitud
        }));
        return res.status(200).json(response[0]);
    }catch(error){
        return res.status(500).send(error);
    }
});
app.get("/volmin",async(req,res)=>{
    try{
        const UserCol= db.collection("Aire");
        const snapshot = await UserCol.orderBy('Amplitud','asc').limit(1).get();
        const response = snapshot.docs.map((doc)=>({
            Data: doc.data().Amplitud
        }));
        return res.status(200).json(response[0]);
    }catch(error){
        return res.status(500).send(error);
    }
});
app.get("/volprom",async(req,res)=>{
    try{
        const UserCol= db.collection("Aire");
        const snapshot = await UserCol.get();
        const response = snapshot.docs.map((doc)=>({
            Data: doc.data().Amplitud
        }));
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).send(error);
    }
});
app.get("/volhora/:hora",async(req,res)=>{
    try{
        const UserCol= db.collection("Aire");
        const snapshot = await UserCol.where('Hora','==',req.params.hora).get();
        const response = snapshot.docs.map((doc)=>({
            Data: doc.data().Amplitud
        }));

        if (response[0] != null) {
			return res.status(200).json(response[0]);
		} else {
			return res.status(500).json({Data:0});
		}

    }catch(error){
      //  return res.status(500).send(error);

    }
    

});

app.get("/volhora",async(req,res)=>{
    try{
        const UserCol= db.collection("Aire");
        const snapshot = await UserCol.orderBy('Hora','desc').limit(10).get();
        const response = snapshot.docs.map((doc)=>({
            Data: doc.data().Amplitud,
            Hora: doc.data().Hora
        }));

        if (response[0] != null) {
			return res.status(200).json(response);
		} else {
			return res.status(500).json([{Data:0},{Data:0},{Data:0},{Data:0},{Data:0},{Data:0},{Data:0},{Data:0},{Data:0},{Data:0}]);
		}

    }catch(error){
        return res.status(500).send(error);

    }
    

});

function ObtenerHora(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return Hora;
}
exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
