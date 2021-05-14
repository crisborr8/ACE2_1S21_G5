import React, { Component, useState } from 'react'
import CanvasJSReact from '../../canvasjs.react';
import { Table } from '@material-ui/core';
import Tabla from './Tabla'
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios';

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

/*function rowClassNameFormat(row, rowIdx) {

	if(this.state.medicion.tipo==='Oxigeno'){
		if (row["oxigeno"] < 20) {
			return "Mal-Row";
		  } else if (row["oxigeno"] >= 20 && row["oxigeno"] <= 40) {
			return "Normal-Row";
		  } else {
			return "Exelente-Row";
		  }
	}

  
}*/
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
	 
var indice=1;
var datas = [];
function ObtenerHora(Tiempo){
    const dat = new Date(Tiempo).toLocaleString('en-GB');
    const Separar = dat.split(",",2);
    const Hora = Separar[1];
    return QuitarEspacio(Hora);
}
function QuitarEspacio(cadena){
    const Separar = cadena.split(" ",2);
    const dat = Separar[1];
    return dat;
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

	constructor(props) {
		super(props);
		this.updateChart = this.updateChart.bind(this);
		this.state={
			data:datas,
			medicion:{
				tipo:'',
				unidad:''
			},
			usuario:{
                id:'',
                nombre:'',
                apellido:'',
                usuario:'',
                edad:'',
                peso:'',
                estatura:'',
                correo:'',
				contrasena:''
            },
			sesion:{
				id:''
			}
		}
		this.llenarUser = this.llenarUser.bind(this);
		this.llenar = this.llenar.bind(this);
		this.llenarIdSesion=this.llenarIdSesion.bind(this);
		this.handleClick=this.handleClick.bind(this);
		this.handleClick1=this.handleClick1.bind(this);
		this.handleClick2=this.handleClick2.bind(this);
		this.handleClick3=this.handleClick3.bind(this);
		this.rowClassNameFormat=this.rowClassNameFormat.bind(this);
		this.llenar();
		this.llenarUser();
		this.llenarIdSesion();
	}
	rowClassNameFormat(row, rowIdx) {

		if(this.state.medicion.tipo==='Oxigeno'){
			if (row["oxigeno"] < 86) {
				return "Mal-Row";
			  } else if (row["oxigeno"] >= 95 && row["oxigeno"] <= 99) {
				return "Exelente-Row";
			  } else {
				return "Normal-Row";
			  }
		}else if(this.state.medicion.tipo==='Temperatura'){
			if (row["oxigeno"] < 36||row["oxigeno"] > 40) {
				return "Mal-Row";
			  } else if (row["oxigeno"] >= 36 && row["oxigeno"] <= 40) {
				return "Normal-Row";
			  } 
		}else if(this.state.medicion.tipo==='Ritmo Cardiaco'){
			if (row["oxigeno"] < 59||row["oxigeno"] > 100) {
				return "Mal-Row";
			  } else if ((row["oxigeno"] >= 60 && row["oxigeno"] <= 69)||(row["oxigeno"] >= 91 && row["oxigeno"] <= 100)) {
				return "Normal-Row";
			  } else if(row["oxigeno"] >= 70 && row["oxigeno"] <= 90){
				return "Exelente-Row";
			  }
		}else if(this.state.medicion.tipo==='Fuerza'){
			if (row["oxigeno"] <= 90) {
				return "Mal-Row";
			  } else if (row["oxigeno"] >= 20 && row["oxigeno"] <255) {
				return "Normal-Row";
			  } else if (row["oxigeno"] >= 255) {
				return "Exelente-Row";
			  }
		}
	
	  
	}

	async llenarUser(){
		if( await localStorage.getItem('Logueado')===null){
      
		}else{
		  let Tas= await localStorage.getItem('Logueado');
		  const tem=await this.setState({usuario:JSON.parse(Tas||'{}')});
	   
		}
	}
	async llenarIdSesion(){
		if( await localStorage.getItem('sesion')===null){
      
		}else{
		  let Tas= await localStorage.getItem('sesion');
		  const tem=await this.setState({sesion:JSON.parse(Tas||'{}')});
	   
		}
	}


	async llenar(){
    
		if( await localStorage.getItem('medicion')===null){
		 
		}else{
		  let Tas= await localStorage.getItem('medicion');
		  console.log(Tas);
		  const tem=await this.setState({medicion:JSON.parse(Tas||'{}')});
		}
		
		  
   }

  async handleClick() {
  
	await localStorage.setItem('medicion', JSON.stringify({tipo:'Temperatura', unidad:' °C'}));
	await this.llenar();
	datas=await [];
	dps=await[];
	await this.setState(datas);
	
	
  }
  
  async handleClick1() {
	await localStorage.setItem('medicion', JSON.stringify({tipo:'Oxigeno', unidad:' O2'}));
	await this.llenar();
	datas=await [];
	dps=await[];
	await this.setState(datas);

  }
  
  async handleClick2() {
	
	
	await localStorage.setItem('medicion', JSON.stringify({tipo:'Ritmo Cardiaco', unidad:' BPM'}));
	await this.llenar();
	datas=await [];
	dps=await[];
	await this.setState(datas);
	
	//this.props.history.push('/ReporteTR');
	
  }
  
  async handleClick3() {
   
	  await localStorage.setItem('medicion', JSON.stringify({tipo:'Fuerza', unidad:' N'}));
	  await this.llenar();
	  datas=await [];
	  dps=await[];
	await this.setState(datas);
	  
  // localStorage.setItem('medicion', JSON.stringify({tipo:'Velocidad', unidad:' u/s'}));
	
  }
  	componentDidMount() {
 		  this.intervalo=setInterval(this.updateChart, updateInterval);
		
	
		}
	componentWillUnmount(){
		clearInterval(this.intervalo);
	}
    
  updateChart() {

		
		var min = 1;
		var max = 100;
		times= new Date();
		//AQUI REALIZARE LA PETICION
		//console.log(ObtenerHora(times));
		axios.post('http://104.154.169.109:3000/ObtenerMediciones',{data:{idusuario:this.state.usuario.id,idsesion:this.state.sesion.id,hora:ObtenerHora(times)}})
		.then(response => {

			if(this.state.medicion.tipo=='Oxigeno'){
				yVal=response.data.oxigeno;
				console.log('Oxigeno');
			}else if(this.state.medicion.tipo=='Temperatura'){
				yVal=response.data.temperatura;
				console.log('Temperatura');
	
			}else if(this.state.medicion.tipo=='Ritmo Cardiaco'){
				yVal=response.data.ritmocardiaco;
				console.log('Ritmo Cardiaco');
	
			}else if(this.state.medicion.tipo=='Velocidad'){
				yVal=response.data.velocidad;
				console.log('Velocidad');
	
			}else if(this.state.medicion.tipo=='Fuerza'){
				yVal=response.data.fuerza;
				console.log('Fuerza');
			}
			
		});

		//AQUI FINALIZA LA PETICION INICIA LA ASIGNACION
		/*yVal = (min + (Math.random() * (max-min))).toFixed(2);
		
		
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
		}*/
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
			<div id="contbtn1" className="card">
				<h1>{this.state.usuario.usuario}</h1>
				<div className="row">
					<div className="col-sm"><button type="button" id="menbtn" onClick={this.handleClick1} className="btn btn-primary">Oxigeno</button></div>
					<div className="col-sm"><button type="button" id="menbtn" onClick={this.handleClick} className="btn btn-primary">Temperatura</button></div>
					<div className="col-sm"><button type="button" id="menbtn" onClick={this.handleClick2} className="btn btn-primary">Ritmo Cardiaco</button></div>
					<div className="col-sm"><button type="button" id="menbtn" onClick={this.handleClick3} className="btn btn-primary">Fuerza</button></div>

				</div>
				<a   href="/PerfilI"><button id="Detener" type="button"  className="btn btn-danger" >Detener Rutina</button></a>
			</div>
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
			{/*<Tabla data={datas}></Tabla>*/}



			<div id="Bitacora" className="overflow-auto">
          <BootstrapTable
            data={datas}
            trClassName={this.rowClassNameFormat}
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              dataAlign="center"
              headerAlign="left"
              width="10%"
              tdStyle={{ backgroundColor: "gray" }}
              thStyle={{
                color: "White",
                backgroundColor: "black",
              }}
            >
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="oxigeno"
              dataAlign="center"
              headerAlign="center"
              width="50%"
              thStyle={{
                color: "White",
                backgroundColor: "black",
              }}
            >
              {this.state.medicion.tipo} ({this.state.medicion.unidad})
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="estabilidad"
              dataAlign="center"
              headerAlign="center"
              thStyle={{
                color: "White",
                backgroundColor: "black",
              }}
            >
              Hora
            </TableHeaderColumn>
          </BootstrapTable>
        </div>





         </div>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default withRouter(Grafica);