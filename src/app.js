import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import EditPassword from './pages/edit-password/index'
import Board from './pages/board/board'
import Container from './pages/container/container'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/editPassword' component={EditPassword}/>
                    <Route exact path='/board' component={Board}/>
                    <Route path='/board/:id' component={Container}/>
                    <Redirect to="/login"/>
                </Switch>
            </Router>
        )
    }
}
