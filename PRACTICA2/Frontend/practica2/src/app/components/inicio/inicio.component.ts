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
   Hora!:any;
   Fecha!:any;
  constructor( private router:Router , public Servicio:LocalSTService) {
    setInterval(()=> this.tick(),1000);
   }

  ngOnInit(): void {
  this.Servicio.deleteDato();
  
  }

  private tick():void{
    var Fec=new Date();
    this.Hora=this.ObtenerHora(Fec);
    this.Fecha=this.ObtenerFecha(Fec);
  
  }
  ObtenerHora(Tiempo:any){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return Hora;
}
 ObtenerFecha(Tiempo:any){
  const dat = new Date(Tiempo).toLocaleString('en-GB');
  const Separar = dat.split(",",2);
  const FechaA = Separar[0];
  const desglose= FechaA.split("/",3);
  const Fin= desglose[0]+"-"+desglose[1]+"-"+desglose[2];
  return Fin;
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
