import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Chart from 'chart.js';

export default class ReportSaleShopping extends Component {
    state = {
        list_report : [],
        draw_report : 'line'
    }

    chartRef = React.createRef();

    async componentDidMount(){
        await this.makeReport();
    }

    async makeReport(){
        const response = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/shopping_cart_manage/report_shopping_sale');
        this.setState({
            list_report : response.data
        });
        let arrayDate = [];
        let arrayCountSaleShopping = [];
        let array = this.state.list_report;
        for (let index = 0; index < array.length; index++) {
            arrayDate.push(`${(array[index].date_shopping).substring(0, (array[index].date_shopping).indexOf("T"))}`);
            arrayCountSaleShopping.push(array[index].count);
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: this.state.draw_report,
            data: {
                //Bring in data
                labels: arrayDate, //['30-05-2020','31-05-2020','1-06-2020','02-06-2020','03-06-2020','04-06-2020','05-06-2020','06-06-2020'],
                datasets: [
                    {
                        label: "Cantidad de Ventas Registradas",
                        data: arrayCountSaleShopping, //[2,3,9,5,5,6,2,1],
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
                            <h3>Reporte de Ventas por día</h3><br/>
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
