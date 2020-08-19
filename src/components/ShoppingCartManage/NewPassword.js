import React, { Component } from 'react'
import axios from 'axios';

export default class NewPassword extends Component {

    state = {
        email : this.props.match.params.email,
        password : '',
        retype_password : ''
    }

    async componentDidMount(){
        console.log(this.props.match.params);
        this.setState({
            email : this.props.match.params.email
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    onChangeRetypePassword = (e) => {
        this.setState({
            retype_password : e.target.value
        })
    }

    registerNewPassword = async (e) => {
        e.preventDefault();
        if (this.state.password===this.state.retype_password) {
            const response = await axios.post(`http://localhost:4000/inventory_shopping_manage/user_manage/restore_account/new_password/${this.state.email}`,{
                password : this.state.password
            });
            alert(response.data.message);
        } else {
            alert("Reescribe el nuevo password, No coinciden");
        }
    }

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <b>Cat</b>bol
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <h4 className="login-box-msg">Ingresa tu nueva contraseña {this.state.email}</h4>
                        <form onSubmit={this.registerNewPassword}>
                            <div className="form-group has-feedback">
                                <span className="fa fa-user-alt form-control-feedback" /> Nuevo Password
                                <input type="password" className="form-control" onChange={this.onChangePassword} required/>
                            </div>
                            <div className="form-group has-feedback">
                                <span className="fa fa-user-alt form-control-feedback" /> Reescribe tu Nuevo Password
                                <input type="password" className="form-control" onChange={this.onChangeRetypePassword} required/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-success">
                                <i className="fa fa-save"></i> Guardar los Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
