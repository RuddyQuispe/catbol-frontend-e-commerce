import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';

export default class UpdateClothing extends Component {

    state = {
        clothing_code : this.props.match.params.clothing_code,
        id_size : this.props.match.params.id_size,
        new_description : '',
        new_characteristics : '',
        new_color : '',
        new_price : 0,
        new_discount : 0,
        image : ''
    }

    async componentDidMount () {
        await this.getDataClothing();
    }

    async getDataClothing (){
        const response = await axios.get(`http://localhost:4000/clothing_manage/clothing_manage/${this.props.match.params.clothing_code}/${this.props.match.params.id_size}`);
        this.setState({
            new_description : response.data.data_clothing.description,
            new_characteristics : response.data.data_clothing.characterists,
            new_color : response.data.data_clothing.color,
            new_price : response.data.data_clothing.price,
            new_discount : response.data.data_clothing.discount
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            new_description : e.target.value
        })
    }
    
    onChangeCharacteristics = (e) => {
        this.setState({
            new_characteristics : e.target.value
        })
    }

    onChangeColor = (e) => {
        this.setState({
            new_color : e.target.value
        })
    }

    onChangePrice = (e) => {
        this.setState({
            new_price : e.target.value
        })
    }

    onChangeDiscount = (e) => {
        this.setState({
            new_discount : e.target.value
        })
    }

    handleChangeFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    handlerUpdateClothing = async (e) => {
        e.preventDefault();
        var fd = new FormData();
        fd.append('image', this.state.image);
        fd.append('description', this.state.new_description, );
        fd.append('characteristics', this.state.new_characteristics, );
        fd.append('color', this.state.new_color, );
        fd.append('cost', this.state.new_price, );
        fd.append('discount', this.state.new_discount);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log("sending data");
        let response = await axios.put(`http://localhost:4000/clothing_manage/clothing_manage/${this.state.clothing_code}/${this.state.id_size}`, fd, config);
        alert(response.data.message);
    }

    render() {
        return (
            <>
                <Navigation></Navigation>
                <div className="container mt-5 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Modificar Prenda de Vestir</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handlerUpdateClothing}>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <input type="text" className="form-control" value={this.state.new_description} onChange={this.onChangeDescription} required />
                                    <label>Caracteristicas</label>
                                    <input type="text" className="form-control" value={this.state.new_characteristics} onChange={this.onChangeCharacteristics} required />
                                    <label>Color</label>
                                    <input type="text" className="form-control" value={this.state.new_color} onChange={this.onChangeColor} required />
                                    <label>Precio</label>
                                    <input type="number" className="form-control" value={this.state.new_price} onChange={this.onChangePrice} required />
                                    <label>Descuento</label>
                                    <input type="number" className="form-control" value={this.state.new_discount} onChange={this.onChangeDiscount} required />
                                </div>
                                <div className="custom-file">
                                    <input type="file" className="form-control" onChange={this.handleChangeFile} required/>
                                    <br/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block btn-success">
                                    Actualizar
                                </button>
                                <button type="danger" className="btn btn-danger btn-block" onClick={this.goBack}>
                                    Cancelar Cambios
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="center">
                                Allow me catbol
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
