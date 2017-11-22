import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class NewClient extends Component {

    constructor(props){
        super(props);

        let addClient = (this.props.title === "Nuevo" ? true : false);

        this.state = {
            clientName: '',
            clientAddress: '',
            clientTelephone: '',
            snack: {
                open: false,
                message: '',
            },
            new: addClient,
            updated: false
        };

        this.handleChangeClientName = this.handleChangeClientName.bind(this);
        this.handleChangeClientAddress = this.handleChangeClientAddress.bind(this);
        this.handleChangeClientTelephone = this.handleChangeClientTelephone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestSnackClose = this.handleRequestSnackClose.bind(this);
    }
    componentDidMount(){
        if(!this.state.new) {
            axios.get(`/clients/${this.props.match.params.number}/edit`)
            .then(response => {
                this.setState({ clientName: response.data.name, clientAddress: response.data.address, clientTelephone: response.data.telephone });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    handleChangeClientName(e){
        this.setState({
            clientName: e.target.value
        })
    }
    handleChangeClientAddress(e){
        this.setState({
            clientAddress: e.target.value
        })
    }
    handleChangeClientTelephone(e){
        this.setState({
            clientTelephone: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();

        const clients = {
            name: this.state.clientName,
            address: this.state.clientAddress,
            telephone: this.state.clientTelephone,
        }

        if(this.state.new) {
            let uri = '/clients';
            axios.post(uri, clients).then((response) => {
                this.setState({
                    snack: {
                        open: true,
                        message: 'Nuevo cliente guardado',
                    },
                    updated: true,
                });
            });
        } else {
            let uri = `/clients/${this.props.match.params.number}`;
            axios.patch(uri, clients).then((response) => {
                this.setState({
                    snack: {
                        open: true,
                        message: 'Cliente actualizado',
                    },
                    updated: true,
                });
            });
        }
    }

    handleRequestSnackClose(e) {
        this.setState({
            snack: {
                open:false,
                message:'',
            }
        });
    }

    render() {
        if(this.state.updated) {
            return (
                <Redirect to={{
                    pathname: "/clientes",
                    snack: {
                        open: this.state.snack.open,
                        message: this.state.snack.message,
                    },
                }} />
            );
        } else {
            const style = {
                raised: {
                    marginRight:24,
                    marginTop:24,
                },
                flat: {
                    float:'right',
                }

            }

            return (
                <div>
                    <AppBar
                        title={(this.state.new ? "Nuevo Cliente" : "Editar Cliente")}
                        iconElementLeft={<div></div>}
                        className="app-bar no-element-left"
                    />
                    <div className="container">
                        <Link to="/clientes" className="btn btn-success"><FlatButton label="Volver" title="Volver" primary={true} style={style.flat} icon={<FontIcon className="fa fa-step-backward" style={{fontSize:18}} />} /></Link>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)} style={{marginTop:48}}>
                            <Paper zDepth={1} rounded={false} style={{padding:25, paddingBottom:50}} >
                                <TextValidator
                                    hintText="Nombre del Cliente"
                                    floatingLabelText="Nombre del Cliente"
                                    floatingLabelFixed={true}
                                    name="clientName"
                                    onChange={this.handleChangeClientName}
                                    value={this.state.clientName}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                                <TextValidator
                                    hintText="Dirección"
                                    floatingLabelText="Dirección"
                                    floatingLabelFixed={true}
                                    name="clientAddress"
                                    onChange={this.handleChangeClientAddress}
                                    value={this.state.clientAddress}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                                <TextValidator
                                    hintText="Teléfono"
                                    floatingLabelText="Teléfono"
                                    floatingLabelFixed={true}
                                    name="clientTelephone"
                                    onChange={this.handleChangeClientTelephone}
                                    value={this.state.clientTelephone}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                            </Paper>
                            <RaisedButton label="Guardar" type="submit" primary={true} style={style.raised} />
                            <Link to="/clientes"><RaisedButton label="Cancelar" style={style.raised} /></Link>
                        </ValidatorForm>
                    </div>
                </div>
            );
        }
    }
}
export default NewClient;
