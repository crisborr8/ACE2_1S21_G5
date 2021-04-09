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

  Datos!:Dato;
   Peso!:any;
  constructor( private router:Router , public Servicio:LocalSTService) { }

  ngOnInit(): void {
  
  }

  Almacenar(){
    let valor = document.getElementById("Peso");
    console.log(valor);
   // this.Datos.Peso= Number(this.Peso);
  //this.Servicio.AddDato(this.Datos);

   // alert("VOY PA YAA "+ this.Servicio.getDato());
    this.router.navigate(['/Grafica']);
  }

}
