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
                <h1 id="TextoV">Quienes Somos</h1>
                <h3 id="TextoV">Somos un grupo con interés en los deportes y una preocupación genuina en el rendimiento de los atletas <br/><br/><br/><br/><br/><br/><br/></h3>
                <h1 id="TextoV">Vision</h1>
                <h3 id="TextoV">Ser la empresa preferida por los atletas de boxeo principiantes y profesionales. <br/><br/></h3>
                <h1 id="TextoV">Mision</h1>
                <h3 id="TextoV">Dar asesoramiento y seguimiento al rendimiento del boxeador evitando sobreexigirse.<br/><br/></h3>
                <a id="op" href="/Login"><button type="button" id="btnLog" className="btn btn-dark">Iniciar Sesion</button></a>
            </div>
        )
    }
}