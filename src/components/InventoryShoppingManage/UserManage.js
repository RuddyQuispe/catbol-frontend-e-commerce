import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Navigation from '../Partials/Navigation';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
export default class UserManage extends Component {
    state = {
        users : [],
        username : '',
        rol_description : 'Admin',
        status: '',
        email: '',
        password: ''
    }

    async componentDidMount() {
        this.getUserList();
    }

    enableDisableUser = async (id) => {
        const response = await axios.put(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/user_manage/enable_disable/${id}`);
        await this.getUserList();
        alert(response.data.message);
    }

    renderUsers(){
        return this.state.users.map(user => {
            if (user.status) {
                return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.rol_description}</td>
                        <td><Button variant="danger" onClick={() => this.enableDisableUser(user.id)}>Inhabilitar</Button></td>
                        <td>
                            <Link className="btn btn-primary" to={"/user_update/"+user.id}>
                                Editar
                            </Link>
                        </td>
                    </tr>
                )
            }else{
                return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.rol_description}</td>
                        <td>
                            <Button variant="success" onClick={() => this.enableDisableUser(user.id)}>Habilitar</Button>
                        </td>
                        <td>
                            <Link className="btn btn-primary" to={"/user_update/"+user.id}>
                                Editar
                            </Link>
                        </td>
                    </tr>
                )
            }
        })
    }

    async getUserList(){
        const res = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/user_manage');
        this.setState({users : res.data.userList});
    }

    onChangeUserName = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    onChangeUserEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    onChangeUserPassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    
    onChangeUserRole= (e) => {
        this.setState({
            rol_description : e.target.value
        });
        console.log(e.target.value);
    }

    onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.email.length>0 && this.state.username.length>0 && this.state.password.length>0 && ['Admin', 'Workshop'].includes(this.state.rol_description)) {
            const response = await axios.post('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/user_manage', {
                username : this.state.username, 
                email: this.state.email, 
                role_description: this.state.rol_description,
                password : this.state.password
            });
            this.getUserList();
            alert(response.data.message);
        }else{
            alert("Error");
        }
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card card-primary card-outline">
                                <h3>Registrar Usuario</h3>
                                <form onSubmit={this.onHandleSubmit}>
                                    <div className="form-group">
                                        <label>username</label>
                                        <input type="text" className="form-control" onChange={this.onChangeUserName}/>
                                        <label>email</label>
                                        <input type="text" className="form-control" onChange={this.onChangeUserEmail}/>
                                        <label>password</label>
                                        <input type="password" className="form-control" onChange={this.onChangeUserPassword}/>
                                        <div className="form-group">
                                            <label>Selecciona un Rol</label>
                                            <select className="form-control" value={this.state.rol_description} onChange={this.onChangeUserRole} >
                                                <option value="Admin">Admin</option>
                                                <option value="Workshop">Workshop personal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body card card-primary card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>username</th>
                                            <th>email</th>
                                            <th>rol</th>
                                            <th>estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderUsers()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
