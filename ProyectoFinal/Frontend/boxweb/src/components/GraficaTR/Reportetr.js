import React, { Component } from 'react'
import Navegacion from '../NavBar/Navegacion'
import Grafica from './Grafica'
import Tabla from './Tabla'


export default class Reportetr extends Component {
    render() {
        return (
            <div>
                <Navegacion/>
                <div className="container">
                    
                    <div className="card">
                        GRAFICA
                       <Grafica/>
                    </div>
                    <div className="card">
                        bitacora
                        <Tabla/>
                    </div>
                </div>
            </div>
        )
    }
}