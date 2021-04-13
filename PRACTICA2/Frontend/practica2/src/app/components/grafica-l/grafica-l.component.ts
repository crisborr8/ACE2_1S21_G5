import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Dato} from '../../modelo/Objeto';
import {LocalSTService} from '../../servicios/local-st.service'

@Component({
  selector: 'app-grafica-l',
  templateUrl: './grafica-l.component.html',
  styleUrls: ['./grafica-l.component.css']
})
export class GraficaLComponent  implements OnInit {
  Datos:Dato[]=[];
  Hora!:any;
  Fecha!:any;
  Peso!:any;
  min!:any;
  seg!:any;
  VO2MAX!:any;
  Prevo2max!:Number;
  Oxigeno!:any;
  Volumen!:any;

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

  constructor( private Servicio:LocalSTService) {
    this.resetTimer();
    setInterval(()=> this.tick(),1000);
  }

  ngOnInit() {
    console.log(':v');
        this.calculoVO2MAX();
    this.ActualizarLaber();
    this.ActualizarDatos();
  }
  calculoVO2MAX(){
    this.Volumen=500;
    this.Oxigeno=Number(this.Volumen)*(210);
    this.Prevo2max=this.Oxigeno/5;
    this.datos=this.Servicio.getDato();
    this.VO2MAX=(Number(this.Prevo2max)/Number(this.datos[0].Peso)).toFixed(3);
    
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
  this.temporizador();
  this.ActualizarLaber();
  this.ActualizarDatos();
  var Fec=new Date();
  this.Hora=this.ObtenerHora(Fec);
  this.Fecha=this.ObtenerFecha(Fec);
}

resetTimer():void{
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
