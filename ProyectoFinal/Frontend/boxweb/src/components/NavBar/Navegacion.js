import React,{Component} from 'react';
import Fecha from '../Reloj/Fecha';
import Reloj from '../Reloj/Reloj';



class Navegacion extends Component{

    
render(){

    return(


        <div className="pos-f-t">
        <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <h4 className="text-white">Collapsed content</h4>
            <span className="text-muted"> {this.props.titulo}.</span>
          </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
           <h1 className="cab">AC2-G5</h1> 
           <div className="card bg-dark"> 
           <Reloj></Reloj>
           <Fecha></Fecha>
           </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>





        );
    }
}

export default Navegacion;