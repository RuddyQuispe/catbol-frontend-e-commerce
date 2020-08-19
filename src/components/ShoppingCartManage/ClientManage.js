import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class ClientManage extends Component {

    state = {
        list_client : []
    }

    async componentDidMount(){
        await this.getListClientUser();
    }

    async getListClientUser(){
        const response = await axios.get(`http://localhost:4000/shopping_cart_manage/client_user_manage`);
        console.log(response.data);
        this.setState({
            list_client : response.data
        })
    }

    renderClientUser(){
        return this.state.list_client.map(client => {
            if (client.status) {
                return (
                    <tr key={client.ci}>
                        <td>{client.ci}</td>
                        <td>{client.first_name} {client.last_name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>{client.province} - {client.city}</td>
                        <td>
                            <button type="submit" className="btn btn-danger btn-sm" onClick={() => this.enableDisableClient(client.ci)}>
                                <i className="fa fa-lock"></i> Bloquear
                            </button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={client.ci}>
                        <td>{client.ci}</td>
                        <td>{client.first_name} {client.last_name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>{client.province} - {client.city}</td>
                        <td>
                            <button type="submit" className="btn btn-success btn-sm" onClick={() => this.enableDisableClient(client.ci)}>
                                <i className="fa fa-unlock"></i> Desbloquear
                            </button>
                        </td>
                    </tr>
                )
            }
        })
    }

    async enableDisableClient(ci){
        const response = await axios.put(`http://localhost:4000/shopping_cart_manage/client_user_manage/enable_disable/${ci}`);
        alert(response.data.message);
        await this.getListClientUser();
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card card-body card-success card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>CI</th>
                                            <th>Nombre Completo</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Dirección</th>
                                            <th>Cuidad - Provincia</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderClientUser()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
