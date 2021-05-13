import React,{Component} from 'react';
import Fecha from '../Reloj/Fecha';
import Reloj from '../Reloj/Reloj';


class Navegacion extends Component{

 constructor(props) {
		super(props);
		this.state={
			usuario:{
                id:'3',
                nombre:'José Alejandro',
                apellido:'Grande Marín',
                usuario:'Alejo',
                edad:'23',
                peso:'67',
                estatura:'165',
                correo:'Alejo@g.com'
            
       },
		}
         this.Setear = this.Setear.bind(this);
         this.handleClick = this.handleClick.bind(this);
         this.handleClick1 = this.handleClick1.bind(this);
         this.handleClick2 = this.handleClick2.bind(this);
         this.handleClick3 = this.handleClick3.bind(this);
        // this.CancelarEditar = this.CancelarEditar.bind(this);
		
	}

  Setear(){
   localStorage.setItem('Logueado', JSON.stringify(this.state.usuario));
   
  }

  
handleClick(e) {
  
  localStorage.setItem('medicion', JSON.stringify({tipo:'Temperatura', unidad:' °C'}));
  this.props.history.push('/ReporteTR');
  e.preventDefault();
  
}

handleClick1(e) {
  localStorage.setItem('medicion', JSON.stringify({tipo:'Oxigeno', unidad:' O2'}));
  this.props.history.push('/ReporteTR');
}

handleClick2(e) {
  
  localStorage.setItem('medicion', JSON.stringify({tipo:'Ritmo Cardiaco', unidad:' BPM'}));
  this.props.history.push('/ReporteTR');
  e.preventDefault();
}

handleClick3(e) {
 
    localStorage.setItem('medicion', JSON.stringify({tipo:'Fuerza', unidad:' N'}));
    this.props.history.push('/ReporteTR');
    e.preventDefault();
// localStorage.setItem('medicion', JSON.stringify({tipo:'Velocidad', unidad:' u/s'}));
  
  
}

    async Cerrar(){
      await localStorage.removeItem('sesion');
       this.props.history.push('/Login');
    }
render(){

    return(


        <div className="pos-f-t">

        <nav className="navbar navbar-dark bg-dark">

           <h1 className="cab">AC2-G5</h1> 
           <div id="reloj" className="card bg-dark"> 
           <Reloj></Reloj>
           <Fecha></Fecha>
           </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>



<div className="collapse navbar-collapse" id="navbarToggleExternalContent">
          <div className="bg-dark ">
            
            <div className="container">
            {(()=>{
                  if( localStorage.getItem('Logueado')===null){
                   return <div><h3 id="warring">Inicie Sesion</h3> <p id="warring">Para poder ver las vistas de nuestra aplicacion.</p> <button id="btnss" type="button" className="btn btn-dark" onClick={this.Setear}>SETEAR</button></div>

      
                  }else{
                    return <div className="row">
                

                    {(()=>{
                      if(localStorage.getItem('sesion')===null){
                        return <div className="col-sm">
                        <a className="op" href="/PerfilI"><button id="btnss" type="button" className="btn btn-dark">Perfil</button></a>
                        
                        </div>
                      }
                    })()}

                    {(()=>{
                      if( localStorage.getItem('sesion')===null){
           
                       }else{
                        return <div className="col-sm">
                            <a className="op" href="/Perfil"><button id="btnss" type="button" className="btn btn-dark">Principal</button></a>
                            
                        </div>
                       
                       }
                    })()}
                    
                    {(()=>{
                      if( localStorage.getItem('sesion')===null){
                        return <div className="col-sm">
                        <a className="op" href="/Historial"><button id="btnss" type="button" className="btn btn-dark">Historial</button></a>
                        
                        </div>
                      }
                    })()}
    
    
                    <div className="col-sm">
                   
                    <a className="op" href="/Login"><button id="btnss" type="button" className="btn btn-dark">Cerrar Sesion</button></a>
                    
                      </div>

                      
    
                  </div>
                   
                  }

                })()}
              
            </div>


          </div>
        </div>










        </nav>
      </div>





        );
    }
}

export default Navegacion;