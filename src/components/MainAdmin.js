import React, { Component } from 'react'
import Navigation from '../components/Partials/Navigation';
import {Link} from 'react-router-dom';

export default class MainAdmin extends Component {

    getUserName(){
        let jsonUser = JSON.parse(sessionStorage.getItem("USER_AUTH"));
        return jsonUser.username;
    }

    render() {
        return (
            <>
                <Navigation></Navigation>
                <div className="container mt-5">
                    <div className="container-fluid">
                        <div className="card-body card-deck card-outline">
                            <div className="col-lg-4">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h5>Gestion de </h5>
                                        <h5>Inventario de Almacén y Usuario</h5>
                                        <br/>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <div className="button-a-mobile-collapsed">
                                        <Link type="button" className="btn btn-warning btn-block btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                        <ul className="dropdown-menu bg bg-warning">
                                            <li>
                                            <Link to={"/user_manage"}>
                                                Gestionar Usuario
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/provider_manage"}>
                                                Gestionar Proveedor
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/entry_note_manage"}>
                                                Gestión de Nota de Ingreso
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/inventory_manage"}>
                                                Administrar Inventario de Almacén
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/"}>
                                                Administrar Bitacora
                                            </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h5>Gestion de</h5>
                                        <h5>Prendas de Vestir y Ofertas</h5>
                                        <br/>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-tshirt" />
                                    </div>
                                    <div className="button-a-mobile-collapsed">
                                        <Link type="button" className="btn btn-danger btn-block btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                        <ul className="dropdown-menu bg bg-danger">
                                            <li>
                                            <Link to={"/clothing_manage"}>
                                                Gestionar Prenda de Vestir
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/category_manage"}>
                                                Gestionar Categoria de Producto
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/size_manage"}>
                                                Gestionar Talla de Ropa de Vestir
                                            </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h4>Gestión de Comercio</h4>
                                        <p>Electrónico y Entrega a Domicilio</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-ios-cart" />
                                    </div>
                                    <div className="button-a-mobile-collapsed">
                                        <Link type="button" className="btn btn-success btn-block btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                        <ul className="dropdown-menu bg bg-success">
                                            <li>
                                            <Link to={"/client_user_manage"}>
                                                Administrar de Cliente Usuario
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/coupon_manage"}>
                                                Gestionar Cupón
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/delivery_staff_manage"}>
                                                Gestionar Personal Delivery
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/report_client_frequent"}>
                                                Reporte Clientes Frecuentes
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/report_type_payment"}>
                                                Reporte de Tipos de Pago
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/report_shopping_sale"}>
                                                Reporte de Ventas
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/sale_note_admin"}>
                                                Administrar Notas de Ventas
                                            </Link>
                                            </li>
                                            <li>
                                            <Link to={"/invoice_manage"}>
                                                Gestionar Facturas
                                            </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Bienvenido {this.getUserName()}</h4>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>proyecto e-commerce individual</p>
                                        <footer className="blockquote-footer">
                                            Enlace de repositorio de Backend: {}{}
                                            <cite title="Source Title">
                                                <p className="btn btn-outline-dark btn-xs btn-sm">
                                                Github : https://github.com/RuddyQuispe/e-comerce-catbol-backend.git
                                                </p>
                                            </cite>
                                        </footer>
                                        <footer className="blockquote-footer">
                                            Enlace de repositorio de Frontend: {}
                                            <cite title="Source Title">
                                                <p className="btn btn-outline-dark btn-xs btn-sm">
                                                Github : https://github.com/RuddyQuispe/e-comerce-catbol-frontend.git
                                                </p>
                                            </cite>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
