import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ClothingList extends Component {

    state = {
        list_clothing : []
    }

    async componentDidMount (){
        await this.getLisClothing();
    }

    async getLisClothing(){
        const response = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/clothing_manage/clothing_manage');
        this.setState({
            list_clothing : response.data.clothing_list
        });
    }

    enableDisable = async (code_clothing) => {
        const response = await axios.post(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/clothing_manage/clothing_manage/enable_disable`,{
            code_clothing : code_clothing
        });
        alert(response.data.message);
        await this.getLisClothing();
    } 

    renderClothing(){
        return this.state.list_clothing.map(clothing => {
            if (clothing.estatus) {
                return (
                    <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={350} width={300}/>
                            <div className="card-body">
                                <h4 className="card-title">{clothing.description_clothing}</h4>
                                <p className="card-text"><span className="badge badge-info">Talla: {clothing.size_clothing}</span><br/>{clothing.characterists} <br/> <b>Color: {clothing.color}</b> </p>
                                <span className="badge badge-success">Costo: {clothing.price}</span>
                                <span className="badge badge-secondary">Descuento: {clothing.discount}</span>
                                <span className="badge badge-primary">Stock: {clothing.stock}</span>
                                <br/>
                                <Link className="btn btn-outline-warning" to={"/clothing_update/"+clothing.code_clothing+"/"+clothing.id_size}>
                                    Editar
                                </Link>
                                <button type="button" className="btn btn-outline-danger" onClick={() => this.enableDisable(clothing.code_clothing)}>
                                    Deshabilitar
                                </button>
                                <Link className="btn btn-outline-info" to={"/clothing_group_manage/"+clothing.code_clothing}>
                                    Agregar prendas
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={350} width={300}/>
                            <div className="card-body">
                                <h4 className="card-title">{clothing.description_clothing}</h4>
                                <p className="card-text"><span className="badge badge-info">Talla: {clothing.size_clothing}</span><br/>{clothing.characterists} <br/> <b>Color: {clothing.color}</b> </p>
                                <span className="badge badge-success">Costo: {clothing.price}</span>
                                <span className="badge badge-secondary">Descuento: {clothing.discount}</span>
                                <span className="badge badge-primary">Stock: {clothing.stock}</span>
                                <br/>
                                <Link className="btn btn-outline-warning" to={"/clothing_update/"+clothing.code_clothing+"/"+clothing.id_size}>
                                    Editar
                                </Link>{}{}
                                <button type="button" className="btn btn-outline-success" onClick={() => this.enableDisable(clothing.code_clothing)}>
                                    Habilitar
                                </button>
                                <Link className="btn btn-outline-info" to={"/clothing_group_manage/"+clothing.code_clothing}>
                                    Agregar prendas
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        })
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
