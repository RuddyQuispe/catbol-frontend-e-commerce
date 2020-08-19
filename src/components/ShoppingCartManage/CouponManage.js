import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class CouponManage extends Component {

    state = {
        discount : '',
        limit_date : '',
        list_coupons : []
    }

    async componentDidMount(){
        await this.getListCoupons();
    }

    async getListCoupons(){
        const response = await axios.get(`http://localhost:4000/shopping_cart_manage/coupon_manage`);
        this.setState({
            list_coupons : response.data
        });
    }

    onChangeDiscount = (e) => {
        this.setState({
            discount : e.target.value
        })
    }

    onChangeLimitDate = (e) => {
        this.setState({
            limit_date : e.target.value
        })
    }

    renderCoupons(){
        return this.state.list_coupons.map(coupon => {
            return (
                <tr key={coupon.coupon_code}>
                    <td>{coupon.coupon_code}</td>
                    <td>{(coupon.limit_date).substring(0, (coupon.limit_date).indexOf("T"))}</td>
                    <td>{coupon.discount} %</td>
                </tr>
            )
        })
    }

    registerNewCoupon = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:4000/shopping_cart_manage/coupon_manage`,{
            limit_date : this.state.limit_date, 
            discount : this.state.discount
        });
        alert(response.data.message);
        await this.getListCoupons();
    }

    render() {
        return (
            <>
              <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card-success card-outline">
                                <h3>Registrar Nuevo Cupón</h3>
                                <form onSubmit={this.registerNewCoupon}>
                                    <div className="form-group">
                                        <label>% Descuento</label>
                                        <input type="number" className="form-control" onChange={this.onChangeDiscount} required/>
                                        <label>Fecha Límite</label>
                                        <input type="date" className="form-control" onChange={this.onChangeLimitDate} required/>
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
                                            <th>Descuento</th>
                                            <th>Fecha Límite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCoupons()}
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
