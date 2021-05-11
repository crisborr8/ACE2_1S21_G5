
import axios from 'axios';
import React, { Component } from 'react'
import Navbar from '../NavBar/Navegacion'
import './loginCss/login.css';


const esti = {
    centrarTexto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    centrarContenido: {
        textAlign: 'center',
    },
    colorBloque:{
        backgroundColor: '#EBAC44'
    },
    bloque: {
        textAlign: 'right',
        display: 'block',
    },
    contenedor:{
        maxWidth:'400px',
        minWidth:'300px',
        minHeight:'400px',
        maxHeight:'700px',
        width:'45%',
        height:'50%',
        margin:'100px auto',
        background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%,     rgba(253,187,45,1) 100%)',
        padding:'20px',
        borderRadius:'25px'
    },
    formGroup:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2rem',
        maxWidth: '100%'        
    }

}


export default class Login extends Component {

    constructor(props){        
        super(props);
        //definiendo los estados 
        this.state = {
            usuario : '',
            contrasena:'',
            editable:false,
            classes: esti
        }
        this.controladorEvento = this.controladorEvento.bind(this);
        this.envio = this.envio.bind(this)
        this.editar= this.editar.bind(this)

    }

    
    controladorEvento=(evento)=>{

        // el target es el objeto de quien proviene el evento
        const target = evento.target;

        // se maneja target.value porque todos los inputs son tipo texto, si hubiese un checkbox se maneja diferente
        const value = target.value;

        /*
        if(target.name ==='usuario'){
        }
        else if(target.name ==='contrasena'){
        }*/

        const nombre =  target.name;
        this.setState({
            [nombre] : value
        });
        evento.preventDefault();
    }


    envio = async(e) =>{
        console.log(this.state.usuario,this.state.contrasena);
        this.props.history.push('/Registrar')
        
        e.preventDefault();
    }

    iniciarSesion = async(e)=>{
        await axios.post('',{
            usuario:this.state.usuario,
            contrasena:this.state.contrasena
        })
        .then(response=>{
            if(response.status==='success'){
                if(response.data.existe == true){
                    const datos = [];
                    datos = response.data;

                    localStorage.setItem('id',datos.idUser);
                    localStorage.setItem('nombre',datos.nombre);
                    localStorage.setItem('apellido',datos.apellido);
                    localStorage.setItem('usuario',datos.usuario);
                    localStorage.setItem('edad',datos.edad);
                    localStorage.setItem('peso',datos.peso);
                    localStorage.setItem('estatura',datos.estatura);
                    localStorage.setItem('correo',datos.correo);

                }
            }
        })

        this.state.history.push('/Registrar')
        e.preventDefault();
    }

    editar=(evento)=>{
        if(this.state.editable==true){
            this.setState({editable:false})
        }
        else{
            this.setState({editable:true})     
        }
        console.log(this.state.editable);
        evento.preventDefault();
    }

    nexPath(rua){
        this.props.history.push(rua)
        
    }

    render() {
        return (            
            <div className='contenedor'>
                <Navbar/>

                <button onClick={()=>this.nexPath('/Registrar')}>prueba1</button>
                <button onClick={()=>this.props.history.push('/Registrar')}>prueba2</button>

                <div style={this.state.classes.contenedor}>
                    

                    <form  onSubmit={this.envio}>

                        <SubInput   

                                    editar={this.state.editable}
                                    value={this.state.usuario} label='Usuario:'                                     
                                    clase='cssInputs' 
                                    nombre='usuario' 
                                    placeholder='Ingrese su Usuario' 
                                    type='text' 
                                    handler={this.controladorEvento}/>
                
                        <SubInput   
                                    editar={this.state.editable}
                                    value={this.state.contrasena} 
                                    label='Contraseña:' 
                                    clase='cssInputs' 
                                    nombre='contrasena' 
                                    placeholder='Ingrese su contraseña' 
                                    type='password' 
                                    handler={this.controladorEvento}/>

                        <input                
                        type='submit'  
                        value='Iniciar Sesion'  
                        className='btn btn-success' style={{padding:'10px'}}/>

                        <div className='centrar'>
                            <p>
                                No registrado? <a href="/registrar">Registrar</a>
                            </p>
                        </div>
                    </form>
                    {
                        /**<button value='editar?' onClick={this.editar.bind(this)} >Editar?</button> */
                    }

                </div>

            </div>
        )
    }
}

const SubInput = props  =>(

    <div className='form-group'>
        <label> {props.label}</label>
        <input 
        disabled={props.editar}
        className={props.clase}
        name = {props.nombre}
        placeholder = {props.placeholder}
        type = {props.type}
        onChange={props.handler}          
        autoComplete='off'
        />
    </div>

);
