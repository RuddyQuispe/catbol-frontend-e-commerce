import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export default class ShoppingList extends Component {

    subtotal = 0;

    state = {
        cod_shopping_cart : this.props.match.params.code_shop,
        shopping_list : []
    }

    async componentDidMount(){
        await this.getList();
    }

    async getList(){
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/shopping_list/${this.state.cod_shopping_cart}`);
        this.setState({
            shopping_list : response.data
        })
    }

    async removeClothingShopping(codeClothing, idSize){
        const response = await axios.post('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/shopping_list/remove',{
            code_clothing : codeClothing,
            id_size : idSize,
            code_shopping : this.state.cod_shopping_cart
        });
        alert(response.data.message);
        await this.getList();
    }

    confirmSaleShopping(){
        window.location.assign(`/sale_note_manage/${this.state.cod_shopping_cart}`);
    }

    renderShoppingList(){
        return this.state.shopping_list.map(shopping => {
            return (
                <tr key={`${shopping.code_clothing}-${shopping.size_clothes}`}>
                    <td>{shopping.code_clothing}</td>
                    <td>{shopping.description}</td>
                    <td>{shopping.size_clothes}</td>
                    <td>
                        <img className="img-fluid" src={shopping.image_name} alt="clothing shopping" height={50} width={50}/>
                    </td>
                    <td>{shopping.price}</td>
                    <td>{shopping.discount}</td>
                    <td>{shopping.quantity}</td>
                    <td>{shopping.subtotal}</td>
                    <td>
                        <Button variant="outline-secondary" onClick={() => this.removeClothingShopping(shopping.code_clothing, shopping.id)}>
                            Quitar del carrito
                        </Button>
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
                        <div className="col-lg-4">
                            <div className="card card-body card-primary card-outline">
                                <div className="card-footer">
                                    <h3>Detalles</h3>
                                    Costo del envío : 100% Gratis <br/> <br/>
                                    <button type="submit" className="btn btn-primary btn-block btn-success" onClick={()=> this.confirmSaleShopping()}>
                                        <i className="fa fa-shopping-bag"></i> Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card card-body card-primary card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Descripción</th>
                                            <th>Talla</th>
                                            <th>Image</th>
                                            <th>Precio</th>
                                            <th>Descuento</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderShoppingList()}
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
