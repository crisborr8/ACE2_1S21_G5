import React,{Component} from 'react';
import Fecha from '../Reloj/Fecha';
import Reloj from '../Reloj/Reloj';



class Navegacion extends Component{

  Mover(){
    alert('Hola');
  }
    
render(){

    return(


        <div className="pos-f-t">



<div className="collapse navbar-collapse" id="navbarToggleExternalContent">
          <div className="bg-dark ">
            
            <div className="container">
              <div className="row">

                <div className="col-sm">
                <a className="op" href="/Perfil"><button type="button" className="btn btn-dark">Perfil</button></a>
                
                </div>
                <div className="col-sm">
                <a className="op" href="/ReporteTR"><button type="button" className="btn btn-dark">Principal</button></a>
              
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
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Oxigeno</button></a>
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Temperatura</button></a>
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Ritmo Cardiaco</button></a>
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Fuerza</button></a>
                               
                             </div>
                        </div>
                </div>

                <div className="col-sm">
                <a className="op" href="/ReporteTR"><button type="button" className="btn btn-dark">Cerrar Sesion</button></a>
                  
                  </div>

              </div>
            </div>


          </div>
        </div>

        


        <nav className="navbar navbar-dark bg-dark">

           <h1 className="cab">AC2-G5</h1> 
           <div id="reloj" className="card bg-dark"> 
           <Reloj></Reloj>
           <Fecha></Fecha>
           </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>





        );
    }
}

export default Navegacion;