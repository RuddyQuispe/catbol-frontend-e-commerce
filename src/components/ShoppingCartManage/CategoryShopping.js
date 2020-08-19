import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';

export default class CategoryShopping extends Component {

    state = {
        id_category : this.props.match.params.id_category,
        list_clothing : []
    }

    async componentDidMount (){
        await this.getLisClothing();
    }

    async getLisClothing(){
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/shopping_manage/${this.state.id_category}`);
        this.setState({
            list_clothing : response.data
        });
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
        await this.getLisClothing();
    }

    renderClothing(){
        if (this.state.list_clothing.length>0) {
            return this.state.list_clothing.map(clothing => {
                return (
                    <div key={`${clothing.code_clothing}-${clothing.id}`} className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={350} width={300}/>
                            <div className="card-body">
                                <h4 className="card-title">{clothing.description}</h4>
                                <p className="card-text"><span className="badge badge-info">Talla: {clothing.description_size}</span><br/>{clothing.characterists} <br/> <b>Color: {clothing.color}</b> </p>
                                <span className="badge badge-success">Costo: {clothing.price}</span>
                                <span className="badge badge-secondary">Descuento: {clothing.discount}</span>
                                <br/>
                                <button type="button" className="btn btn-block btn-outline-success" onClick={() => this.addShoppingCart(clothing.code_clothing, clothing.id)}>
                                    <i className="fa fa-shopping-cart"></i> Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            return (
                <div className="card col-lg-12">
                    <div className="card-body">
                        <h4><Badge pill variant="primary">
                                No existe ropa para esta categoria o no esta disponible
                            </Badge></h4>
                        <blockquote className="blockquote mb-0">
                            Catbol
                        </blockquote>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <>
            <Navigation/>
            <div className="container mt-5">
                    <div className="row">
                    {this.renderClothing()}
                    </div>
            </div>
            </>
        )
    }
}
