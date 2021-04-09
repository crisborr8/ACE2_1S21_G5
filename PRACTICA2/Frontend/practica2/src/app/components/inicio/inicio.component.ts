import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalSTService} from '../../servicios/local-st.service';
import {Dato} from '../../modelo/Objeto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  numero!:Number;
  Datos:Dato[]=[];
   peso:string="";
   User:string="";
   conversion:any;
  constructor( private router:Router , public Servicio:LocalSTService) { }

  ngOnInit(): void {
  this.Servicio.deleteDato();
  }

  Almacenar(){
    var element = <HTMLInputElement> document.getElementById("flexRadioDefault2");
    var isChecked = element.checked;

   

    if(this.EsNumero(this.peso)){
      console.log(this.peso);
      if(!isChecked){
        this.conversion=Number(this.peso)/(2.2046);
        this.peso=this.conversion;
       }
   this.Servicio.AddDato({
     Peso:Number(this.peso)
   });
   this.Datos=this.Servicio.getDato();
    this.router.navigate(['/Grafica']);
    }
  }

  EsNumero(dato:any){
    var valoresAceptados = /^[0-9]+$/;
       if (dato.match(valoresAceptados)){
         // alert ("Es numérico");
          return true;
       } else {
         alert ("\""+dato+"\" No es numérico");
         return false;
      }
  }
}
