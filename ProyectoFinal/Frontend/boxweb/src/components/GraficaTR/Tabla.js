import React, { Component } from 'react'
import Datatable from 'react-data-table-component'


const tablaDatos=[
    {id:1 , año:"2000" , nombre:"Alejandro"},
    {id:2 , año:"2001" , nombre:"Alejandro1"},
    {id:3 , año:"2002" , nombre:"Alejandro2"},
    {id:4 , año:"2003" , nombre:"Alejandro3"}
];

const columnas =[
    {
        name:'Id',
        selector:'id',
        sortable: true
    },
    {
        name:'Año',
        selector:'año',
        sortable: true
    },
    {
        name:'Nombre',
        selector:'nombre',
        sortable: true
    }
];



export default class Tabla extends Component {
    render() {
        return (
            <div>
                <Datatable>
                    columns={columnas}
                    data={tablaDatos}
                    title="Bitacora"
                </Datatable>
            </div>
        )
    }
}
