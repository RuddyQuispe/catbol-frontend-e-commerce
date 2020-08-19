import React, { Component } from 'react';
import Navigation from '../Partials/Navigation';
import {Link} from 'react-router-dom';
//import NoImage from './no-image.png';
import axios from 'axios';

export default class ClothingManage extends Component {

    state = {
        image : '',
        description : '',
        characteristics : '',
        color : '',
        cost : 0,
        discount : 0,
        list_size : [],
        options_size: []
    }
    
    async componentDidMount(){
        await this.getListOptionsSize();
    }

    async getListOptionsSize(){
        const response = await axios.get('http://localhost:4000/clothing_manage/size_manage');
        this.setState({
            options_size : response.data.size_list
        });
    }

    renderSizeOptions () {
        return this.state.options_size.map(size => {
            return (
                <option key={size.id} value={size.id}>{size.description}</option>
            )
        })
    }

    handleChangeFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    onChangeCharacteristics = (e) => {
        this.setState({
            characteristics : e.target.value
        })
    }

    onChangeColor = (e) => {
        this.setState({
            color : e.target.value
        })
    }

    onChangeCost = (e) => {
        this.setState({
            cost : e.target.value
        })
    }

    onChangeDiscount = (e) => {
        this.setState({
            discount : e.target.value
        })
    }

    onChangeSize = (e) => {
        var array = this.state.list_size;
        array.push(e.target.value);
        this.setState({
            list_size: array
        });
    }

    registerClothing = async (e) => {
        e.preventDefault();
        if (this.state.list_size.length>0) {
            var fd = new FormData();
            var arraySize = this.state.list_size;
            fd.append('image', this.state.image);
            fd.append('description', this.state.description);
            fd.append('characteristics', this.state.characteristics);
            fd.append('color', this.state.color);
            fd.append('cost', this.state.cost);
            fd.append('discount', this.state.discount);
            fd.append('list_size', arraySize);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            console.log("sending data");
            let response = await axios.post('http://localhost:4000/clothing_manage/clothing_manage',fd, config);
            alert(response.data.message);
        } else {
            alert("Seleccione al menos una talla de Ropa");
        }
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="col-md-12">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Registrar Prenda de Vestir</h3>
                                <Link className="btn btn-secondary btn-sm" to={"/clothing_list"}>
                                    Lista de Prendas de Vestir
                                </Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.registerClothing}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                            <label>Descripción</label>
                                            <input type="text" className="form-control" onChange={this.onChangeDescription} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                            <label>Color</label>
                                            <input type="text" className="form-control" onChange={this.onChangeColor}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                            <label>Caracteriticas</label>
                                            <textarea className="form-control" rows={5} onChange={this.onChangeCharacteristics} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Costo</label>
                                                <input type="text" className="form-control" onChange={this.onChangeCost}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Descuento</label>
                                                <input type="text" className="form-control" onChange={this.onChangeDiscount}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Talla de Ropa </label>
                                            <input type="text" value={this.state.list_size} disabled/>
                                            <select className="form-control" onChange={this.onChangeSize}>
                                                {this.renderSizeOptions()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" className="form-control" onChange={this.handleChangeFile}/>
                                        <br/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        Registrar Prenda de Vestir
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>    
                </div>
            </>
        )
    }
}