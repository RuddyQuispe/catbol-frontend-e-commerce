import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import axios from 'axios';

export default class ClothingGroupAssign extends Component {

    state = {
        code_clothing: this.props.match.params.code_clothing,
        image_name: '',
        description: '',
        characteristics: '',
        color: '',
        status: '',
        list_clothing: [],
        list_code_clothing_to_add: []
    }

    async componentDidMount() {
        await this.getListAndData();
    }

    async getListAndData() {
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/clothing_manage/clothing_group_manage/${this.props.match.params.code_clothing}`);
        this.setState({
            image_name: response.data.clothing_data.image_name,
            description: response.data.clothing_data.description,
            characteristics: response.data.clothing_data.characterists,
            color: response.data.clothing_data.color,
            status: response.data.clothing_data.estatus,
            list_clothing: response.data.list_clothing_group
        })
    }

    getStatusClothing() {
        if (this.state.status) {
            return (
                <span className="badge badge-success">Habilitado</span>
            )
        } else {
            return (
                <span className="badge badge-danger">Inhabilitado</span>
            )
        }
    }

    handlerAddClothing(codeClothing) {
        var array = this.state.list_code_clothing_to_add;
        console.log(codeClothing);
        array.push(codeClothing);
        this.setState({
            list_code_clothing_to_add: array
        })
    }

    async registerClothing() {
        const array = this.state.list_code_clothing_to_add;
        array.sort();
        const response = await axios.post(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/clothing_manage/clothing_group_manage/${this.state.code_clothing}`, {
            list_code_clothing: array
        });
        alert(response.data.message);
    }

    renderClothingOptions() {
        return this.state.list_clothing.map(clothing => {
            if (clothing.estatus) {
                return (
                    <div className="col-md-3" key={clothing.code_clothing}>
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={350} width={300} />
                            <div className="card-body">
                                <span className="badge badge-secondary">Cod. {clothing.code_clothing}</span>
                                <h4 className="card-title">
                                    {clothing.description}</h4>
                                <p className="card-text">{clothing.characterists} <br /> <b>Color: {clothing.color}
                                    <br /><span className="badge badge-success">Habilitado</span></b> </p>
                                <button type="button" className="btn btn-info btn-sm" onClick={() => this.handlerAddClothing(clothing.code_clothing)}>
                                    Adicionar al Conjunto
                                </button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-md-3" key={clothing.code_clothing}>
                        <div className="card">
                            <img className="card-img-top" src={clothing.image_name} alt="clothing show" height={350} width={300} />
                            <div className="card-body">
                                <span className="badge badge-secondary">Cod. {clothing.code_clothing}</span>
                                <h4 className="card-title">
                                    {clothing.description}</h4>
                                <p className="card-text">{clothing.characterists} <br /> <b>Color: {clothing.color} <br />
                                    <span className="badge badge-danger">Inhabilitado</span><br /></b> </p>
                                <button type="button" className="btn btn-info btn-sm" onClick={() => this.handlerAddClothing(clothing.code_clothing)}>
                                    Adicionar al Conjunto
                                </button>
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
                <Navigation />
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <img className="card-img-top" src={this.state.image_name} alt="clothing show" height={350} width={300} />
                                <div className="card-body">
                                    <h4 className="card-title">{this.state.description}</h4>
                                    <span className="badge badge-success">Codigo: {this.state.code_clothing}</span>
                                    {this.getStatusClothing()}
                                    <p className="card-text">{this.state.characteristics} <br /> <b>Color: {this.state.color}</b></p>
                                    <span className="badge badge-primary">Prendas Agregadas al Conjunto: {(this.state.list_code_clothing_to_add).toString()}</span>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.registerClothing()}>
                                        Registrar Prendas de Vestir
                                </button>
                                </div>
                            </div>
                        </div>
                        {this.renderClothingOptions()}
                    </div>
                </div>
            </>
        )
    }
}
