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

class NewRole extends Component {

    constructor(props){
        super(props);

        let addRole = (this.props.title === "Nuevo" ? true : false);

        this.state = {
            roleName: '',
            roleDescription: '',
            snack: {
                open: false,
                message: '',
            },
            new: addRole,
            updated: false
        };

        this.handleChangeRoleName = this.handleChangeRoleName.bind(this);
        this.handleChangeRoleDescription = this.handleChangeRoleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestSnackClose = this.handleRequestSnackClose.bind(this);
    }
    componentDidMount(){
        if(!this.state.new) {
            axios.get(`/roles/${this.props.match.params.number}/edit`)
            .then(response => {
                this.setState({ roleName: response.data.name, roleDescription: response.data.description });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    handleChangeRoleName(e){
        this.setState({
            roleName: e.target.value
        })
    }
    handleChangeRoleDescription(e){
        this.setState({
            roleDescription: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();

        const roles = {
            name: this.state.roleName,
            description: this.state.roleDescription,
        }

        if(this.state.new) {
            let uri = '/roles';
            axios.post(uri, roles).then((response) => {
                this.setState({
                    snack: {
                        open: true,
                        message: 'Nuevo perfil guardado',
                    },
                    updated: true,
                });
            });
        } else {
            let uri = `/roles/${this.props.match.params.number}`;
            axios.patch(uri, roles).then((response) => {
                this.setState({
                    snack: {
                        open: true,
                        message: 'Perfil actualizado',
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
                    pathname: "/perfiles",
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
                        title={(this.state.new ? "Nuevo Perfil" : "Editar Perfil")}
                        iconElementLeft={<div></div>}
                        className="app-bar no-element-left"
                    />
                    <div className="container">
                        <Link to="/perfiles" className="btn btn-success"><FlatButton label="Volver" title="Volver" primary={true} style={style.flat} icon={<FontIcon className="fa fa-step-backward" style={{fontSize:18}} />} /></Link>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)} style={{marginTop:48}}>
                            <Paper zDepth={1} rounded={false} style={{padding:25, paddingBottom:50}} >
                                <TextValidator
                                    hintText="Nombre del Perfil"
                                    floatingLabelText="Nombre del Perfil"
                                    floatingLabelFixed={true}
                                    name="roleName"
                                    onChange={this.handleChangeRoleName}
                                    value={this.state.roleName}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                                <TextValidator
                                    hintText="Descripción"
                                    floatingLabelText="Descripción"
                                    floatingLabelFixed={true}
                                    name="roleDescription"
                                    onChange={this.handleChangeRoleDescription}
                                    value={this.state.roleDescription}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                            </Paper>
                            <RaisedButton label="Guardar" type="submit" primary={true} style={style.raised} />
                            <Link to="/perfiles"><RaisedButton label="Cancelar" style={style.raised} /></Link>
                        </ValidatorForm>
                    </div>
                </div>
            );
        }
    }
}
export default NewRole;
