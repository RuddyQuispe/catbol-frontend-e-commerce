import React, { Component } from 'react'
import Navigation from '../Partials/Navigation';
import axios from 'axios';
import Chart from 'chart.js';
//import Button from 'react-bootstrap/Button';
import jspdf from 'jspdf';

export default class InventoryManage extends Component {
    
    state = {
        list_inventory : []
    }

    chartRef = React.createRef();

    async componentDidMount(){
        const response = await axios.get('http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/inventory_shopping_manage/inventory_manage');
        this.setState({
            list_inventory : response.data
        });
        let arrayClothing = [];
        let arrayStock = [];
        let array = this.state.list_inventory.list_inventory;
        console.log(array.list_inventory);
        for (let index = 0; index < array.length; index++) {
            arrayClothing.push(`${array[index].description} Color: ${array[index].color} Size ${array[index].description_size}`);
            arrayStock.push(array[index].stock);
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: arrayClothing,
                datasets: [
                    {
                        label: "Stock Available",
                        data: arrayStock,
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

    jsPDFGenerate = () => {
        //new Document
        var doc = new jspdf();
        const tableColumn = ["Prenda Vestir", "Color", "Talla", "Stock"];
        var tableRows = [];
        var list = this.state.list_inventory;
        console.log(list);
        for (let index = 0; index < list.length; index++) {
            var clothing = [
                list[index].description,
                list[index].color,
                list[index].description_size,
                list[index].stock,
            ];
            // push each tickcet's info into a row
            tableRows.push(clothing);
        }
        console.log(tableRows);
        doc.text(`${tableColumn} ${tableRows}`, 10, 10)
        doc.text("Closed tickets within the last one month.", 14, 15);
        doc.save("ReportInventory.pdf");
    }
    
    render() {
        return (
            <>
                <Navigation/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card card-body card card-deck card-outline">
                                <h3>Inventario de Almacén</h3>
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
