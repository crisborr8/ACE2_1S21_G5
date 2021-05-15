import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navegacion from "../NavBar/Navegacion";
import axios from 'axios';
import swal from 'sweetalert'


var Editar=false;
var temporal={
    id:'',
    nombre:'',
    apellido:'',
    usuario:'',
    edad:'',
    peso:'',
    estatura:'',
    correo:''
};
   
export default class PerfilInicio extends Component {

    constructor() {
		super();
		this.state={
			editar:false,
            usuario:{
                id:'',
                nombre:'',
                apellido:'',
                usuario:'',
                edad:'',
                peso:'',
                estatura:'',
                correo:'',
                contrasena:''
            },
            
		}

        localStorage.removeItem('sesion');
        
        this.llenar = this.llenar.bind(this);
        this.Bienvenida=this.Bienvenida.bind(this);
         this.ActivarEditar = this.ActivarEditar.bind(this);
         this.CancelarEditar = this.CancelarEditar.bind(this);
         this.IniciarS= this.IniciarS.bind(this);
         this.handleChange=this.handleChange.bind(this);
         this.MensajeInicioSesionUser=this.MensajeInicioSesionUser.bind(this);
        this.MensajeInicioSesion=this.MensajeInicioSesion.bind(this);
         this.llenar();
        // this.Bienvenida();
		
	}

async llenar(){
    
     if( await localStorage.getItem('Logueado')===null){
      
     }else{
       let Tas= await localStorage.getItem('Logueado');
       //alert(Tas);
       const tem=await this.setState({usuario:JSON.parse(Tas||'{}')});
    
     }
    
   // await this.setState(tempo);
       
}
ActivarEditar(){
   this.setState({
       editar:true,
   });
     
 }
 CancelarEditar(){
   this.setState({
       editar:false,
   });
     
 }

 async Bienvenida(){
    await swal({
       
        title:"Bienvenido al sistema",
        text:"Puedes iniciar tu entrenamiento o ver tu historial",
        
        timer:"3000"
        
       });
 }

 async MensajeInicioSesion(){
    await swal({
        customClass: {
            confirmButton: 'swalBtnColor'
          },
        title:"Inicie Un Entrenamiento",
        text:"Para poder ver las estadisticas en tiempo real necesita iniciar una nueva sesion de entrenamiento",
        icon:"warning",
        timer:"2000",
        type:"warning"
        
       });
       this.props.history.push('/PerfilI');
}

async MensajeInicioSesionUser(){
   await swal({
        customClass: {
            confirmButton: 'swalBtnColor'
          },
        title:"Inicie sesion",
        text:"Ingrese su usuario y contraseña en partado de login",
        icon:"warning",
        timer:"2000",
        type:"warning"
        
       });

       this.props.history.push('/Login');
}



 async IniciarS(e){
    //aqui hago las peticiones 
    e.preventDefault(); 
    await axios.post('https://104.154.169.109:3000/CrearSesion',{data:{idUser: Number(this.state.usuario.id)}})
            .then(async response => {
                if (response.data.status === "success") {
                    
                    await localStorage.setItem('sesion', JSON.stringify({id:response.data.data.idSesion}));
                    
                } else {
                   alert('No se pudo crear iniciar la sesion');
                }
            });

   
    await this.props.history.push('/Perfil');
 }


 async Actualizar(e){
    //aqui hago las peticiones 
   //console.log('this.state.usuario');
     
    //this.CancelarEditar().bind(this);
    e.preventDefault(); 
    await localStorage.setItem('Logueado', JSON.stringify(temporal));
    await axios.post('https://104.154.169.109:3000/EditarDatos',{data:temporal})
            .then(async response => {
                if (response.data.status === "success") {
                    
                } else {
                    swal({
                        title:"No se pudo realizar la actualizacion",
                        text:"Ocurrio un problema intentelo de nuevo",
                        icon:"error",
                        timer:"2000"
                       });
                }
            });
       swal({
        customClass: {
            confirmButton: 'swalBtnColor'
          },
        title:"Proceso Exitoso",
        text:"Actualizado  con exito",
        icon:"success",
        timer:"2000",
        type:"success"
        
       });
       /*.then(res=>{
           if(res){
               swal({text:"Archivo actualizado con exito",icon:"succes",timer:"1000"});
           }
       })*/ 
      
   
 }


 handleChange (e) {
     
    temporal.id=this.state.usuario.id;
    temporal.nombre=this.state.usuario.nombre;
    temporal.apellido=this.state.usuario.apellido;
    temporal.usuario=this.state.usuario.usuario;
    temporal.edad=this.state.usuario.edad;
    temporal.peso=this.state.usuario.peso;
    temporal.estatura=this.state.usuario.estatura;
    temporal.correo=this.state.usuario.correo;
    temporal.contrasena=this.state.usuario.contrasena;

    const name = e.target.name;
    const value = e.target.value;
    
    if(name==='nombre'){
        temporal.nombre=value;

    }else 
    if(name==='apellido'){
        temporal.apellido=value;
    }else 
    if(name==='usuario'){
        temporal.usuario=value;
    }else 
    if(name==='edad'){
        temporal.edad=value;
    }else 
    if(name==='peso'){
        temporal.peso=value;
    }else 
    if(name==='estatura'){
        temporal.estatura=value;
    }else 
    if(name==='correo'){
        temporal.correo=value;
    }
    
    console.log(temporal);
    
    
    this.setState({
        usuario:temporal
    })
  };

