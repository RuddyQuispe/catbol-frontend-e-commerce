import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CategoryManage extends Component {

    state = {
        list_category : [],
        name : '',
        description : '',
        type_category : true
    }

    async componentDidMount(){
        await this.getListCategory();
    }

    async getListCategory(){
        const response = await axios.get('http://localhost:4000/clothing_manage/category_manage');
        this.setState({
            list_category : response.data
        })
    }

    onChangeName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    onChangeType = (e) => {
        this.setState({
            type_category : e.target.value
        });
    }

    async handlerEnableDisableCategory(idCategory){
        const response = await axios.post('http://localhost:4000/clothing_manage/category_manage/enable_disable',{
            id_category : idCategory
        });
        alert(response.data.message);
        await this.getListCategory();
    }

    renderCategory(){
        return this.state.list_category.map(category => {
            if (category.status) {
                if (category.type) {
                    return (
                        <tr key={category.id_category}>
                            <td>{category.id_category}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td><span className="badge badge-info">Categoría</span></td>
                            <td><Button variant="danger" onClick={() => this.handlerEnableDisableCategory(category.id_category)} >Inhabilitar</Button></td>
                            <td><Link className="btn btn-secondary" to={"/category_add_clothing/"+category.id_category} ><i className="fa fa-tshirt"></i> Agregar Ropa</Link></td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={category.id_category}>
                            <td>{category.id_category}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td><span className="badge badge-warning">Promoción</span></td>
                            <td><Button variant="danger" onClick={() => this.handlerEnableDisableCategory(category.id_category)} >Inhabilitar</Button></td>
                            <td><Link className="btn btn-secondary" to={"/category_add_clothing/"+category.id_category} ><i className="fa fa-tshirt"></i> Agregar Ropa</Link></td>
                        </tr>
                    )
                }
            }else{
                if (category.type) {
                    return (
                        <tr key={category.id_category}>
                            <td>{category.id_category}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td><span className="badge badge-info">Categoria</span></td>
                            <td><Button variant="success" onClick={() => this.handlerEnableDisableCategory(category.id_category)} >Habilitar</Button></td>
                            <td><Link className="btn btn-secondary" to={"/category_add_clothing/"+category.id_category} ><i className="fa fa-tshirt"></i> Agregar Ropa</Link></td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={category.id_category}>
                            <td>{category.id_category}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td><span className="badge badge-warning">Promoción</span></td>
                            <td><Button variant="success" onClick={() => this.handlerEnableDisableCategory(category.id_category)} >Habilitar</Button></td>
                            <td><Link className="btn btn-secondary" to={"/category_add_clothing/"+category.id_category} ><i className="fa fa-tshirt"></i> Agregar Ropa</Link></td>
                        </tr>
                    )
                }
            }
        })
    }

    handlerRegisterCategory = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhlocalhostost:4000/clothing_manage/category_manage',{
            name : this.state.name, 
            description : this.state.description, 
            type : this.state.type_category
        });
        alert(response.data.message);
        await this.getListCategory();
    }

    render() {
        return (
            <>
                <Navigation/> 
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card card-danger card-outline">
                                <h3>Registrar Categoria</h3>
                                <form onSubmit={this.handlerRegisterCategory}>
                                    <div className="form-group">
                                        <label>nombre</label>
                                        <input type="text" className="form-control" onChange={this.onChangeName} required/>
                                        <label>descripción</label>
                                        <input type="text" className="form-control" onChange={this.onChangeDescription} required/>
                                        <div className="form-group">
                                            <label>Selecciona el tipo de categoría</label>
                                            <select className="form-control" value={this.state.type_category} onChange={this.onChangeType}>
                                                <option value="true">Categoria</option>
                                                <option value="false">Promoción</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body card card-danger card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Tipo</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCategory()}
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
