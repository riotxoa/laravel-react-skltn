import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link, Redirect } from 'react-router-dom';

import Home from './Home';
import ListUsers from './Users/ListUsers';
import FormUser from './Users/FormUser';
import ListRoles from './Roles/ListRoles';
import FormRole from './Roles/FormRole';
import ListClients from './Clients/ListClients';
import FormClient from './Clients/FormClient';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const appUser = {
    name: '',
    email: '',
    role: '',
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: true,
            token: null
        }
    }
    componentWillMount() {
        let _token = (document.head.querySelector("[name=csrf-token]").content ? document.head.querySelector("[name=csrf-token]").content : 0);
        if( _token ) {
            axios.get(`/user/logged`)
            .then(response => {
                appUser.name = response.data.name;
                appUser.email = response.data.email;
                appUser.role = response.data.role.name;

                this.setState({
                    isAuthenticated: true,
                    token: _token
                });

            })
            .catch(function (error) {
                this.setState({ isAuthenticated: false });
                console.log(error);
            });
        } else {
            this.setState({ isAuthenticated: false });
        }
    }
    isAuthenticated() {
        return this.state.isAuthenticated;
    }
    isRoot() {
        return appUser.role === 'root';
    }

    render() {
        if(this.isAuthenticated()) {
            const User = Authorization(['user', 'admin', 'root'])
            const Admin = Authorization(['admin', 'root'])
            const Root = Authorization(['root'])

            let admin_nestedItems = [];
            if(this.isRoot()) {
                admin_nestedItems.push(<ListItem key={1} primaryText="Perfiles" containerElement={<Link to="/perfiles" />} leftIcon={<FontIcon className="fa fa-user-circle" />} />);
            }
            admin_nestedItems.push(<ListItem key={2} primaryText="Usuarios" containerElement={<Link to="/usuarios" />} leftIcon={<FontIcon className="fa fa-users" />} />);

            return (
                <BrowserRouter>
                    <div>
                        <Drawer open={true} width={256}>
                            <Sidebar admin={admin_nestedItems} />
                        </Drawer>
                        <div className="app-container">
                            <Switch>
                                <Route exact path='/' component={User(Home)} />
                                <Route exact path='/usuarios' component={Admin(ListUsers)} />
                                <Route exact path='/usuarios/nuevo' render={(props) => <FormUser title="Nuevo" />} />
                                <Route path='/usuarios/editar/:number' component={Admin(FormUser)} />
                                <Route exact path='/perfiles' component={Root(ListRoles)} />
                                <Route exact path='/perfiles/nuevo' render={(props) => <FormRole title="Nuevo" />} />
                                <Route path='/perfiles/editar/:number' component={Root(FormRole)} />
                                <Route exact path='/clientes' component={User(ListClients)} />
                                <Route exact path='/clientes/nuevo' render={(props) => <FormClient title="Nuevo" />} />
                                <Route path='/clientes/editar/:number' component={Root(FormClient)} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <ErrorAuth />
            );
        }
    }
}

const Sidebar = (props) => (
    <div className="side-bar">
        <AppBar
            title="Skeleton"
            className="app-bar"
        />
        <List>
            <ListItem primaryText="Inicio" containerElement={<Link to="/" />} leftIcon={<FontIcon className="fa fa-home" />} />
            <Adminbar admin={props.admin}/>
            <Userbar />
        </List>
    </div>
);

const Adminbar = (props) => (
    <ListItem
        primaryText="Administración"
        leftIcon={<FontIcon className="fa fa-cogs" />}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={props.admin} />
);
const Userbar = (props) => (
    <div>
        <ListItem primaryText="Clientes" containerElement={<Link to="/clientes" />} leftIcon={<FontIcon className="fa fa-shopping-bag" />} />
    </div>
);

const ErrorAuth = (props) => (
    <div style={{textAlign:'center', paddingTop:'10%'}}>
        <p>Debes iniciar sesión para poder acceder a la aplicación</p>
    </div>
);
const ErrorPermission = (props) => (
    <div style={{textAlign:'center', paddingTop:'10%'}}>
        <p>No tienes suficientes permisos para acceder a esta sección</p>
    </div>
);

// Authorization HOC
const Authorization = (allowedRoles) => (
    (WrappedComponent) => (
        class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    user: {
                        name: appUser.name,
                        role: appUser.role
                    }
                }
            }
            render() {
                const { role } = this.state.user;
                if (allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <ErrorPermission />
                }
            }
        }
    )
)

export default App;
