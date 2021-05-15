import React, { Component } from 'react'
import Navegacion from '../NavBar/Navegacion'


export default class Principal extends Component {
    constructor() {
		super();
        
      
       
		
	}


    render() {
        return (
            <div id="Fondo2">
                <Navegacion/>
                <h1 id="TextoV1">BOX-PUNCH</h1>
                <h1 id="TextoV">Vision</h1>
                <p id="TextoV"> </p>
                <h1 id="TextoV">Mision</h1>
                <a id="op" href="/Login"><button type="button" id="btnLog" className="btn btn-dark">Iniciar Sesion</button></a>
            </div>
        )
    }
}