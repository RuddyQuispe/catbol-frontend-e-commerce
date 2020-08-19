import React, { Component } from 'react'
import axios from 'axios';

export default class VerifyKey extends Component {

    state = {
        key : ''
    }

    onChangeKey = (e) => {
        this.setState({
            key : e.target.value
        });
    }

    verifyKey = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:4000/inventory_shopping_manage/user_manage/restore_account/verify_key`,{
            key : this.state.key
        });
        console.log(response.data);
        alert(response.data.email);
        if (response.data.email=== null) {
            alert("El codigo es incorrecto, intente de nuevo a recuperar la cuenta");
        }else{
            this.props.history.push(`/new_password_account/${response.data.email}`);
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
                        <h4 className="login-box-msg">Vericación de Key de Seguridad </h4>
                        <form onSubmit={this.verifyKey}>
                            <div className="form-group has-feedback">
                                <span className="fa fa-key form-control-feedback" /> Key
                                <input type="text" className="form-control" placeholder="Este key fue enviado en su email" onChange={this.onChangeKey} required/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-success">
                                <i className="fa fa-keybase"></i> Verificar key
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
