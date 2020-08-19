import React, { Component } from 'react'
import Axios from 'axios';

export default class RestoreAccount extends Component {

    state = {
        email : ''
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        });
    }

    recoveryAccount = async (e) => {
        e.preventDefault();
        const response = await Axios.post(`http://localhost:4000/inventory_shopping_manage/user_manage/restore_account`, {
            email : this.state.email
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
                        <h4 className="login-box-msg">Recupera tu cuenta <b>Cat</b>bol</h4>
                        <form onSubmit={this.recoveryAccount}>
                            <div className="form-group has-feedback">
                                <span className="fa fa-envelope-square form-control-feedback" /> Email
                                <input type="email" className="form-control" placeholder="Este email debe estar registrado en el sistema" onChange={this.onChangeEmail} required/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-success">
                                <i className="fa fa-user-circle"></i> Recuperar Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
