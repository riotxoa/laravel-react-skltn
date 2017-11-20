import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';

import Home from './Home';
import ListUsers from './Users/ListUsers'
import FormUser from './Users/FormUser';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            token: document.head.querySelector("[name=csrf-token]").content
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Drawer open={true} width={256}>
                        <Sidebar />
                    </Drawer>
                    <div className="app-container">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/usuarios' component={ListUsers} />
                            <Route exact path='/usuarios/nuevo' render={(props) => <FormUser title="Nuevo" />} />
                            <Route path='/usuarios/editar/:number' component={FormUser} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const Sidebar = (props) => (
    <div className="side-bar">
        <AppBar
            title="OttoBock"
            className="app-bar"
        />
        <NavLink exact activeClassName="active" to="/">
            <MenuItem leftIcon={<FontIcon className="fa fa-home" />} >Inicio</MenuItem>
        </NavLink>
        <NavLink exact activeClassName="active" to="/usuarios">
            <MenuItem leftIcon={<FontIcon className="fa fa-users" />}>Usuarios</MenuItem>
        </NavLink>
    </div>
);

export default App;
