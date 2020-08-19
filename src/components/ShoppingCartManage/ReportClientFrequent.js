import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Chart from 'chart.js';

export default class ReportClientFrequent extends Component {

    state = {
        list_report : [],
        draw_report : 'doughnut'
    }

    chartRef = React.createRef();

    async componentDidMount(){
        await this.makeReport();
    }

    async makeReport(){
        const response = await axios.get('http://localhost:4000/shopping_cart_manage/report_clients_frequent');
        this.setState({
            list_report : response.data
        });
        let arrayClient = [];
        let arrayFrequent = [];
        let array = this.state.list_report;
        console.log(array);
        for (let index = 0; index < array.length; index++) {
            arrayClient.push(`CI: ${array[index].ci} Nombre: ${array[index].first_name} ${array[index].last_name}`);
            arrayFrequent.push(array[index].count_sale_note);
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: this.state.draw_report,
            data: {
                //Bring in data
                labels: arrayClient,
                datasets: [
                    {
                        label: "Cantidad de Compras",
                        data: arrayFrequent,
                        backgroundColor : "#"+((1<<24)*Math.random()|0).toString(16),
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
                            <h3>Reporte de Clientes Frecuentes</h3><br/>
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
