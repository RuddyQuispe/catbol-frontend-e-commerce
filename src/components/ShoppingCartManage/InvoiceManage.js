import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class InvoiceManage extends Component {

    state = {
        list_invoice : []
    }

    async componentDidMount(){
        await this.getListInvoiceManage();
    }

    async getListInvoiceManage(){
        const response = await axios.get(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/invoice_manage`);
        console.log(response.data);
        this.setState({
            list_invoice : response.data
        });
    }

    getStatusSaleInvoice(status){
        if (status) {
            return (
                <span className="badge bg-success-gradient">Conclido</span>
            )
        } else {
            return (
                <span className="badge bg-warning-gradient">En Proceso</span>
            )
        }
    }

    renderInvoiceList(){
        return this.state.list_invoice.map(invoice => {
            return (
                <tr key={invoice.invoice_no}>
                    <td>{invoice.invoice_no}</td>
                    <td>{`${invoice.first_name} ${invoice.last_name}`}</td>
                    <td>{invoice.total_cost}</td>
                    <td>{invoice.iva_tax}</td>
                    <td>{(invoice.send_cost)? invoice.send_cost : 'Gratis'}</td>
                    <td>{invoice.name}</td>
                    <td>{this.getStatusSaleInvoice(invoice.status_sale)}</td>
                    <td>
                        <button className="btn btn-outline-secondary btn-block btn-sm" onClick={() => this.invoicePDFGenerate(invoice.invoice_no)}>
                            <i className="fa fa-file-pdf"></i> Generar Factura
                        </button>
                        <a className="btn btn-sm btn-outline-primary btn-block" href={`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/pdf/${invoice.invoice_no}`}>Obtener Factura</a>
                    </td>
                </tr>
            )
        })
    }

    async invoicePDFGenerate(invoiceNo){
        await axios.post(`http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/invoice_manage_generate/print`, {
            invoice_no : invoiceNo
        });
        alert("Generado correctamente");
    }

    getStateTable(){
        if (this.state.list_invoice.length>0) {
            return (
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th># Factura</th>
                            <th>Nombre Cliente</th>
                            <th>Costo Total</th>
                            <th>IVA</th>
                            <th>Costo de Envío</th>
                            <th>Responsable Delivery</th>
                            <th>Estado Venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderInvoiceList()}
                    </tbody>
                </Table>
            )
        } else {
            return(
                <div className="card-footer">
                    <h3>No hay Facturas en el sistema aun</h3>
                </div>
            )
        }
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-body card-primary card-outline">
                                <h3>Gestion de Facturación</h3>
                                {this.getStateTable()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
