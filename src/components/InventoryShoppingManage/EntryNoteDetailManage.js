import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EntryNoteDetailManage extends Component {

    state = {
        list_entry_detail : [],
        options_clothing: [],
        options_size : [],
        code_clothing : 1,
        id_size : 1,
        quantity : 0
    }

    async componentDidMount() {
        await this.getListEntryDetailAndOptionsClothingSize();
    }

    async getListEntryDetailAndOptionsClothingSize(){
        const response = await axios.get(`http://localhost:4000/inventory_shopping_manage/entry_note_manage/detail/${this.props.match.params.entry_no}`);
        this.setState({
            list_entry_detail: response.data.list_entry_detail,
            options_clothing: response.data.options_clothing,
            options_size : response.data.options_size
        })
    }

    renderEntryDetailNote(){
        return this.state.list_entry_detail.map(entry_detail => {
            return (
                <tr key={entry_detail.id_detail}>
                    <td>{entry_detail.id_detail}</td>
                    <td><b>Description: </b>{entry_detail.description} <b>Color: </b>{entry_detail.color} <b>Size: </b> {entry_detail.description_size}</td>
                    <td>{entry_detail.quantity}</td>
                    <td>
                        <Button variant="outline-danger" onClick={() => this.deleteDetailEntryNote(entry_detail.id_detail)}>
                            Eliminar
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    renderOptionsClothing(){
        return this.state.options_clothing.map(clothing => {
            return (
                <option key={clothing.code_clothing} value={clothing.code_clothing}>
                    {clothing.description} Color: {clothing.color}
                </option>
            )
        })
    }

    renderOptionsSize(){
        return this.state.options_size.map(size => {
            return (
                <option key={size.id} value={size.id}>
                    {size.description}
                </option>
            )
        })
    }

    onChangeClothing = (e) => {
        this.setState({
            code_clothing : e.target.value
        })
    }

    onChangeSize = (e) => {
        this.setState({
            id_size : e.target.value
        })
    }

    onChangeQuantity = (e) => {
        this.setState({
            quantity : e.target.value
        })
    }

    registerEntryDetail = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:4000/inventory_shopping_manage/entry_note_manage/detail/${this.props.match.params.entry_no}`,{
            id_tail : this.state.id_size, 
            code_clothing : this.state.code_clothing, 
            quantity : this.state.quantity
        });
        alert(response.data.message);
        await this.getListEntryDetailAndOptionsClothingSize();
    }

    async deleteDetailEntryNote(idDetail) {
        const response = await axios.delete(`http://localhost:4000/inventory_shopping_manage/entry_note_manage/detail/delete/${this.props.match.params.entry_no}/${idDetail}`);
        alert(response.data.message);
        await this.getListEntryDetailAndOptionsClothingSize();
    }

    render() {
        return (
            <>
              <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="card card-body card card-success card-outline">
                                <h3>Registrar Nuevo Detail</h3>
                                <form onSubmit={this.registerEntryDetail}>
                                    <div className="form-group">
                                        <label>Prenda de Vestir</label>
                                        <select className="form-control" value={this.state.code_clothing} onChange={this.onChangeClothing}>
                                            {this.renderOptionsClothing()}
                                        </select>
                                        <label>Talla de Ropa</label>
                                        <select className="form-control" value={this.state.id_size} onChange={this.onChangeSize}>
                                            {this.renderOptionsSize()}
                                        </select>
                                        <label>Cantidad</label>
                                        <input type="number" className="form-control" required min={1} onChange={this.onChangeQuantity}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card card-body card card-warning card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Prenda de Vestir</th>
                                            <th>Talla</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderEntryDetailNote()}
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
