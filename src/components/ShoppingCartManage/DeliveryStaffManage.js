import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class DeliveryStaffManage extends Component {

    state = {
        list_delivery : [],
        name : '',
        movil : ''
    }

    async componentDidMount(){
        await this.getListDelivery();
    }

    async getListDelivery(){
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/delivery_staff_manage`);
        console.log(response.data);
        this.setState({
            list_delivery : response.data
        });
    }

    renderDelivery(){
        return this.state.list_delivery.map(delivery => {
            return (
                <tr key={delivery.code_delivery}>
                    <td>{delivery.code_delivery}</td>
                    <td>{delivery.name}</td>
                    <td>{delivery.movil_description}</td>
                </tr>
            )
        })
    }

    onChangeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    onChangeMovilDescription = (e) => {
        this.setState({
            movil : e.target.value
        })
    }

    registerDelivery = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/delivery_staff_manage`,{
            name : this.state.name, 
            movil_description : this.state.movil
        });
        alert(response.data.message);
        await this.getListDelivery();
    }

    render() {
        return (
            <>
              <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card-success card-outline">
                                <h3>Registrar Personal Delivery</h3>
                                <form onSubmit={this.registerDelivery}>
                                    <div className="form-group">
                                        <label>Nombre Completo</label>
                                        <input type="text" className="form-control" onChange={this.onChangeName} required/>
                                        <label>Descripción del Movil</label>
                                        <input type="text" className="form-control"onChange={this.onChangeMovilDescription} required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body card-success card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre Personal Delivery</th>
                                            <th>Descripcion del movil de Trabajo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderDelivery()}
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
