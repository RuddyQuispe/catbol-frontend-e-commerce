import React, { Component } from 'react'
import Axios from 'axios';

export default class ClientRegister extends Component {

    state = {
        ci : 0, 
        first_name : '', 
        last_name : '', 
        email: '', 
        phone : '', 
        address : '', 
        province : '', 
        city : '',
        password : ''
    }

    onChangeCI = (e) => {
        this.setState({
            ci : e.target.value
        });
    }

    onChangeFirstName = (e) => {
        this.setState({
            first_name : e.target.value
        });
    }

    onChangeLastName = (e) => {
        this.setState({
            last_name : e.target.value
        });
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }

    onChangePhone = (e) => {
        this.setState({
            phone : e.target.value
        });
    }

    onChangeAddress = (e) => {
        this.setState({
            address : e.target.value
        });
    }

    onChangeProvince = (e) => {
        this.setState({
            province : e.target.value
        });
    }

    onChangeCity = (e) => {
        this.setState({
            city : e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    registerAccountClientUser = async (e) => {
        e.preventDefault();
        const response = await Axios.post(`http://localhost:4000/shopping_cart_manage/client_user_manage`,{
            ci : this.state.ci, 
            first_name : this.state.first_name, 
            last_name : this.state.last_name, 
            email : this.state.email, 
            phone : this.state.phone, 
            address : this.state.address, 
            province : this.state.province, 
            city : this.state.city, 
            password : this.state.password
        });
        alert(response.data.message);
    }

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <b>Cat</b>bol
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <h4 className="login-box-msg">Registra tu cuenta de Compras</h4>
                        <form onSubmit={this.registerAccountClientUser}>
                            <div className="form-group has-feedback">
                                CI
                                <input type="number" className="form-control" placeholder="CI" min={"111111"} onChange={this.onChangeCI} required/>
                            </div>
                            <div className="row">
                                <div className="form-group has-feedback col-md-6">
                                    Nombres
                                    <input type="text" className="form-control" placeholder="Ej. Juan" onChange={this.onChangeFirstName} required />
                                </div>
                                <div className="form-group has-feedback col-md-6">
                                    Apellidos
                                    <input type="text" className="form-control" placeholder="Ej. Raldez Albornoz" onChange={this.onChangeLastName} required />
                                </div>
                            </div>
                            <div className="form-group has-feedback">
                                Email
                                <input type="email" className="form-control" placeholder="Ej. example@hosting.com" onChange={this.onChangeEmail} required/>
                            </div>
                            <div className="form-group has-feedback">
                                Teléfono
                                <input type="text" className="form-control" placeholder="Ej. +591 XXXXXXXX" onChange={this.onChangePhone} required />
                            </div>
                            <div className="form-group has-feedback">
                                Dirección
                                <input type="text" className="form-control" placeholder="Ej. Barrio Los Pinos" onChange={this.onChangeAddress} required />
                            </div>
                            <div className="row">
                                <div className="form-group has-feedback col-md-6">
                                    Provincia
                                    <input type="text" className="form-control" placeholder="Ej. Andres Ibañez" onChange={this.onChangeProvince} required />
                                </div>
                                <div className="form-group has-feedback col-md-6">
                                    Ciudad
                                    <input type="text" className="form-control" placeholder="Ej. Santa Cruz de la Sierra" onChange={this.onChangeCity} required />
                                </div>
                            </div>
                            <div className="form-group has-feedback">
                                Password
                                <input type="password" className="form-control" onChange={this.onChangePassword} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-success">
                                <i className="fa fa-user-friends"></i> Registrate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
