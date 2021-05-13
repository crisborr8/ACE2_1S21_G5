
import axios from 'axios';
import React, {useState } from 'react'
import Navbar from '../NavBar/Navegacion'
import {useHistory} from 'react-router-dom';
import '../../css/login.css';



export default function Registrar(props){

    let history = useHistory();
    let [nombre,setNombre] = useState('');
    let [usuario,setUsuario] = useState('');
    let [apellido,setApellido] = useState('');
    let [contrasena,setContrasena] = useState('');
    let [edad,setEdad] = useState(0);
    let [peso,setPeso] = useState(0.0);
    let [estatura,setEstatura] = useState(0);
    let [correo,setCorreo] = useState('');

    const envioRegistro = (evento) =>{

        evento.preventDefault();
        console.log(nombre);
        console.log(apellido);
        console.log(usuario);
        console.log(contrasena);
        console.log(edad);
        console.log(peso);
        console.log(estatura);
        console.log(correo);
        axios.post('http://104.154.169.109:3000/registro',{
            data:{
                usuario:usuario,
                contrasena:contrasena,
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                peso:peso,
                estatura:estatura,
                correo:correo
            }
        }).then(response=>{
            return response;
        }).then(response=>{
            if(response.data.status==='success'){
                console.log('usuario REgistrado')
                history.push('/Login')
            }else{
                console.log('usuario no registrado');
            }
        })

    }

    const guardarValores =(evento)=>{

        
        evento.preventDefault();
        const target =  evento.target;
        const value = target.value;
        const nombre = target.name;

        if(nombre === 'nombre') setNombre(value);
        else if(nombre==='apellido')setApellido(value);
        else if(nombre==='usuario') setUsuario(value);
        else if(nombre==='contrasena') setContrasena(value);
        else if(nombre==='edad') setEdad(value);
        else if(nombre==='correo')setCorreo(value);
        else if(nombre==='peso') setPeso(value);
        else if(nombre==='estatura') setEstatura(value);
        /*else if(nombre==='coach') {
            let valor2 = target.checked;
            console.log(valor2);
            setCoach(valor2);
        }*/
    };



    return (
        <div>
            <Navbar titulo='Registro'/>
            <div className='contenedor1'>

                <form onSubmit={envioRegistro}>

                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'text'
                                label = 'Nombre: '
                                nombre = 'nombre'
                                handler = {guardarValores}
                                value={nombre}
                            />
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'text'
                                label = 'Apellido: '
                                nombre = 'apellido'
                                handler = {guardarValores}
                                value={apellido}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'text'
                                label = 'Usuario: '
                                nombre = 'usuario'
                                handler = {guardarValores}
                                value={usuario}
                            />
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'text'
                                label = 'Contraseña: '
                                nombre = 'contrasena'
                                handler = {guardarValores}
                                value={contrasena}
                            />
                        </div>
                    </div>

                    <div className='row' >
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'number'
                                label = 'Edad: '
                                nombre = 'edad'
                                handler = {guardarValores}
                                value={edad}
                            />   
                        </div>
                        <div className='col-lg-6 col-md-6 col-xs-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'number'
                                label = 'Peso: '
                                nombre = 'peso'
                                handler = {guardarValores}
                                value={peso}
                            />   
                        </div>
                    </div>

                    
                    <div className='row' >
                        <div className='col-lg-6 col-md-6 col-sm-12'>

                            <Inputs 
                                clase='cssInputs' 
                                type = 'number'
                                label = 'Estatura: '
                                nombre = 'estatura'
                                handler = {guardarValores}
                                value={estatura}
                            />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <Inputs 
                                clase='cssInputs' 
                                type = 'email'
                                label = 'Correo: '
                                nombre = 'correo'
                                handler = {guardarValores}
                                value={correo}
                            />
                        </div>
                    </div>

                    {/*}
                    <div className='row'>
                        <div className='col-lg-2 col-md-2 col-sm-4 col-xs-3 check'>
                            <InputsCheck 
                                clase='cssCheck' 
                                type = 'checkbox'
                                label = 'Es coach: '
                                nombre = 'coach'
                                handler = {()=>setCoach(!coach)}
                                value={coach}
                            />

                        </div>
                    </div>*/}
 
                    <input type='submit' className='btn' value='Registrar'/>

                </form>

            </div>
        </div>
    );
}


const Inputs = props=>{
    return (<div className='form-group'>
            <label> {props.label}</label>
            <input 
                
                className={props.clase}
                type={props.type}
                name={props.nombre}
                onChange={props.handler}
                // value={props.value}
                placeholder={props.placeholder}
                autoComplete= 'off'               
            />    
            
        </div>
    )
}   

const InputsCheck = props=>{
    return (<div className='form-group'>
            <label> {props.label}</label>
            <input 
                className={props.clase}
                type={props.type}
                name={props.nombre}
                onChange={props.handler}
                checked={props.valor}     
            />    
            
        </div>
    )
}   