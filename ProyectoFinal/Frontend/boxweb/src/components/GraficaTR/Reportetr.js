import React, { Component } from 'react'
import Navegacion from '../NavBar/Navegacion'
import Grafica from './Grafica'
import swal from 'sweetalert'

export default class Reportetr extends Component {
    constructor() {
		super();
        
        this.MensajeInicioSesion = this.MensajeInicioSesion.bind(this);
       
		
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
    render() {
        return (
            <div>
                <Navegacion/>
                <div className="container">

                    {(()=>{
                        if(localStorage.getItem('Logueado')===null){
                            this.MensajeInicioSesionUser();
                        }else{
                            if(localStorage.getItem('sesion')===null){
                                this.MensajeInicioSesion();
                            }else{
                                return <div id="BaseRepo" className="card">
                                             <h1>REPORTE EN TIEMPO REAL</h1>
                                                      <Grafica/>
                                        </div>
                            }
                        }

                    })()}
                    
                    

                    
                   
                </div>
            </div>
        )
    }
}