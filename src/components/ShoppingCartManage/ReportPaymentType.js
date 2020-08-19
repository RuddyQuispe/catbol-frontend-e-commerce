import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Chart from 'chart.js';

export default class ReportPaymentType extends Component {
    state = {
        list_report : [],
        draw_report : 'pie'
    }

    chartRef = React.createRef();

    async componentDidMount(){
        await this.makeReport();
    }

    async makeReport(){
        const response = await axios.get('http://localhost:4000/shopping_cart_manage/report_payment');
        this.setState({
            list_report : response.data
        });
        let arrayType = ['Pago por Web', 'Pago por Entrega Delivery'];
        let arrayPaymentCount = [];
        let array = this.state.list_report;
        console.log(array);
        arrayPaymentCount.push(array[0].payment_web);
        arrayPaymentCount.push(array[0].payment_delivery);
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: this.state.draw_report,
            data: {
                //Bring in data
                labels: arrayType,
                datasets: [
                    {
                        label: "Cantidad de Compras por Web o en Entrega",
                        data: arrayPaymentCount,
                        backgroundColor : ["#"+((1<<24)*Math.random()|0).toString(16),"#"+((1<<24)*Math.random()|0).toString(16)],
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <>
            <Navigation/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-10">
                        <div className="card card-body card-secondary card-outline">
                            <h3>Reporte de Formas de Pago</h3><br/>
                            <canvas
                                id="myChart"
                                ref={this.chartRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
