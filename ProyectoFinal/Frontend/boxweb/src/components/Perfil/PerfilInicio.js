import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navegacion from "../NavBar/Navegacion";
import axios from 'axios';


var Editar=false;
   
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
                correo:''
            }
		}

        localStorage.removeItem('sesion');
        
        this.llenar = this.llenar.bind(this);
         this.ActivarEditar = this.ActivarEditar.bind(this);
         this.CancelarEditar = this.CancelarEditar.bind(this);
         this.IniciarS= this.IniciarS.bind(this);
         this.llenar();
		
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


 async IniciarS(e){
    //aqui hago las peticiones 
    e.preventDefault(); 
    await axios.post('http://3.12.129.123:3000/CrearSesion',{data:{idUser: Number(this.state.usuario.id)}})
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
    e.preventDefault(); 
    await axios.post('http://3.12.129.123:3000/CrearSesion',{data:{idUser: Number(this.state.usuario.id)}})
            .then(async response => {
                if (response.data.status === "success") {
                    
                    await localStorage.setItem('sesion', JSON.stringify({id:response.data.data.idSesion}));
                    
                } else {
                   alert('No se pudo crear iniciar la sesion');
                }
            });

   
    await this.props.history.push('/Perfil');
 }

  render() {
    return (
      <div id="perfilI">
        <Navegacion />
                <div className="container">
        
         
                      <div id="bot3" className="card">
                             <h1>PERFIL</h1>
                             
                             <div className="row">
                                <div className="col-sm">
                                     <button id="btnInit1" type="button" onClick={this.ActivarEditar} className="btn btn-dark">Editar</button>
                                </div>
                                {(()=>{
                                    if(this.state.editar){
                                            return <div  className="col-sm" >
                                                        <button id="btnInit2"  type="button" className="btn btn-dark">Gruardar</button>
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
                                                            return <input type="text"  className="form-control" id="nombre" text={ String(this.state.usuario.nombre)}/>
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
                                                            return <input type="text"  className="form-control" id="apellido"  text={ String(this.state.usuario.apellido)}/>
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
                                                            return <input type="text"  className="form-control" id="edad" text={ String(this.state.usuario.edad)} />
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
                                                            return <input type="text"  className="form-control" id="peso" text={ String(this.state.usuario.peso)} />
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
                                                            return <input type="text"  className="form-control" id="estatura" text={ String(this.state.usuario.estatura)} />
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
                                                           return  <input type="text"  className="form-control" id="correo" text={ String(this.state.usuario.correo)} />
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
                                            <button id="btnInit" type="button" className="btn btn-success" onClick={this.IniciarS}>Iniciar una Nueva Sesion</button>
                                        </a>
                                         <a className="op" href="/Historial">
                                              <button id="btnInit" type="button" className="btn btn-warning">Historial</button>
                                        </a>

                                    </div>
                             </div>
          
                      </div>

                </div>
      </div>
    );
  }
}
