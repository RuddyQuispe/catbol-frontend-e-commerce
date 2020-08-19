import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

export default class SaleNoteAdmin extends Component {

    state = {
        list_sale_note : [],
        delivery_options : []
    }

    async componentDidMount(){
        await this.getListSaleNoteAndDelivery();
    }

    async getListSaleNoteAndDelivery(){
        const response = await axios.get(`http://localhost:4000/shopping_cart_manage/sale_note_admin`);
        this.setState({
            list_sale_note : response.data.list_sale_note_admin,
            delivery_options : response.data.list_delivery
        });
    }

    getDataUser(){
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        return jsonUser.id;
    }

    async assignDeliveryOwner(codeSale, codeDelivery){
        const idUser = this.getDataUser();
        const response = await axios.post(`http://localhost:4000/shopping_cart_manage/sale_note_assign_delivery`, {
            code_sale : codeSale,
            id_delivery : codeDelivery,
            id_user_owner : idUser
        });
        alert(response.data.message);
        await this.getListSaleNoteAndDelivery();
    }

    renderDelivery(codeSale){
        return this.state.delivery_options.map(delivery => {
            return (
                <button className="btn btn-secondary btn-block" key={delivery.code_delivery} onClick={()=> this.assignDeliveryOwner(codeSale, delivery.code_delivery)}>
                    {delivery.name}
                </button>
            )
        })
    }

    getDeliveryStatus(deliveryAssigned, codeSale){
        if (deliveryAssigned===null) {
            return(
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            {this.renderDelivery(codeSale)}
                        </div>
                    </div>
                </div>

            );
        }else{
            return deliveryAssigned;
        }
    }

    async conclusionSaleNote(codeSale){
        const response = await axios.put(`http://localhost:4000/shopping_cart_manage/sale_note_conclusion/${codeSale}`);
        alert(response.data.message);
        await this.getListSaleNoteAndDelivery();
    }

    getButtonConclusion(status, codeSale){
        if (!status) {
            return (
                <button className="btn btn-outline-success btn-block btn-sm" onClick={() => this.conclusionSaleNote(codeSale)}>
                    Concluir Venta
                </button>
            )
        }
    }

    async generateInvoice(codeSale){
        const response = await axios.post(`http://localhost:4000/shopping_cart_manage/invoice_manage_generate`,{
            code_sale : codeSale
        });
        alert(response.data.message);
    }

    renderSaleNote(){
        return this.state.list_sale_note.map(sale_note => {
            return (
                <tr key={sale_note.code_sale}>
                    <td>{sale_note.code_sale}</td>
                    <td>{sale_note.address_send}</td>
                    <td>{sale_note.no_home}</td>
                    <td>{sale_note.province}</td>
                    <td>{sale_note.city}</td>
                    <td><span className="badge badge-secondary">{(sale_note.status_sale)? 'Entregado' : 'En Proceso'}</span></td>
                    <td>{(sale_note.payment_type)? 'Web' : 'Entrega'}</td>
                    <td>{sale_note.get_user_assigned}</td>
                    <td>{this.getDeliveryStatus(sale_note.get_delivery_assigned, sale_note.code_sale)}</td>
                    <td>{sale_note.corporate}</td>
                    <td>{sale_note.nit}</td>
                    <td>
                        {this.getButtonConclusion(sale_note.status_sale, sale_note.code_sale)}
                        <button className="btn btn-outline-primary btn-block btn-sm" onClick={() => this.generateInvoice(sale_note.code_sale)}>
                            Gestionar Factura
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-body card-warning card-outline">
                                <h3>Lista de Notas de Ventas</h3>
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Dirección Domicilio</th>
                                            <th>#Casa</th>
                                            <th>Provincia</th>
                                            <th>Ciudad</th>
                                            <th>Estado de Venta</th>
                                            <th>Tipo de Pago</th>
                                            <th>Responsable</th>
                                            <th>Delivery Asignado</th>
                                            <th>Razon Social</th>
                                            <th>NIT</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSaleNote()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card col-lg-12">
                            <div className="card-body">
                                <h4><Badge pill variant="primary">
                                        Gestionar Notas de Ventas para generar su factura y entrega delivery
                                    </Badge></h4>
                                <blockquote className="blockquote mb-0">
                                    <cite>
                                    Sistema E-commerce - Catbol
                                    </cite>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
