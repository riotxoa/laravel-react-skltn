import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';

class ListRoles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            smShow: false,
            snack: {
                open: (this.props.location.snack ? this.props.location.snack.open : false),
                message: (this.props.location.snack ? this.props.location.snack.message : ''),
            },
            selected: [],
            roles: [],
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleDeleteRole = this.handleDeleteRole.bind(this);
        this.handleRequestSnackClose = this.handleRequestSnackClose.bind(this);
    }

    componentDidMount(){
        axios.get('/roles')
        .then(response => {
            this.setState({ roles: response.data });
        })
        .catch(function (error) {
            (error);
        })
    }

    isSelected(index) {
        return this.state.selected.indexOf(index) !== -1;
    }

    handleRowSelection(selectedRows) {
        this.setState({
            selected: selectedRows,
        });
    }

    handleDeleteRole(){
        let index = this.state.selected;
        let id = this.state.roles[index].id;

        this.setState({
            delete_id: id,
            delete_index: index,
            smShow: true
        });
    }

    handleRequestSnackClose() {
        this.setState({
            snack: {
                open: false,
                message: '',
            }
        });
    }

    render() {
        const styles = {
            dialog: {
                marginBottom:12,
                marginLeft:12,
                marginTop:12
            },
            floating: {
                bottom:75,
                float:'right',
                marginTop:20,
                position:'fixed',
                right:75,
            },
            toolbar: {
                backgroundColor:'#FFFFFF',
            },
            flatNew: {
                float: 'right',
            }
        }

        /* Configuración de la ventana modal para confirmar borrado */
        let dcmClose = () => this.setState({ smShow: false });
        let dcmDelete = () => {
            this.setState({ smShow: false });

            let uri = `/roles/` + this.state.delete_id;

            axios.delete(uri).then((response) => {
                let rolesArr = this.state.roles;
                rolesArr.splice(this.state.delete_index, 1);
                this.setState({
                    snack: {
                        message: 'Perfil borrado',
                        open: true
                    },
                    selected: [],
                    roles: rolesArr
                });
            });
        }
        const actions = [
            <RaisedButton label="Cancelar" style={styles.dialog} keyboardFocused={true} onClick={dcmClose} />,
            <RaisedButton label="Borrar" primary={true} style={styles.dialog} onClick={dcmDelete} />,
        ];
        /* /Configuración de la ventana modal para confirmar borrado */

        let roles = this.state.roles.map((val, key) => {
            return (
                <TableRow key={key} selected={this.isSelected(key)}>
                    <TableRowColumn>{val.name.toUpperCase()}</TableRowColumn>
                    <TableRowColumn>{val.description}</TableRowColumn>
                </TableRow>
            );
        });

        let toolbar = (this.state.selected.length ?
            [
                <Toolbar key={1} style={styles.toolbar}>
                    <ToolbarGroup key={11} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={12}>
                        <NavLink to={"/roles/editar/"+this.state.roles[this.state.selected].id}><FlatButton label="Editar" title="Editar perfil" primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-pencil" style={{fontSize:18}} />}/></NavLink>
                        <FlatButton label="Borrar" title="Borrar perfil" primary={true} style={styles.flatNew}  onClick={this.handleDeleteRole} icon={<FontIcon className="fa fa-trash" style={{fontSize:18}} />} />
                    </ToolbarGroup>
                </Toolbar>
            ]
            :
            [
                <Toolbar key={2} style={styles.toolbar}>
                    <ToolbarGroup key={21} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={22}>
                        <NavLink to="/roles/nuevo"><FlatButton label="Nuevo" title="Nuevo perfil" primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-plus-circle" style={{fontSize:18}} />}  /></NavLink>
                    </ToolbarGroup>
                </Toolbar>
            ]
        );

        return(
            <div>
                <AppBar
                    title="Perfiles"
                    iconElementLeft={<div></div>}
                    className="app-bar no-element-left"
                />

                <div className="container">
                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn colSpan="2" style={{padding:0}}>
                                    {toolbar}
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Nombre del Perfil</TableHeaderColumn>
                                <TableHeaderColumn>Descripción</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false}>
                            {roles}
                        </TableBody>
                    </Table>

                    <NavLink to="/roles/nuevo">
                        <FloatingActionButton title="Añadir perfil" style={styles.floating}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </NavLink>
                </div>

                <Snackbar
                    open={this.state.snack.open}
                    message={this.state.snack.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestSnackClose}
                />

                <Dialog actions={actions} modal={false} open={this.state.smShow} onRequestClose={dcmClose}>
                    <p>¿Está seguro de que desea <b>BORRAR</b> el registro?</p>
                </Dialog>
            </div>
        );
    }
}

export default ListRoles;
