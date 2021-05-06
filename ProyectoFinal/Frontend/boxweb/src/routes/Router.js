import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import Historial from '../components/Historial/Historial'
import Login from '../components/login/Login'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/Historial" component={Historial}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
