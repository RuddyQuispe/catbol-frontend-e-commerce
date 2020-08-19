import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import {FcMoneyTransfer} from 'react-icons/fc';

export default class SaleNoteManage extends Component {

    state = {
        code_shopping : this.props.match.params.code_shopping,
        address : '',
        home_no : '',
        province : 'ANdres Ibañez',
        city : 'Santa Cruz de la Sierra',
        person_receive : '',
        user_data : [],
        corporate : '',
        nit : '',
        sub_total : 0,
        cost_sending : 0,
        discount : 0
    }

    async componentDidMount(){
        await this.getListUserData();
    }

    async getListUserData(){
        const response = await axios.get(`http://localhost:4000/shopping_cart_manage/sale_note_manage/${this.state.code_shopping}`);
        this.setState({
            user_data : response.data.clientData,
            address : response.data.clientData.address,
            province : response.data.clientData.province,
            city : response.data.clientData.city,
            sub_total : response.data.subTotal,
            discount : response.data.discount
        });
    }

    onChangeCorporate = (e) => {
        this.setState({
            corporate : e.target.value
        })
    }

    onChangeProvince = (e) => {
        this.setState({
            province : e.target.value
        })
    }

    onChangeCity = (e) => {
        let cost = 0;
        switch (e.target.value) {
            case "Cotoca": 
                cost=40;
                break;
            case "La Guardia": 
                cost=30;
                break;
            case "Paurito": 
                cost=40;
                break;
            case "El Torno": 
                cost=30;
                break;
            case "Okinawa": 
                cost=40;
                break;
            case "San Matias": 
                cost=50;
                break;
            case "Chihuahua": 
                cost=50;
                break;
            case "Pailas": 
                cost=50;
                break;
            case "Pailon": 
                cost=50;
                break;
            case "San Jose de Chiquitos": 
                cost=50;
                break;
            case "Mairana": 
                cost=40;
                break;
            case "Samaipata": 
                cost=45;
                break;
            default:
                cost=0;
                break;
        }
        this.setState({
            city : e.target.value,
            cost_sending : cost
        })
    }

    onChangeNit = (e) => {
        this.setState({
            nit : e.target.value
        })
    }

    onChangeAddress = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    onChangeHomeNo = (e) => {
        this.setState({
            home_no : e.target.value
        })
    }

    onChangeReceivePerson = (e) => {
        this.setState({
            person_receive : e.target.value
        })
    }

    saleNoteConclusion = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/shopping_cart_manage/sale_note_manage_conclusion',{
            home_no : this.state.home_no, 
            province : this.state.province, 
            city : this.state.city, 
            id_shopping_cart : this.state.code_shopping, 
            corporate : this.state.corporate, 
            nit : this.state.nit,
            address_send : this.state.address,
            person_receive : this.state.person_receive
        });
        alert(response.data.message);
    }

    render() {
        return (
            <>
                <Navigation/>
                <form onSubmit={this.saleNoteConclusion}>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card card-body card-success card-outline">
                                <h3>Identificación</h3>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={this.state.user_data.email} disabled/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Nombres</label>
                                            <input type="text" className="form-control" value={this.state.user_data.first_name} disabled/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Apellidos</label>
                                            <input type="text" className="form-control" value={this.state.user_data.last_name} disabled/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>CI</label>
                                            <input type="number" className="form-control" value={this.state.user_data.ci} disabled/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Teléfono</label>
                                            <input type="text" className="form-control" value={this.state.user_data.phone} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Razón Social</label>
                                    <input type="text" className="form-control" onChange={this.onChangeCorporate} required/>
                                    <label>NIT</label>
                                    <input type="number" className="form-control" onChange={this.onChangeNit} required/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card card-body card-danger card-outline">
                                <h3>Dirección del Envío</h3>
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} required/>
                                    <label># Casa o Depto.</label>
                                    <input type="number" className="form-control" value={this.state.home_no} onChange={this.onChangeHomeNo} required/>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Provincia</label>
                                        <select className="form-control" value={this.state.province} onChange={this.onChangeProvince} >
                                            <option value="Andres Ibañez">Andres Ibañez</option>
                                            <option value="Ignacio Warnes">Ignacio Warnes</option>
                                            <option value="Angel Sandoval">Angel Sandoval</option>
                                            <option value="Chiquitos">Chiquitos</option>
                                            <option value="Florida">Florida</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Ciudad</label>
                                        <select className="form-control" value={this.state.city} onChange={this.onChangeCity}>
                                            <option value="Cotoca">Cotoca</option>
                                            <option value="La Guardia">La Guardia</option>
                                            <option value="Paurito">Paurito</option>
                                            <option value="El Torno">El Torno</option>
                                            <option value="Okinawa">Okinawa</option>
                                            <option value="San Matias">San Matias</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Pailas">Pailas</option>
                                            <option value="Pailon">Pailon</option>
                                            <option value="San Jose de Chiquitos">San Jose de Chiquitos</option>
                                            <option value="Mairana">Mairana</option>
                                            <option value="Samaipata">Samaipata</option>
                                        </select>
                                    </div>
                                </div>
                                <label>Nombre Persona Recibe</label>
                                <input type="text" className="form-control" value={this.state.person_receive} onChange={this.onChangeReceivePerson} required/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card card-body card-secondary card-outline">
                                <h3>Resumen de Compra</h3>
                                <div className="form-group">
                                    <h5>SubTotal: {this.state.sub_total} <br/>
                                        Costo del Envío: {this.state.cost_sending} <br/>
                                        Descuento por Obtension de Cupon : {this.state.discount} %
                                    </h5>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block btn-success">
                                    <FcMoneyTransfer/> Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </>
        )
    }
}
