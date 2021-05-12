import React, { Component, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
import { Table } from '@material-ui/core';
import Tabla from './Tabla'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
	 
var indice=1;
var datas = [];
function ObtenerHora(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return Hora;
}

var times= new Date();
//var times1= new Date(times);
var t1=String(ObtenerHora(times));
var t2=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t3=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t4=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t5=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t6=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t7=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t8=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t9=String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
var t10= String(ObtenerHora(times.setSeconds(times.getSeconds()-1)));
//var dps = [{ X:1, y: 0,label:String(t1) },{X:2, y: 0,label:t2},{X:3, y: 0,label:t3},{X:4, y: 0,label:t4},{X:5, y: 0,label:t5},{ X:6,y: 0,label:t6},{X:7, y: 0,label:t7},{X:8, y: 0,label:t8},{X:9, y: 0,label:t9},{X:10, y: 0,label:t10}];   //dataPoints.

//var dps = [{ X:1, y: 0,label:String(ObtenerHora(times1)) },{X:2, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:3, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:4, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:5, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{ X:6,y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:7, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:8, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:9, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))},{X:10, y: 0,label:String(ObtenerHora(times1.setSeconds(times1.getSeconds()-1)))}];   //dataPoints.
//var xVal = String(ObtenerHora(time2.setSeconds(time2.getSeconds()+1)));
var dps = [{ x:1, y: 0,label:String(t1) }];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;

class Grafica extends Component {

	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
		this.state={
			data:datas,
			medicion:{
				tipo:'',
				unidad:''
			}
		}
		this.llenar = this.llenar.bind(this);
		this.llenar();
	}

	async llenar(){
    
		if( await localStorage.getItem('medicion')===null){
		 
		}else{
		  let Tas= await localStorage.getItem('medicion');
		  console.log(Tas);
		  const tem=await this.setState({medicion:JSON.parse(Tas||'{}')});
		}
		
		  
   }
	
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
		
	}
	updateChart() {

		
		var min = 1;
		var max = 100;
		times= new Date();
		//AQUI REALIZARE LA PETICION



		//AQUI FINALIZA LA PETICION INICIA LA ASIGNACION
		yVal = (min + (Math.random() * (max-min))).toFixed(2);
		
		
		if(this.state.medicion.tipo=='Oxigeno'){
			
			console.log('Oxigeno');
		}else if(this.state.medicion.tipo=='Temperatura'){
			console.log('Temperatura');

		}else if(this.state.medicion.tipo=='Ritmo Cardiaco'){
			console.log('Ritmo Cardiaco');

		}else if(this.state.medicion.tipo=='Velocidad'){
			console.log('Velocidad');

		}else if(this.state.medicion.tipo=='Fuerza'){
			console.log('Fuerza');
		}
		dps.push({x: xVal,label:String(ObtenerHora(times)),y: Number(yVal) });
		datas.unshift({id: indice, oxigeno: yVal, estabilidad: String(ObtenerHora(times))});
		this.setState(datas);
		xVal++;
		indice++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	render() {
		
			const options = {
				title :{
					text: this.state.medicion.tipo
				},axisY: {
					title: this.state.medicion.tipo,
					suffix: String(this.state.medicion.unidad)
					
				},
				axisX: {
					title: "Hora",
					
				},
				data: [{
				
					type: "line",
					dataPoints : dps
				}]
			}
		
		
		
		return (
		<div>
			<div id="SubReporte" className="card">
				<h1>GRAFICA</h1>
					<CanvasJSChart options = {options}
						 onRef={ref => this.chart = ref}
					/>
			</div>
			

			<div id="filtroRendimiento" className="btn-group" >
                             <button type="button" className="btn btn-secondary dropdown-toggle bg-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 Filtro Rendimiento
                             </button>
                             <div className="dropdown-menu dropdown-menu-right">
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Bajo</button></a>
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Normal</button></a>
                             <a className="op" href="/ReporteTR"><button className="dropdown-item" type="button" >Bueno</button></a>  
                             </div>
                </div>
				


		<div id="SubReporte" className="card">
			<h1>BITACORA</h1>
			<Tabla data={datas}></Tabla>
         </div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Grafica;