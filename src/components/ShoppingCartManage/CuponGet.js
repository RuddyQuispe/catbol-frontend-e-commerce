import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class CuponGet extends Component {

    state = {
        list_coupons_has : [],
        list_coupons_not_has : []
    }

    async componentDidMount(){
        await this.getListCouponAvailable();
    }

    getDataUser(){
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        return jsonUser.id;
    }

    async getListCouponAvailable(){
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/coupon_user/${this.getDataUser()}`);
        this.setState({
            list_coupons_has : response.data.list_coupon_user,
            list_coupons_not_has : response.data.list_coupon_not_user
        });
    }

    renderCouponNotHas(){
        return this.state.list_coupons_not_has.map(coupon => {
            return (
                <tr key={coupon.coupon_code}>
                    <td>{coupon.coupon_code}</td>
                    <td>{(coupon.limit_date).substring(0, (coupon.limit_date).indexOf("T"))}</td>
                    <td>{coupon.discount} %</td>
                    <td>
                        <Button variant="outline-success" onClick={() => this.getCoupon(coupon.coupon_code)}>
                            Obtener
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    renderCouponHas(){
        return this.state.list_coupons_has.map(coupon => {
            return (
                <tr key={coupon.coupon_code}>
                    <td>{coupon.coupon_code}</td>
                    <td>{(coupon.limit_date).substring(0, (coupon.limit_date).indexOf("T"))}</td>
                    <td>{coupon.discount}</td>
                </tr>
            )
        })
    }

    async getCoupon(codeCoupon){
        const response = await axios.post(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/coupon_user_register`,{
            code_coupon : codeCoupon, 
            ci_user : this.getDataUser()
        });
        alert(response.data.message);
        await this.getListCouponAvailable();
    }

    render() {
        return (
            <>
            <Navigation/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body card card-success card-outline">
                            <h4>Obtén un Cupón</h4>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha Límite</th>
                                        <th>Descuento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCouponNotHas()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card card-body card card-success card-outline">
                            <h4>Tus Cupones</h4>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha Límite</th>
                                        <th>Descuento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCouponHas()}
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
