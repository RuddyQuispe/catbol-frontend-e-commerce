import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class BitacoraManage extends Component {

    state = {
        list_bitacora : [],
        index : 1
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:4000/inventory_shopping_manage/bitacora_manage');
        this.setState({
            list_bitacora : response.data
        })
    }

    renderBitacoraList(){
        return this.state.list_bitacora.map(bitacora => {
            return (
                <tr>
                    <td>{bitacora.username}</td>
                    <td>{bitacora.date}</td>
                    <td>{bitacora.activity}</td>
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
                        <div className="col-lg-10">
                            <div className="card card-body card-secondary card-outline">
                                <h3>Lista de Actividades</h3>
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>username</th>
                                            <th>fecha</th>
                                            <th>actividad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderBitacoraList()}
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