  render() {
    return (
      <div id="perfilI">
        <Navegacion />

        {(()=>{
                        if(localStorage.getItem('Logueado')===null){
                            this.MensajeInicioSesionUser();
                        }else{
                            return <div className="container">
        
         
                            <div id="bot3" className="card">
                                   <h1>PERFIL</h1>
                                   
                                   <div className="row">
                                      <div className="col-sm">
                                           <button id="btnInit1" type="button" onClick={this.ActivarEditar} className="btn btn-dark">Editar</button>
                                      </div>
                                      {(()=>{
                                          if(this.state.editar){
                                                  return <div  className="col-sm" >
                                                              <button id="btnInit2"  onClick={this.Actualizar} type="button" className="btn btn-dark">Gruardar</button>
                                                              <button id="btnInit2" onClick={this.CancelarEditar} type="button" className="btn btn-dark">Cancelar</button>
                                                       </div> 
                                                                        
                                                               
                                          }
                                          
                                      })()}
      
                                   </div>       
                                   <div id="contbtn" className="card">
                                          <div id="datos" className="card">
                                             <div id="user" className="card"><h4>{this.state.usuario.usuario}</h4></div>
                                                <form >
                                                      <div className="form-group row">
                                                          <label className="col-sm-2 col-form-label"><b>Nombre: </b></label>
                                                          <div className="col-sm-10">
                                                          {(()=>{
                                                              if(this.state.editar){
                                                                  return <input type="text"  className="form-control" id="nombre" name="nombre" text={ String(this.state.usuario.nombre)} onChange={this.handleChange}/>
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="nombre" value={ String(this.state.usuario.nombre)} disabled/>
                                                              }
                                                                  
                                                          })()}
      
                                                          
                                                          </div>
                                                      </div>
      
                                                      <div className="form-group row">
                                                          <label  className="col-sm-2 col-form-label"><b>Apellido:</b></label>
                                                          <div className="col-sm-10">
                                                          {(()=>{
                                                              if(this.state.editar){
                                                                  return <input type="text"  className="form-control" id="apellido" name="apellido"  text={ String(this.state.usuario.apellido)} onChange={this.handleChange} />
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="apellido" value={ String(this.state.usuario.apellido)} disabled />
                                                              }
                                                                  
                                                          })()}
                                                          
                                                          </div>
                                                      </div>
      
                                                      <div className="form-group row">
                                                          <label  className="col-sm-2 col-form-label"><b>Edad:</b></label>
                                                          <div className="col-sm-10">
                                                          {(()=>{
                                                              if(this.state.editar){
                                                                  return <input type="text"  className="form-control" id="edad" name="edad" text={ String(this.state.usuario.edad)} onChange={this.handleChange} />
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="edad" value={ String(this.state.usuario.edad)} disabled />
                                                              }
                                                          })()}
                                                          
                                                          </div>
                                                      </div>
      
                                                      <div className="form-group row">
                                                          <label  className="col-sm-2 col-form-label"><b>Peso:</b></label>
                                                          <div className="col-sm-10">
                                                          {(()=>{
                                                              if(this.state.editar){
                                                                  return <input type="text"  className="form-control" id="peso" name="peso" text={ String(this.state.usuario.peso)} onChange={this.handleChange} />
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="peso" value={ String(this.state.usuario.peso)} disabled />
                                                              }
                                                          })()}
                                                          
                                                          </div>
                                                      </div>
      
                                                      <div className="form-group row">
                                                          <label  className="col-sm-2 col-form-label"><b>Estatura:</b></label>
                                                          <div className="col-sm-10">
                                                           {(()=>{
                                                              if(this.state.editar){
                                                                  return <input type="text"  className="form-control" id="estatura" name="estatura" text={ String(this.state.usuario.estatura)} onChange={this.handleChange} />
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="estatura" value={ String(this.state.usuario.estatura)} disabled />
                                                              }
                                                          })()}
                                                          
                                                          </div>
                                                      </div>
                                                      <div className="form-group row">
                                                          <label  className="col-sm-2 col-form-label"><b>Correo:</b></label>
                                                          <div className="col-sm-10">
                                                          {(()=>{
                                                              if(this.state.editar){
                                                                 return  <input type="text"  className="form-control" id="correo" name="correo" text={ String(this.state.usuario.correo)} onChange={this.handleChange} />
                                                              }else{
                                                                  return <input type="text"  className="form-control" id="correo" value={ String(this.state.usuario.correo)} disabled />
                                                              }
                                                          })()}
                                                          
                                                          </div>
                                                      </div>
      
      
                                                      
                                              </form>
                                              
                                              
          
                                              
                                          </div>
                                          <div id="contbtn" className="card">
                                              <a className="op" href="/Perfil">
                                                  <button id="btnInit" type="button" className="btn btn-success" onClick={this.IniciarS}>Iniciar un Nuevo Entrenamiento</button>
                                              </a>
                                               <a className="op" href="/Historial">
                                                    <button id="btnInit" type="button" className="btn btn-warning">Ver Historial</button>
                                              </a>
      
                                          </div>
                                   </div>
                
                            </div>
      
                      </div>
                        }

                    })()}
                
      </div>
    );
  }
}
