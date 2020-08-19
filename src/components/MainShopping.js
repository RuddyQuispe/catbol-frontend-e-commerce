import React, { Component } from 'react'
import Navigation from '../components/Partials/Navigation';
import axios from 'axios';

export default class MainShopping extends Component {

    state = {
        list_clothing : []
    }

    async componentDidMount(){
        await this.getListClothing();
    }

    async getListClothing(){
        const response = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/shopping_manage');
        this.setState({
            list_clothing : response.data.clothing_list
        });
        console.log(response.data.clothing_list);
    }

    getDataUser(){
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        return jsonUser.id;
    }

    async addShoppingCart(codeClothing, idSize){
        let jsonUser = JSON.parse(sessionStorage.getItem("SHOP_CART"));
        let array = jsonUser.list_shopping;
        array.push({
            code_clothing : codeClothing,
            id_size : idSize,
            ci_user : this.getDataUser()
        });
        console.log(array);
        window.sessionStorage.setItem("SHOP_CART",JSON.stringify({
            list_shopping : array
        }));
        await this.getListClothing();
    }

    renderLisClothing(){
        return this.state.list_clothing.map(clothing => {
            return (
                <div className="col-md-3" key={`${clothing.code_clothing}-${clothing.id}`}>
                    <div className="card">
                        <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={300} width={300}/>
                        <div className="card-body">
                            <h4 className="card-title">{clothing.description}</h4>
                            <p className="card-text"><span className="badge badge-info">Talla: {clothing.description_size}</span><br/>{clothing.characterists} <br/> <b>Color: {clothing.color}</b> </p>
                            <h5><span className="badge badge-success">Costo: Bs. {clothing.price}</span>
                            <span className="badge badge-secondary">Descuento: {clothing.discount}%</span></h5>
                            <button type="button" className="btn btn-block btn-outline-success" onClick={() => this.addShoppingCart(clothing.code_clothing, clothing.id)}>
                                <i className="fa fa-shopping-cart"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <>
            <Navigation/>
            <div className="container mt-5">
                <div className="row">
                {this.renderLisClothing()}
                </div>
            </div>
            </>
        )
    }
}
