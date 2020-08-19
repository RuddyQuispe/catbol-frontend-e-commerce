import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class EntryNoteManage extends Component {
    
    state = {
        list_note : [],
        options_provider : [],
        description : '',
        date: new Date(),
        id_provider : 1
    }

    async componentDidMount(){
        await this.getListEntryNoteAndProviders();
    }

    async getListEntryNoteAndProviders(){
        const response = await axios.get('http://localhost:4000/inventory_shopping_manage/entry_note_manage');
        this.setState({
            list_note : response.data.entryNoteList,
            options_provider : response.data.getOptionsProvider
        });
    }

    renderEntryNotes(){
        return this.state.list_note.map(entry_note => {
            return (
                <tr key={entry_note.no_entry}>
                    <td>{entry_note.no_entry}</td>
                    <td>{entry_note.description}</td>
                    <td>{(entry_note.date_note).substring(0, (entry_note.date_note).indexOf("T"))}</td>
                    <td>{entry_note.username}</td>
                    <td>{entry_note.name}</td>
                    <td>
                        <Link className="btn btn-primary" to={"/entry_note_manage/detail/"+entry_note.no_entry}>
                            Detalle de Ingreso
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    renderOptionsProvider(){
        return this.state.options_provider.map(provider => {
            return (
                <option key={provider.ci_nit} value={provider.ci_nit}>{provider.name}</option>
            )
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    
    onChangeDate = (e) => {
        this.setState({
            date : e.target.value
        })
    }

    onChangeProvider = (e) => {
        this.setState({
            id_provider : e.target.value
        })
    }

    registerEntryNote = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/inventory_shopping_manage/entry_note_manage',{
            description : this.state.description,
            date_note : this.state.date, 
            id_user : JSON.parse(sessionStorage.getItem("USER_AUTH")).id,
            id_provider : this.state.id_provider
        });
        alert(response.data.message);
        await this.getListEntryNoteAndProviders();
    }

    render() {
        return (
            <>
              <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card card-body card card-danger card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Descripción</th>
                                            <th>Fecha</th>
                                            <th>Usuario</th>
                                            <th>Proveedor</th>
                                            <th>Detalle Ingreso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderEntryNotes()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card card-body card card-danger card-outline">
                                <h3>Registrar Nota de Ingreso</h3>
                                <form onSubmit={this.registerEntryNote}>
                                    <div className="form-group">
                                        <label>Descripcion Nota</label>
                                        <input type="text" className="form-control" onChange={this.onChangeDescription} />
                                        <label>Fecha</label>
                                        <input type="date" className="form-control" onChange={this.onChangeDate} />
                                    </div>
                                    <div className="form-group">
                                        <label>Proveedor Asignar</label>
                                        <select className="form-control" value={this.state.id_provider} onChange={this.onChangeProvider}>
                                            {this.renderOptionsProvider()}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Guardar
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
