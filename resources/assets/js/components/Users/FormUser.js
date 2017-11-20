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

class NewUser extends Component {

    constructor(props){
        super(props);

        let addUser = (this.props.title === "Nuevo" ? true : false);

        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: '',
            snack: {
                open: false,
                message: '',
            },
            new: addUser,
            updated: false
        };

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
        this.handleChangeUserPassword = this.handleChangeUserPassword.bind(this);
        this.handleChangeConfirmUserPassword = this.handleChangeConfirmUserPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestSnackClose = this.handleRequestSnackClose.bind(this);
    }
    componentDidMount(){
        if(!this.state.new) {
            axios.get(`/users/${this.props.match.params.number}/edit`)
            .then(response => {
                this.setState({ userName: response.data.name, userEmail: response.data.email });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    handleChangeUserName(e){
        this.setState({
            userName: e.target.value
        })
    }
    handleChangeUserEmail(e){
        this.setState({
            userEmail: e.target.value
        })
    }
    handleChangeUserPassword(e){
        this.setState({
            userPassword: e.target.value
        })
    }
    handleChangeConfirmUserPassword(e){
        this.setState({
            userConfirmPassword: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.userPassword === this.state.userConfirmPassword) {
            const users = {
                name: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword
            }

            if(this.state.new) {
                let uri = '/users';
                axios.post(uri, users).then((response) => {
                    this.setState({
                        snack: {
                            open: true,
                            message: 'Nuevo usuario guardado',
                        },
                        updated: true,
                    });
                });
            } else {
                let uri = `/users/${this.props.match.params.number}`;
                axios.patch(uri, users).then((response) => {
                    this.setState({
                        snack: {
                            open: true,
                            message: 'Usuario actualizado',
                        },
                        updated: true,
                    });
                });
            }
        } else {
            alert("Las contraseñas no coinciden")
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
                    pathname: "/usuarios",
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

            ValidatorForm.addValidationRule('pwdMinLength_8', (value) => {
                return value.length >= 8;
            });

            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
                if (value !== this.state.userPassword) {
                    return false;
                }
                return true;
            });

            return (
                <div>
                    <AppBar
                        title={(this.state.new ? "Nuevo Usuario" : "Editar Usuario")}
                        iconElementLeft={<div></div>}
                        className="app-bar no-element-left"
                    />
                    <div className="container">
                        <Link to="/usuarios" className="btn btn-success"><FlatButton label="Volver" title="Volver" primary={true} style={style.flat} icon={<FontIcon className="fa fa-step-backward" style={{fontSize:18}} />} /></Link>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)} style={{marginTop:48}}>
                            <Paper zDepth={1} rounded={false} style={{padding:25, paddingBottom:50}} >
                                <TextValidator
                                    hintText="Nombre y apellidos"
                                    floatingLabelText="Nombre y apellidos"
                                    floatingLabelFixed={true}
                                    name="userName"
                                    onChange={this.handleChangeUserName}
                                    value={this.state.userName}
                                    validators={['required']}
                                    errorMessages={['Campo obligatorio']}/><br/>
                                <TextValidator
                                    hintText="user@example.com"
                                    floatingLabelText="Correo electrónico"
                                    floatingLabelFixed={true}
                                    name="email"
                                    onChange={this.handleChangeUserEmail}
                                    value={this.state.userEmail}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Campo obligatorio', 'Correo no válido']}/><br/>
                                <TextValidator
                                    hintText="Contraseña"
                                    floatingLabelText="Contraseña"
                                    floatingLabelFixed={true}
                                    name="password"
                                    onChange={this.handleChangeUserPassword}
                                    value={this.state.userPassword}
                                    type="password"
                                    validators={['required', 'pwdMinLength_8']}
                                    errorMessages={['Campo obligatorio', 'La contraseña debe contener al menos 8 caracteres']}/><br/>
                                <TextValidator
                                    hintText="Confirmar contraseña"
                                    floatingLabelText="Confirmar contraseña"
                                    floatingLabelFixed={true}
                                    name="confirmPassword"
                                    onChange={this.handleChangeConfirmUserPassword}
                                    value={this.state.userConfirmPassword}
                                    type="password"
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={['Campo obligatorio', 'Las contraseñas deben coincidir']}/><br/>
                            </Paper>
                            <RaisedButton label="Guardar" type="submit" primary={true} style={style.raised} />
                            <Link to="/usuarios"><RaisedButton label="Cancelar" style={style.raised} /></Link>
                        </ValidatorForm>
                    </div>
                </div>
            );
        }
    }
}
export default NewUser;
