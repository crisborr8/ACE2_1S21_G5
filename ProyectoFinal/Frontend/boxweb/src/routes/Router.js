import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import Historial from '../components/Historial/Historial'
import Login from '../components/login/Login'
import Registrar from '../components/Registrar/Registrar'
import Reportetr from '../components/GraficaTR/Reportetr'
import Perfil from '../components/Perfil/Perfil'
import PerfilInicio from '../components/Perfil/PerfilInicio'
import Principal from '../components/Principal/Principal'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Principal}/>
                    <Route exact path="/Login" component={Login}/>
                   <Route exact path="/Historial" component={Historial}/>
                    <Route exact path='/Registrar' component={Registrar}/>
                    <Route exact path="/ReporteTR" component={Reportetr}/>
                    <Route exact path="/Perfil" component={Perfil}/>
                    <Route exact path="/PerfilI" component={PerfilInicio}/>
                    
                    <Route exact path="/Principal" component={Principal}/>

                </Switch>
            </BrowserRouter>
        )
    }
}
