import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Dato, Vol} from '../../modelo/Objeto';
import {LocalSTService} from '../../servicios/local-st.service';
import {ConexionService} from '../../servicios/conexion.service';

@Component({
  selector: 'app-grafica-l',
  templateUrl: './grafica-l.component.html',
  styleUrls: ['./grafica-l.component.css']
})
export class GraficaLComponent  implements OnInit {
  Datos:Dato[]=[];
  DATA!:Vol;
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

  datos:Dato[]=[];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[]=[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Amplitud de Aire'
         },
         gridLines: {
          //drawOnChartArea: false
      }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Tiempor Real'
           
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
   // setInterval(()=> this.valoresAire(),6000);
    
  }

  ngOnInit() {
    this.ActualizarLaber();
    this.ActualizarDatos();
  }
  calculoVO2MAX(){
    
    if(this.min==0 && this.seg==0 && this.VO2MAX==undefined){
      this.valoresAire();
      
      //---------------------
      let Suma=0;
      let contador=0;
      this.conexion.Volumenes().subscribe(async(res: any) =>{
        this.DATAS= await res;
        
        for(let i=0;i<this.DATAS.length;i++){
          if(this.DATAS[i].Data>=0){
            console.log(this.DATAS[i].Data);
            Suma= Suma+this.DATAS[i].Data;
            contador++;
          }
  
        }
        
        this.volumenprom=(Suma/contador).toFixed(2);
      
        this.Oxigeno=(this.volumenprom)*(210);
        this.Prevo2max=this.Oxigeno/5;
        this.datos=this.Servicio.getDato();
        this.VO2MAX=(Number(this.Prevo2max)/Number(this.datos[0].Peso)).toFixed(3);
       
      },(error:any)=>{
        console.error(error);
      });
      //---------------------
      
    
    }
    
  }

  valoresAire(){
    this.conexion.VolumenMax().subscribe(async(res: any) =>{
      this.DATA= await res;
      console.log(this.DATA);
      this.volumenmax=this.DATA.Data;
    },(error:any)=>{
      console.error(error);
    });

    this.conexion.VolumenMin().subscribe(async(res: any) =>{
      this.DATA=await res;
      console.log(this.DATA);
      this.volumenmin=this.DATA.Data;
    },(error:any)=>{
      console.error(error);
    });
    
  }


  
  ActualizarLaber(){
    var timestamp = new Date();
    for(let i=0;i<10;i++){
      this.lineChartLabels[9-i]=this.ObtenerHora(timestamp.setSeconds(timestamp.getSeconds() - 1));
    }

  }

   getRand(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }

  ActualizarDatos(){
    
    this.lineChartData=[{data: [this.getRand(-100,0), this.getRand(10,100), this.getRand(-100,100), this.getRand(0,100), this.getRand(0,100),this.getRand(0,100), this.getRand(0,100)], label: 'Volumen de Aire'}];
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
  this.ActualizarDatos();
  var Fec=new Date();
  this.Hora=this.ObtenerHora(Fec);
  this.Fecha=this.ObtenerFecha(Fec);

}

resetTimer():void{
  this.volumenmax=0;
  this.volumenmin=0;
  this.volumenprom=0;
  this.min=0;
  this.seg=9;
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
