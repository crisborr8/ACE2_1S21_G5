import React, { Component } from 'react'
import Navegacion from '../NavBar/Navegacion'
import Grafica from './Grafica'


export default class Reportetr extends Component {
    render() {
        return (
            <div>
                <Navegacion/>
                <div className="container">
                    
                    <div id="BaseRepo" className="card">
                        <h1>REPORTE EN TIEMPO REAL</h1>
                       <Grafica/>
                    </div>

                    
                   
                </div>
            </div>
        )
    }
}