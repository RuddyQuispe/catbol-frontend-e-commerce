import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class SizeManage extends Component {

    state = {
        list_size : [],
        description : ''
    }

    async componentDidMount(){
        await this.getListSize();
    }

    async getListSize(){
        const response = await axios.get('http://localhost:4000/clothing_manage/size_manage');
        this.setState({
            list_size : response.data.size_list
        })
    }

    renderSizeList(){
        return this.state.list_size.map(size => {
            return (
                <tr key={size.id}>
                    <td>{size.id}</td>
                    <td>{size.description}</td>
                </tr>
            )
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    registerSize = async (e) => {
        e.preventDefault();
        let response = await axios.post('http://localhost:4000/clothing_manage/size_manage', {
            size : this.state.description
        });
        alert(response.data.message);
        await this.getListSize();
    }

    render() {
        return (
            <>
                <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-body card card-info card-outline">
                                <h3>Register New Size Clothing</h3>
                                <form onSubmit={this.registerSize}>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" className="form-control" onChange={this.onChangeDescription} required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-success">
                                        <i className="fa fa-save"></i> Save
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card card-body card card-info card-outline">
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSizeList()}
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
