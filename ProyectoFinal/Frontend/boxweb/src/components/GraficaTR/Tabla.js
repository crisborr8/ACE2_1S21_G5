import React, { Component } from 'react'
import Datatable from 'react-data-table-component'


const tablaDatos=[
    {id:1 , oxigeno:"2000" , estabilidad:"/"},
    {id:2 , oxigeno:"2001" , estabilidad:"X"},
    {id:3 , oxigeno:"2002" , estabilidad:"!"},
    {id:4 , oxigeno:"2003" , estabilidad:"/"},
];

const columnas =[
    {
        name:'Id',
        selector:'id',
        sortable: true
    },
    {
        name:'Oxigeno',
        selector:'oxigeno',
        sortable: true
    },
    {
        name:'Estabilidad',
        selector:'estabilidad',
        sortable: true
    }
];



export default class Tabla extends Component {
    render() {
        return (
            <div>
                <div className="card">
                <Datatable 
                columns={columnas}
                data={tablaDatos}
                title="Bitacora"
                />
                </div>
                    
            </div>
        )
    }
}
