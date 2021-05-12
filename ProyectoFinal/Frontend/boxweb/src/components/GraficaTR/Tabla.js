import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

function rowClassNameFormat(row, rowIdx) {
  if (row["oxigeno"] < 20) {
    return "Mal-Row";
  } else if (row["oxigeno"] >= 20 && row["oxigeno"] <= 40) {
    return "Normal-Row";
  } else {
    return "Exelente-Row";
  }
}

class Tabla extends Component {

	constructor() {
		super();
	
		this.state={
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
  render() {
    return (
      
        <div id="Bitacora" className="overflow-auto">
          <BootstrapTable
            data={this.props.data}
            trClassName={rowClassNameFormat}
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
      
    );
  }
}

export default Tabla;
