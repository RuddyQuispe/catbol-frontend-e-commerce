import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Main extends Component {

    state = {
        list_clothing : []
    }

    async componentDidMount(){
        await this.getListClothing();
    }

    async getListClothing(){
        const response = await axios.get('http://localhost:4000/shopping_cart_manage/shopping_manage');
        this.setState({
            list_clothing : response.data.clothing_list
        });
        console.log(response.data.clothing_list);
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
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary ">
                <div className="container">
                    <h5><b>CAT</b>BOL</h5>
                    <Link to="/login" className="ml-auto">
                        <span className="navbar-text">
                        <h5>Login</h5>
                        </span>
                    </Link>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row">
                {this.renderLisClothing()}
                </div>
            </div>
            </>
        )
    }
}
