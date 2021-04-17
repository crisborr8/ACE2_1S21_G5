import { Injectable } from '@angular/core';
import {Dato,ID} from '../modelo/Objeto';
@Injectable({
  providedIn: 'root'
})
export class LocalSTService {

  datos: Dato[]=[];
  sesion!:ID;
  constructor() { }



  AddDato(data: Dato){
      this.datos[0]=data;
        localStorage.setItem("Peso",JSON.stringify(this.datos));
      
  }

  getDato(){
      if(localStorage.getItem('Peso')===null){
        return this.datos;
      }else{
        let Tas= localStorage.getItem('Peso');
        this.datos= JSON.parse(Tas||'{}');
      return this.datos;
      }
    
  }

  getSesion(){
    if(localStorage.getItem('Sesion')===null){
      return this.sesion;
    }else{
      let Tas= localStorage.getItem('Sesion');
      this.sesion= JSON.parse(Tas||'{}');
    return this.sesion.IDs;
    }
  }
  deleteSesion(){
    localStorage.removeItem('Sesion');
  }

  deleteDato(){
    localStorage.removeItem('Peso');
  }

}
