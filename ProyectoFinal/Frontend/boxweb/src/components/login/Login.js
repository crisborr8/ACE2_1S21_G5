
import axios from 'axios';
import React, { Component } from 'react'
import Navbar from '../NavBar/Navegacion'
import '../../css/login.css';


const esti = {
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
            UsuarioValido:true,
            editable:false,
            classes: esti
        }

        localStorage.removeItem('Logueado');
        localStorage.removeItem('id');

        this.controladorEvento = this.controladorEvento.bind(this);
        this.envio = this.envio.bind(this)
        this.editar= this.editar.bind(this)
        this.iniciarSesion = this.iniciarSesion.bind(this);
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


    envio = (e) =>{

                
        e.preventDefault();
        if(this.state.usuario=== ''){
            this.setState({UsuarioValido:false});
            
        }else{
            this.setState({UsuarioValido:true})
        }
        console.log(this.state.usuario,this.state.contrasena);
        //this.props.history.push('/Registrar')

    }

    iniciarSesion = async(e)=>{
       
        e.preventDefault();
        await axios.post('http://104.154.169.109:3000/Login',{
            data:{
                usuario:this.state.usuario,
                contrasena:this.state.contrasena
            }
        })
        .then(response=>{
            console.log(response.data);
            if(response.data.status==='success'){
                if(response.data.data.existe == true){
                    const datos = response.data.data;
                    

                    localStorage.setItem('id',datos.idUser);
                    localStorage.setItem("Logueado",JSON.stringify({
                        id:datos.idUser,
                        nombre:datos.nombre,
                        apellido:datos.apellido,
                        usuario:datos.usuario,
                        edad:datos.edad,
                        peso:datos.peso,
                        estatura:datos.estatura,
                        correo:datos.correo,
                        contrasena:this.state.contrasena
                    }));

                    this.props.history.push('/PerfilI');
                }
            }
        })

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

    nexPath(){
        this.props.history.push('/Registrar')        
    }

    render() {
        return (            
            <div className='contenedor'>
                <Navbar/>
                
                {
                    /**                
                     * <button onClick={()=>this.nexPath('/Registrar')}>prueba1</button>
                        <button onClick={()=>this.nexPath2}>prueba1</button>
                        <button onClick={()=>this.props.history.push('/Registrar')}>prueba2</button> */
                }

                <div style={this.state.classes.contenedor}>
                    

                    <form  onSubmit={this.iniciarSesion}>

                        <SubInput   
                                    valido = {this.state.UsuarioValido}
                                    editar={this.state.editable}
                                    value={this.state.usuario} 
                                    label='Usuario:'                                     
                                    clase='cssInputs' 
                                    nombre='usuario' 
                                    placeholder='Ingrese su Usuario' 
                                    type='text' 
                                    handler={this.controladorEvento}/>
                
                        <SubInput   
                                    valido = {true}
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

    <div className='form-group alexCss'>
        <label htmlFor={props.nombre}> {props.label}</label>
        <input 
        //value={props.value}
        id={props.nombre}
        disabled={props.editar}
        className={props.clase}
        name = {props.nombre}
        placeholder = {props.placeholder}
        type = {props.type}
        onChange={props.handler}          
        autoComplete='off'
        />
        {
            !props.valido? <span style={{color:'red'}} >ffff</span>: ''
        }
        <span style={{color:'red',display: `${
            props.valido? 'none':'box'
        }`}}  >ffff</span>
    </div>

);
