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

  Datos:Dato[]=[];
   peso:string="";
   User:string="";
  constructor( private router:Router , public Servicio:LocalSTService) { }

  ngOnInit(): void {
  
  }

  Almacenar(){
  
    console.log(this.peso);
   this.Servicio.AddDato({
     Peso:Number(this.peso)
   });
   this.Datos=this.Servicio.getDato();
      alert("Su peso ingresado es de: "+ this.Datos[0].Peso);
    this.router.navigate(['/Grafica']);
  }

}
