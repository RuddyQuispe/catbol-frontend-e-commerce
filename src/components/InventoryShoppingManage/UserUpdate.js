import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Axios from 'axios';

export default class UserUpdate extends Component {

    state = {
        id : this.props.match.params.id,
        username : '',
        rol_description : '',
        status : '',
        email : ''
    }

    async componentDidMount(){
        await this.getUserData(this.props.match.params.id);
    }

    async getUserData(id){
        const response = await Axios.get(`http://localhost:4000/inventory_shopping_manage/user_manage/update/${id}`);
        console.log(response.data.username);
        await this.setState({
            username : response.data.username,
            rol_description : response.data.rol_description,
            status : response.data.status,
            email : response.data.email
        });
    }

    updateUser = async () => {
        const response = await Axios.put(`http://localhost:4000/inventory_shopping_manage/user_manage/update/${this.state.id}`,{
            username : this.state.username,
            email : this.state.email,
            rol_description : this.state.rol_description
        });
        alert(response.data.message);
        this.props.history.goBack();
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    onChangeUsername = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    onChangeUserRole= (e) => {
        this.setState({
            rol_description : e.target.value
        });
    }

    render() {
        return (
            <>
                <Navigation></Navigation>
                <div className="container mt-5 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Modificar Usuario</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.updateUser}>
                                <div className="form-group">
                                    <label>username</label>
                                    <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                                    <label>email</label>
                                    <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                                    <div className="form-group">
                                        <label>Select</label>
                                        <select className="form-control" value={this.state.rol_description} onChange={this.onChangeUserRole}>
                                            <option value="Admin">Admin</option>
                                            <option value="Workshop">Workshop personal</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block btn-success">
                                    <i className="fa fa-check"></i> Actualizar
                                </button>
                                <button type="danger" className="btn btn-danger btn-block" onClick={this.goBack}>
                                    <i className="fa fa-times"></i> Cancelar Cambios
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="center">
                                Allow me catbol
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
