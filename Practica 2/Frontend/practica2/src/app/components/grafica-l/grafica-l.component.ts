import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Dato, Vol} from '../../modelo/Objeto';
import {LocalSTService} from '../../servicios/local-st.service';
import {ConexionService} from '../../servicios/conexion.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-grafica-l',
  templateUrl: './grafica-l.component.html',
  styleUrls: ['./grafica-l.component.css']
})
export class GraficaLComponent  implements OnInit {
  Datos:Dato[]=[];
  DATA!:Vol;
  Arreglo:any[]=[0,0,0,0,0,0,0,0,0,0];
  Arreglo2:any[]=[0,0,0,0,0,0,0,0,0,0];
  DATAS:Vol[]=[];
  Hora!:any;
  Fecha!:any;
  Peso!:any;
  min!:any;
  seg!:any;
  VO2MAX!:any;
  Prevo2max!:Number;
  Oxigeno!:any;
  Volumen!:any;
  volumenmax!:any;
  volumenmin!:any;
  volumenprom!:any;
  volumenpromNeg!:any;
  promediog!:any;
  sesion!:string;
  datos:Dato[]=[];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[]=[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Aire ml'
         },
         gridLines: {
          //drawOnChartArea: false
      }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Tiempor Real hh:mm:ss'
           
        },
        gridLines: {
          //drawOnChartArea: false
      }
     }]
   }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      //backgroundColor: 'transparent',
      backgroundColor: '#A7D4D8'
    },
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor( private Servicio:LocalSTService,private conexion:ConexionService) {
    this.resetTimer();
    setInterval(()=> this.tick(),1000);
    setInterval(()=> this.calculoVO2MAX(),1000);
  //  setInterval(()=> this.ActualizarLaber(),1000);
    
  }

  ngOnInit() {
    
      this.ActualizarLaber();
    
     
  }
  
  calculoVO2MAX(){
    
    if(this.min==0 && this.seg==0 && this.VO2MAX==undefined){
      this.valoresAire();
      
      //---------------------
      
      let Suma=0;
      let resta=0;
      let contador=0;
      let contadorn=0;
      this.conexion.Volumenes( String(this.Servicio.getSesion())).subscribe(async(res: any) =>{
        this.DATAS= await res;
        
        for(let i=0;i<this.DATAS.length;i++){
          if(this.DATAS[i].Data>=0){
            console.log(this.DATAS[i].Data);
            Suma= Suma+this.DATAS[i].Data;
            contador++;
          }

          if(this.DATAS[i].Data<0){
            console.log(this.DATAS[i].Data);
            resta= resta+this.DATAS[i].Data;
            contadorn++;
          }
          
          
        }
        //TENIENDO EN CUENTA
       //Suma y resta esta en ml de aire : 1 litro tiene 1000 ml de aire :1 litro de aire tiene 210ml de oxigeno
        this.promediog=(((Suma+resta)/(contador+contadorn))).toFixed(2);
        this.volumenprom=((Suma/contador)).toFixed(2);
        this.volumenpromNeg=((resta/contadorn)).toFixed(2);
      
        //AQUI HAGO EL CALCULO DEL VO2MAX
        this.Oxigeno=(this.volumenprom*(210/1000)).toFixed(2);
        this.Prevo2max=this.Oxigeno/5;
        this.datos=this.Servicio.getDato();
        this.VO2MAX=(Number(this.Prevo2max)/Number(this.datos[0].Peso)).toFixed(2);
       
      },(error:any)=>{
        console.error(error);
      });
      //---------------------
      
    
    }
    
  }

  async valoresAire(){

    const aire1= await this.conexion.VolumenMax(String(this.Servicio.getSesion())).subscribe(async(res: any) =>{
      this.DATA= await res;
      console.log(this.DATA);
      this.volumenmax=(this.DATA.Data).toFixed(2);//Data.Data esta en ml de aire lo convierto a litros y por ultimo a ml de oxigeno
    },(error:any)=>{
      console.error(error);
    });

    const aire2= await this.conexion.VolumenMin(String(this.Servicio.getSesion())).subscribe(async(res: any) =>{
      this.DATA=await res;
      console.log(this.DATA);
      this.volumenmin=(this.DATA.Data).toFixed(2);//Data.Data esta en ml de aire lo convierto a litros y por ultimo a ml de oxigeno
    },(error:any)=>{
      console.error(error);
    });
    
  }
  async ActualizarLaber(){
     this.Arreglo=this.Arreglo2;
     let it=0;
     let datito=0;
     if(it==0){
      const tu=await delay(1000);
      await it++;
    var timestamp = await new Date();
    var palabusqueda=timestamp;
    console.log("--->  "+this.ObtenerHora(palabusqueda.setSeconds(palabusqueda.getSeconds() - 1)));
        try {
      const aire2=await this.conexion.VolumenHora(this.ObtenerHora(palabusqueda),String(this.Servicio.getSesion())).subscribe(async(res: any) =>{
        this.DATA= await res;
        let it2=0;
        if(it2==0){
          await it2++;
          if(this.DATA.Data!=null){
            
            datito= await Number((this.DATA.Data).toFixed(2));
            console.log(datito);
          }else{
            console.log('FF');
          }
         
         
        }
        console.log('.............. '+datito);
        for(let j=0;j<10;j++){
          if(j==9){
            this.Arreglo[j]=datito;
          }else{
            this.Arreglo[j]=this.Arreglo2[j+1];
          }
        }
    
        this.lineChartData=[{data: [this.Arreglo[0], this.Arreglo[1], this.Arreglo[2], this.Arreglo[3], this.Arreglo[4],this.Arreglo[5], this.Arreglo[6],this.Arreglo[7],this.Arreglo[8],this.Arreglo[9]], label: 'Volumen de Aire'}];
  
        
      },(error:any)=>{
        console.log('.............. '+datito);
        for(let j=0;j<10;j++){
          if(j==9){
            this.Arreglo[j]=datito;
          }else{
            this.Arreglo[j]=this.Arreglo2[j+1];
          }
        }
    
        this.lineChartData=[{data: [this.Arreglo[0], this.Arreglo[1], this.Arreglo[2], this.Arreglo[3], this.Arreglo[4],this.Arreglo[5], this.Arreglo[6],this.Arreglo[7],this.Arreglo[8],this.Arreglo[9]], label: 'Volumen de Aire'}];
    
        
      });
    } catch (error) {
      console.log('XD');
    }


    for(let i=0;i<10;i++){
      let Horat= this.ObtenerHora(timestamp.setSeconds(timestamp.getSeconds() - 1));
      this.lineChartLabels[9-i]=Horat;
    }


    }

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

private tick():void{
  //if(this.min==0 && this.seg==0){
    //this.calculoVO2MAX();
  //}
  this.temporizador();
  this.ActualizarLaber();
  var Fec=new Date();
  this.Hora=this.ObtenerHora(Fec);
  this.Fecha=this.ObtenerFecha(Fec);

}

resetTimer():void{
  //this.VO2MAX=0;
  this.volumenmax=0;
  this.volumenmin=0;
  this.volumenprom=0;
  this.volumenpromNeg=0;
  this.promediog=0;
  this.min=5;
  this.seg=0;
  this.Datos=this.Servicio.getDato();
  this.Peso=this.Datos[0].Peso.toFixed(3);

}
private temporizador(){
    if(--this.seg<0){
      this.seg=59;
      if(--this.min<0){
        this.min='0';
        this.seg='0';
        
      }
    }
}



}
