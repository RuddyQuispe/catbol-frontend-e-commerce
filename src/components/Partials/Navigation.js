import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { FiShoppingCart } from 'react-icons/fi';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default class Navigation extends Component {

    state = {
        id: '',
        username: '',
        type: '',
        list_category : []
    }

    constructor(){
        super();
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        this.state.id = jsonUser.id;
        this.state.username = jsonUser.username;
        this.state.type = jsonUser.type;
    }

    async componentDidMount(){
        await this.getCategory();
    }

    async getCategory(){
        const response = await axios.get(`http://localhost:4000/clothing_manage/category_manage`);
        this.setState({
            list_category : response.data
        });
    }

    closeSession = (e) =>  {
        e.preventDefault();
        sessionStorage.removeItem("USER_AUTH");
        window.location.assign(`/login`)
    }

    renderCategory(){
        return this.state.list_category.map(category => {
            return (
                <NavDropdown.Item key={category.id_category} href={"/category/"+category.id_category}>{category.name}</NavDropdown.Item>
            )
        })
    }

    getClothingCount(){
        let jsonUser = JSON.parse(sessionStorage.getItem("SHOP_CART"));
        return jsonUser.list_shopping.length;
    }

    getClothingListStorage(){
        let jsonUser = JSON.parse(sessionStorage.getItem("SHOP_CART"));
        return jsonUser.list_shopping;
    }

    getDataUser(){
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        return jsonUser.id;
    }

    async ShoppingCartManage(){
        if (this.getClothingCount()>0) {
            const response = await axios.post(`http://localhost:4000/shopping_cart_manage/shopping_generate`,{
                ci_client : this.getDataUser(), 
                list_clothing : this.getClothingListStorage()
            });
            if (response.data.result) {
                alert(response.data.message);
                alert(response.data.cod_shopping_cart);
                window.location.assign(`/shopping_list/${response.data.cod_shopping_cart}`)
            }else{
                alert(response.data.message);
                window.location.assign(`/shopping_list/${response.data.cod_shopping_cart}`)
            }
        }else{
            alert("El carrito esta vacio");
        }
    }

    mainRender() {
        if (this.state.type==="Admin") {
            return (
                <>
                <Navbar.Brand href="/main_admin">Catbol</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Gestión de Inventario de Almacén y Usuario" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/user_manage">Gestionar Usuario</NavDropdown.Item>
                            <NavDropdown.Item href="/provider_manage">Gestionar Proveedor</NavDropdown.Item>
                            <NavDropdown.Item href="/entry_note_manage">Gestionar Nota de Ingreso</NavDropdown.Item>
                            <NavDropdown.Item href="/inventory_manage">Administrar Inventario</NavDropdown.Item>
                            <NavDropdown.Item href="/bitacora_manage">Administrar Bitacora</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Gestion de Prendas de Vestir y Ofertas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/clothing_manage">Gestionar Prenda de Vestir</NavDropdown.Item>
                            <NavDropdown.Item href="/category_manage">Gestionar Categoría</NavDropdown.Item>
                            <NavDropdown.Item href="/size_manage">Gestionar Talla de Ropa</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Gestión de Comercio Electrónico y Entrega a Domicilio" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/client_user_manage">Administración de Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="/coupon_manage">Gestion de Cupón</NavDropdown.Item>
                            <NavDropdown.Item href="/delivery_staff_manage">Gestión de Personal Delivery</NavDropdown.Item>
                            <NavDropdown.Item href="/report_client_frequent">Reporte Clientes Frecuentes</NavDropdown.Item>
                            <NavDropdown.Item href="/report_type_payment">Reporte Formas de Pago</NavDropdown.Item>
                            <NavDropdown.Item href="/report_shopping_sale">Reporte Ventas</NavDropdown.Item>
                            <NavDropdown.Item href="/sale_note_admin">Administrar Notas de Ventas</NavDropdown.Item>
                            <NavDropdown.Item href="/invoice_manage">Gestionar Facturas</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="ml-auto">
                    <Nav.Link><button className="btn btn-sm" onClick={this.closeSession}>
                        Sign out
                    </button></Nav.Link>
                    <Navbar.Text className="text-dark">
                    Signed in as: {this.state.username} [{this.state.type}]
                    </Navbar.Text>
                </Navbar.Collapse>
               </> 
            )
        }else{
            return (
                <>
                <Navbar.Brand href="/main_shopping">Catbol</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Categoría" id="basic-nav-dropdown">
                            {this.renderCategory()}
                        </NavDropdown>
                        <Nav.Link href="/get_coupon" > Obtener Cupón de Oferta</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="outline-primary" title="Gestionar Carrito de Compras" onClick={() => this.ShoppingCartManage()}>
                                <FiShoppingCart/>
                                <Badge pill variant="primary">
                                    {this.getClothingCount()}
                                </Badge>
                            </Button>
                            <Nav.Link href="/" >Sign out</Nav.Link>
                            <Navbar.Text className="text-primary">
                            Signed in as: {this.state.username} [{this.state.type}]
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Navbar.Collapse>
                </>
            )
        }
    }

    render() {
        return(
            <div>
                <Navbar bg="light" variant="light" expand="lg" sticky="top">
                    <div className="container">
                        {this.mainRender()}
                    </div>
                </Navbar>
            </div>
        )
    }
}
