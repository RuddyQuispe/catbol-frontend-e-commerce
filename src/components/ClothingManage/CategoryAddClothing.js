import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default class CategoryAddClothing extends Component {

    state = {
        code_category : this.props.match.params.code_category,
        description : '',
        name : '',
        status : '',
        type : '',
        clothing_list : []
    }

    async componentDidMount(){
        await this.getListData();
    }

    async getListData(){
        const response = await axios.get(`http://localhost:4000/clothing_manage/category_manage/add_clothing_category/${this.props.match.params.code_category}`);
        this.setState({
            description : response.data.category_data.description,
            name : response.data.category_data.name,
            status : response.data.category_data.status,
            type : response.data.category_data.type,
            clothing_list : response.data.clothing_list
        })
    }

    renderStatusAndType(){
        if (this.state.status) {
            if (this.state.type) {
                return(
                    <>
                    <Badge pill variant="success">
                        <b>Estado:</b> Habilitado
                    </Badge>
                    <Badge pill variant="info">
                        <b>Tipo:</b> Categoria
                    </Badge>
                    </>
                )
            } else {
                return (
                    <>
                    <Badge pill variant="success">
                        <b>Estado:</b> Habilitado
                    </Badge>
                    <Badge pill variant="info">
                        <b>Tipo:</b> Promoción
                    </Badge>
                    </>
                )
            }
        }else{
            if (this.state.type) {
                return(
                    <>
                    <Badge pill variant="danger">
                        <b>Estado:</b> Inhabilitado
                    </Badge>
                    <Badge pill variant="info">
                        <b>Tipo:</b> Categoria
                    </Badge>
                    </>
                )
            } else {
                return (
                    <>
                    <Badge pill variant="danger">
                        <b>Estado:</b> Inhabilitado
                    </Badge>
                    <Badge pill variant="info">
                        <b>Tipo:</b> Promoción
                    </Badge>
                    </>
                )
            }
        }
    }

    async handlerRegisterClothingCategory(codeClothing){
        const response = await axios.post(`http://localhost:4000/clothing_manage/category_manage/add_clothing_category/${this.state.code_category}`,{
            code_clothing : codeClothing
        });
        alert(response.data.message);
        await this.getListData();
    }

    async handlerRemoveClothingCategory(codeClothing){
        const response = await axios.post(`http://localhost:4000/clothing_manage/category_manage/remove_clothing_category/${this.state.code_category}`,{
            code_clothing : codeClothing
        });
        alert(response.data.message);
        await this.getListData();
    }

    getButtonAction(status, codeClothing){
        if (status) {
            return (
                <Button variant="danger" onClick={() => this.handlerRemoveClothingCategory(codeClothing)} >
                    Eliminar de la Categoria a la Categoría
                </Button>
            )
        }else{
            return (
                <Button variant="success" onClick={() => this.handlerRegisterClothingCategory(codeClothing)}>
                    Agregar a la Categoría
                </Button>
            )
        }
    }

    renderClothingList() {
        return  this.state.clothing_list.map(clothing => {
            if (clothing.estatus) {
                return (
                    <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={300} width={300}/>
                            <div className="card-body">
                                <Badge pill variant="info">
                                    <b>Código: </b>{clothing.code_clothing}
                                </Badge>
                                <h4 className="card-title">{clothing.description}</h4>
                                <p className="card-text">{clothing.characterists}<br/><b>Color: {clothing.color}</b><br/>
                                <Badge pill variant="success">
                                    <b>Estado:</b> Habilitado
                                </Badge></p>
                            </div>
                            <div className="card-footer">
                                {this.getButtonAction(clothing.container_clothing, clothing.code_clothing)}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-md-3">
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={300} width={300}/>
                            <div className="card-body">
                                <Badge pill variant="info">
                                    <b>Código: </b>{clothing.code_clothing}
                                </Badge>
                                <h4 className="card-title">{clothing.description}</h4>
                                <p className="card-text">{clothing.characterists}<b>Color: {clothing.color}</b>
                                <Badge pill variant="danger">
                                    <b>{ }Estado:</b> Inhabilitado
                                </Badge>
                                </p>
                            </div>
                            <div className="card-footer">
                                {this.getButtonAction(clothing.container_clothing, clothing.code_clothing)}
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
                        <div className="card col-lg-12">
                            <div className="card-body">
                                <h4><Badge pill variant="primary">
                                        Código Categoría: {this.state.code_category}
                                    </Badge></h4>
                                <blockquote className="blockquote mb-0">
                                    <p><b>Nombre: </b> {this.state.name}</p>
                                    <p><b>Descripción: </b> {this.state.description}</p>
                                    <h4>{this.renderStatusAndType()}</h4>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        {this.renderClothingList()}
                    </div>
                </div>
            </>
        )
    }
}
