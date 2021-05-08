import React, { Component } from 'react'
import Navegacion from '../NavBar/Navegacion'
import Graficatem from './Graficatem'


export default class Reptem extends Component {
    render() {
        return (
            <div>
                <Navegacion/>
                <div className="container">
                    
                    <div id="BaseRepo" className="card">
                        <h1>REPORTE EN TIEMPO REAL</h1>
                       <Graficatem/>
                    </div>

                    
                   
                </div>
            </div>
        )
    }
}