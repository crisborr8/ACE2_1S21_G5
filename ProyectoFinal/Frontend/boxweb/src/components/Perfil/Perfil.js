import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navegacion from "../NavBar/Navegacion";
import Grafica from "../GraficaTR/Grafica";

export default class Perfil extends Component {
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

                                      
                                  
                                  this.llenar = this.llenar.bind(this);
                                  this.handleClick= this.handleClick.bind(this);
                                  this.handleClick1= this.handleClick1.bind(this);
                                  this.handleClick2= this.handleClick2.bind(this);
                                  this.handleClick3= this.handleClick3.bind(this);
                                  this.llenar();
                              
                            }
  async llenar(){
    
     if( await localStorage.getItem('Logueado')===null){
      
     }else{
       let Tas= await localStorage.getItem('Logueado');
     
       const tem=await this.setState({usuario:JSON.parse(Tas||'{}')});
    
     }

     await localStorage.removeItem('medicion')
    
       
}

handleClick(e) {
    e.preventDefault();
    localStorage.setItem('medicion', JSON.stringify({tipo:'Temperatura', unidad:' °C'}));
    this.props.history.push('/ReporteTR');
    
    
  }

  handleClick1(e) {
    e.preventDefault();
    
    localStorage.setItem('medicion', JSON.stringify({tipo:'Oxigeno', unidad:' O2'}));
    this.props.history.push('/ReporteTR');
    
  }

  handleClick2(e) {
    e.preventDefault();
    localStorage.setItem('medicion', JSON.stringify({tipo:'Ritmo Cardiaco', unidad:' BPM'}));
    this.props.history.push('/ReporteTR');
    
  }

  handleClick3(e) {
    e.preventDefault(); 
  // localStorage.setItem('medicion', JSON.stringify({tipo:'Velocidad', unidad:' u/s'}));
    localStorage.setItem('medicion', JSON.stringify({tipo:'Fuerza', unidad:' N'}));
    this.props.history.push('/ReporteTR');
    
  }

  render() {
    return (
      <div id="perfil">
        <Navegacion />
        <div className="container">
        
         
          <div id="bot3" className="card">
              <h1>DATOS PERSONALES</h1>
            <h4>Usuario: {this.state.usuario.usuario}</h4>
            <h4>Edad: {this.state.usuario.edad}</h4>
            <a   href="/PerfilI"><button id="Detener" type="button"  className="btn btn-danger" >Detener Rutina</button></a>
          
          </div>
          
         
          <div id="BasePerfil" className="card">
            <div id="con2" className="container">
              <div id="Fila" className="row">

                <div id="Columna" className="col-sm">
                  <div id="bot" className="card">
                    <h1>Ritmo Cardiaco</h1>
                    <a className="op" href="#" onClick={this.handleClick2}>
                      <button className="botones1"></button>
                    </a>
                  </div>
                </div>

                <div id="Columna" className="col-sm">
                  <div id="bot1" className="card">
                  <h1>Oxigeno</h1>
                    <a className="op" href="#" onClick={this.handleClick1}>
                    
                      <button className="botones2"></button>
                    </a>
                  </div>
                </div>
              </div>

              <div id="Fila" className="row">
                <div id="Columna" className="col-sm">
                  <div id="bot" className="card">
                  <h1>Temperatura</h1>
                  <a className="op" href="#" onClick={this.handleClick}>
                    <button className="botones3"></button>
                  </a>
                  </div>
                </div>
                <div id="Columna" className="col-sm">
                  <div className="card" id="bot1">
                  <h1>Fuerza</h1>
                  <a className="op" href="#" onClick={this.handleClick3}>
                    <button className="botones4"></button>
                  </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-dark">hola</div>
        </div>
      </div>
    );
  }
}
