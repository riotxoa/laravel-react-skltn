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
import FlatPagination from 'material-ui-flat-pagination';

class ListClients extends Component {

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
            clients: [],
            total: 0,
            offset: 0,
            perPage: 10
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleDeleteRole = this.handleDeleteRole.bind(this);
        this.handleRequestSnackClose = this.handleRequestSnackClose.bind(this);

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount(){
        axios.get('/clients')
        .then(response => {
            this.setState({
                clients: response.data,
                total: response.data.length
            });
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
        let id = this.state.clients[index].id;

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

    handlePaginationClick(offset) {
        this.setState({offset});
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

            let uri = `/clients/` + this.state.delete_id;

            axios.delete(uri).then((response) => {
                let clientsArr = this.state.clients;
                clientsArr.splice(this.state.delete_index, 1);
                this.setState({
                    snack: {
                        message: 'Cliente borrado',
                        open: true
                    },
                    selected: [],
                    clients: clientsArr
                });
            });
        }
        const actions = [
            <RaisedButton label="Cancelar" style={styles.dialog} keyboardFocused={true} onClick={dcmClose} />,
            <RaisedButton label="Borrar" primary={true} style={styles.dialog} onClick={dcmDelete} />,
        ];
        /* /Configuración de la ventana modal para confirmar borrado */

        const clients = this.state.clients.slice(this.state.offset, this.state.offset+this.state.perPage).map((val, key) => {
            return (
                <TableRow key={key} selected={this.isSelected(key)}>
                    <TableRowColumn>{val.name}</TableRowColumn>
                    <TableRowColumn>{val.address}</TableRowColumn>
                    <TableRowColumn>{val.telephone}</TableRowColumn>
                </TableRow>
            );
        });

        let toolbar = (this.state.selected.length ?
            [
                <Toolbar key={1} style={styles.toolbar}>
                    <ToolbarGroup key={11} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={12}>
                        <NavLink to={"/clientes/editar/"+this.state.clients[this.state.selected].id}><FlatButton label="Editar" title="Editar cliente" primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-pencil" style={{fontSize:18}} />}/></NavLink>
                        <FlatButton label="Borrar" title="Borrar cliente" primary={true} style={styles.flatNew}  onClick={this.handleDeleteRole} icon={<FontIcon className="fa fa-trash" style={{fontSize:18}} />} />
                    </ToolbarGroup>
                </Toolbar>
            ]
            :
            [
                <Toolbar key={2} style={styles.toolbar}>
                    <ToolbarGroup key={21} firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup key={22}>
                        <NavLink to="/clientes/nuevo"><FlatButton label="Nuevo" title="Nuevo cliente" primary={true} style={styles.flatNew} icon={<FontIcon className="fa fa-plus-circle" style={{fontSize:18}} />}  /></NavLink>
                    </ToolbarGroup>
                </Toolbar>
            ]
        );

        return(
            <div>
                <AppBar
                    title="Clientes"
                    iconElementLeft={<div></div>}
                    className="app-bar no-element-left"
                />

                <div className="container">
                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn colSpan="3" style={{padding:0}}>
                                    {toolbar}
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Nombre del Cliente</TableHeaderColumn>
                                <TableHeaderColumn>Dirección</TableHeaderColumn>
                                <TableHeaderColumn>Teléfono</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false}>
                            {clients}
                        </TableBody>
                    </Table>

                    <FlatPagination
                        style={{marginTop:15, textAlign:"center"}}
                        offset={this.state.offset}
                        limit={this.state.perPage}
                        total={this.state.total}
                        onClick={(e, offset) => this.handlePaginationClick(offset)}
                    />

                    <NavLink to="/clientes/nuevo">
                        <FloatingActionButton title="Añadir cliente" style={styles.floating}>
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

export default ListClients;
