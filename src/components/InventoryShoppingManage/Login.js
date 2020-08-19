import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    signIn = async (e) => {
        e.preventDefault();
        if (this.state.email.length>0 && this.state.password>0) {
            const response = await axios.post('http://localhost:4000/login', this.state);
            console.log(response.data);
            if (response.data.type==="Admin") {
                window.sessionStorage.setItem("USER_AUTH",JSON.stringify(response.data));
                this.props.history.push("/main_admin");
            }else if (response.data.type==="Client") {
                window.sessionStorage.setItem("USER_AUTH",JSON.stringify(response.data));
                window.sessionStorage.setItem("SHOP_CART",JSON.stringify({
                    list_shopping : []
                }));
                this.props.history.push("/main_shopping");
            }else{
                alert("Login incorrect");
            }
        }else{
            alert("Not accepted");
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <b>Cat</b>bol
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Sistema para la Gestión de Comercio Electrónico</p>
                        <form onSubmit={this.signIn}>
                            <div className="form-group has-feedback">
                                <span className="fa fa-user form-control-feedback" />
                                <input type="text" className="form-control" placeholder="email" onChange={this.onChangeEmail}/>
                            </div>
                            <div className="form-group has-feedback">
                                <span className="fa fa-lock form-control-feedback" />
                                <input type="password" className="form-control" placeholder="password" onChange={this.onChangePassword}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-success">
                                <i className="fa fa-unlock"></i> Sign In
                            </button>
                        </form>
                        <div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <Link to={`/restore_my_account`} className="btn btn-block btn-danger">
                                Olvidé mi Contraseña
                            </Link>
                            <Link to={`/register_my_account`} className="btn btn-block btn-primary">
                                <i className="fa fa-user"/> Registrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
