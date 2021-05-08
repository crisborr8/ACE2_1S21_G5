import React, { Component } from 'react';
import { BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';

import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
 
 
class Tabla extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='oxigeno'>
            Oxigeno
          </TableHeaderColumn>
          <TableHeaderColumn dataField='estabilidad'>
            Estabilidad
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default Tabla;