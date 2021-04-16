import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalSTService} from '../../servicios/local-st.service';
import {Dato} from '../../modelo/Objeto';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Datos:Dato[]=[];
  Que:boolean = true;
  constructor( private router:Router, public Servicio:LocalSTService) { }

  ngOnInit(): void {
   
  }

  Logueado(){
    this.Datos=this.Servicio.getDato();
    if(this.Datos[0].Peso!=null){
      return true;
    }
    return false;
  }

 

  


}
