import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class ProviderManage extends Component {

    state = {
        list_provider : [],
        ci_nit : '',
        name : '',
        phone : '',
        address : '',
        email : ''
    }

    componentDidMount(){
        this.getLisProvider();
    }

    async getLisProvider() {
        const response = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/provider_manage');
        this.setState({
            list_provider : response.data
        });
    }

    renderProvider(){
        return this.state.list_provider.map(provider => {
            return (
                <tr key={provider.ci_nit}>
                    <td>{provider.ci_nit}</td>
                    <td>{provider.name}</td>
                    <td>{provider.phone}</td>
                    <td>{provider.email}</td>
                    <td>{provider.address}</td>
                </tr>
            )
        })
    }

    onChangeCIorNIT = (e) => {
        this.setState({
            ci_nit : e.target.value
        })
    }

    onChangeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    onChangePhone = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    onChangeAddress = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    registerProvider = async (e) => {
        e.preventDefault();
        let response = await axios.post('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/provider_manage', {
            ci_nit : this.state.ci_nit,
            name : this.state.name,
            phone : this.state.phone, 
            address : this.state.address, 
            email : this.state.email
        });
        await this.getLisProvider();
        alert(response.data.message);
    }

    render() {
        return (
            <>
              <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card card-warning card-outline">
                                <h3>Registrar Proveedor</h3>
                                <form onSubmit={this.registerProvider} >
                                    <div className="form-group">
                                        <label>CI o NIT</label>
                                        <input type="number" className="form-control" onChange={this.onChangeCIorNIT}/>
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" onChange={this.onChangeName}/>
                                        <label>Telefono</label>
                                        <input type="text" className="form-control" onChange={this.onChangePhone}/>
                                        <label>Dirección</label>
                                        <input type="text" className="form-control" onChange={this.onChangeAddress}/>
                                        <label>Email</label>
                                        <input type="text" className="form-control" onChange={this.onChangeEmail}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body card card-warning card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>CI o NIT</th>
                                            <th>nombre</th>
                                            <th>telefono</th>
                                            <th>email</th>
                                            <th>dirección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderProvider()}
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
