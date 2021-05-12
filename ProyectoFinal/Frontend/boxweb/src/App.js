import logo from './logo.svg';
import './App.css';

import Navegacion from './components/NavBar/Navegacion';

import {Esquema1} from './Models/Objetos.json';
import React,{ Component } from 'react';
import Historial from './components/Historial/Historial';

class App extends Component  {

  
  constructor(){
    super();
    this.state={
      Esquema1:Esquema1
    }
  }

  render(){
    
    const Tem = this.state.Esquema1.map((Esquema,i)=>{
      return(
        <div className="card">
          {Esquema.titulo}
        </div>
      )

    })

    return (

      <div className="App">
        
<<<<<<< HEAD
        <Navegacion titulo="TEMPERATURA223"></Navegacion>
<Historial/>
       {/* {Tem} */}
=======
        <Navegacion/>

      
        <Historial/>
>>>>>>> GraficaTRv1
      
      </div>
    )
  }


  
}

export default App;

