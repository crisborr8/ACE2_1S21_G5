import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navegacion from "../NavBar/Navegacion";

export default class Perfil extends Component {
 
  render() {
    return (
      <div id="perfil">
        <Navegacion />
        <div className="container">
        
         
          <div id="bot3" className="card">
              <h1>DATOS PERSONALES</h1>
            <h4>Nombre: Alejandro</h4>
            <h4>Edad: 23</h4>
          
          </div>
          
         <div className="card" id="bot2">
         <button type="button"  className="btn btn-success">Iniciar Entrenamiento</button>
         </div>
          <div id="BasePerfil" className="card">
            <div id="con2" className="container">
              <div id="Fila" className="row">

                <div id="Columna" className="col-sm">
                  <div id="bot" className="card">
                    <h1>Ritmo Cardiaco</h1>
                    <a className="op" href="/">
                      <button className="botones1"></button>
                    </a>
                  </div>
                </div>

                <div id="Columna" className="col-sm">
                  <div id="bot1" className="card">
                  <h1>Oxigeno</h1>
                    <a className="op" href="/">
                      <button className="botones2"></button>
                    </a>
                  </div>
                </div>
              </div>

              <div id="Fila" className="row">
                <div id="Columna" className="col-sm">
                  <div id="bot" className="card">
                  <h1>Temperatura</h1>
                  <a className="op" href="/">
                    <button className="botones3"></button>
                  </a>
                  </div>
                </div>
                <div id="Columna" className="col-sm">
                  <div className="card" id="bot1">
                  <h1>Fuerza</h1>
                  <a className="op" href="/">
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
