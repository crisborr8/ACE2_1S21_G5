import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalSTService} from '../../servicios/local-st.service';
import {Dato,ID} from '../../modelo/Objeto';
import {ConexionService} from '../../servicios/conexion.service';


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
   prueba!:any;
   Ids!:ID;
  constructor( private router:Router , public Servicio:LocalSTService, private conexion:ConexionService) {
    setInterval(()=> this.tick(),1000);
   }

  ngOnInit(): void {
  this.Servicio.deleteDato();  
  this.Servicio.deleteSesion();
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

  async Almacenar(){


    
    var element = <HTMLInputElement> document.getElementById("flexRadioDefault2");
    var isChecked = element.checked;

    if(this.EsNumero(this.peso)){

      try {
        const crear=await this.conexion.Crear().subscribe(async(res: any) =>{
          this.prueba= await res;
           console.log(this.prueba);
    
        });

        const obtener= await this.conexion.ObtenerID().subscribe(async(res: any) =>{
          this.Ids= await res;
          localStorage.setItem('Sesion',JSON.stringify(this.Ids));
          console.log(this.Ids.IDs);
    
        });


      } catch (error) {
        console.log('ERRRRROOOOORRR');
      }



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
