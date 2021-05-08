import React, { Component, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
import { Table } from '@material-ui/core';
import Tabla from './Tabla'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
	 

var datas = [
	{id: 1, oxigeno: 'Gob', estabilidad: '2'},
	{id: 2, oxigeno: 'Buster', estabilidad: '5'},
	{id: 3, oxigeno: 'George Michael', estabilidad: '4'}
  ];
function ObtenerHora(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return Hora;
}

var times= new Date();
var time2= new Date(times);
var dps = [{ X:1, y: 0,label:String(ObtenerHora(times))},{X:2, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:3, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:4, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:5, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{ X:6,y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:7, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:8, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:9, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))},{X:10, y: 0,label:String(ObtenerHora(times.setSeconds(times.getSeconds()-1)))}];   //dataPoints.
//var xVal = String(ObtenerHora(time2.setSeconds(time2.getSeconds()+1)));
//var dps = [{X:1,label: , y: 10}];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;

class Grafica extends Component {

	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
		this.state={
			data:datas
		}
		
	}
	
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
		
	}
	updateChart() {
		
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		times= new Date();
		dps.push({x: xVal,label:String(ObtenerHora(times)),y: yVal});
		datas.push({id: 3, oxigeno: 'George Michael', estabilidad: '4'});
		this.setState(datas);
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	render() {
		const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
			
				type: "line",
				dataPoints : dps
			}]
		}
		
		
		return (
		<div>
			<div className="card">
				<h1>GRAFICA</h1>
					<CanvasJSChart options = {options}
						 onRef={ref => this.chart = ref}
					/>
			</div>
			

		<div className="card">
			<h1>BITACORA</h1>
			<Tabla data={datas}></Tabla>
         </div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Grafica;