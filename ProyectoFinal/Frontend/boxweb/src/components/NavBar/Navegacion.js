import React,{Component} from 'react';
import Fecha from '../Reloj/Fecha';
import Reloj from '../Reloj/Reloj';



class Navegacion extends Component{

 constructor(props) {
		super(props);
		this.state={
			usuario:{
                id:'5000',
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

handleClick1() {
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
              <div className="row">

                <div className="col-sm">
                <a className="op" href="/PerfilI"><button type="button" className="btn btn-dark">Perfil</button></a>
                
                </div>
                <div className="col-sm">
                <a className="op" href="/Perfil"><button type="button" className="btn btn-dark">Principal</button></a>
              
                </div>
                <div className="col-sm">
                <a className="op" href="/Historial"><button type="button" className="btn btn-dark">Historial</button></a>
                
                </div>

                <div className="col-sm">
                       <div className="btn-group">
                             <button type="button" className="btn btn-secondary dropdown-toggle bg-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Mediciones-TR
                             </button>
                             <div className="dropdown-menu dropdown-menu-right">
                             <button className="dropdown-item" type="button" onClick={(()=>this.handleClick1)()} >Oxigeno</button>
                             <a className="op" href="#" onClick={()=>this.handleClick}><button className="dropdown-item" type="button" >Temperatura</button></a>
                             <a className="op" href="#" onClick={()=>this.handleClick2}><button className="dropdown-item" type="button" >Ritmo Cardiaco</button></a>
                             <a className="op" href="#" onClick={()=>this.handleClick3}><button className="dropdown-item" type="button" >Fuerza</button></a>
                               
                             </div>
                        </div>
                </div>

                <div className="col-sm">
                <button type="button" onClick={this.handleClick3} className="btn btn-dark">Cerrar Sesion</button>
                  
                  </div>

              </div>
            </div>


          </div>
        </div>










        </nav>
      </div>





        );
    }
}

export default Navegacion;