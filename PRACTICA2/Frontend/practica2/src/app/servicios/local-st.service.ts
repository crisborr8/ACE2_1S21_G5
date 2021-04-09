import { Injectable } from '@angular/core';
import {Dato} from '../modelo/Objeto';
@Injectable({
  providedIn: 'root'
})
export class LocalSTService {

  datos: Dato[]=[];
  constructor() { }
  AddDato(data: Dato){
    this.datos.push(data);
      let datos:Dato[]=[];
      if(localStorage.getItem('Peso')===null){
      this.datos.push(data);
      localStorage.setItem("Peso",JSON.stringify(this.datos));
      }else{
        let Tas=localStorage.getItem('Peso');
        JSON.parse(Tas||'{}');
        datos.push(data);
        localStorage.setItem("Peso",JSON.stringify(this.datos));
      }
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

}
