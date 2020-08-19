import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './components/InventoryShoppingManage/Login';
import UserManage from './components/InventoryShoppingManage/UserManage';
import MainAdmin from './components/MainAdmin';
import MainShopping from './components/MainShopping';
import UserUpdate from './components/InventoryShoppingManage/UserUpdate';
import ProviderManage from './components/InventoryShoppingManage/ProviderManage';
import EntryNoteManage from './components/InventoryShoppingManage/EntryNoteManage';
import EntryNoteDetailManage from './components/InventoryShoppingManage/EntryNoteDetailManage';
import InventoryManage from './components/InventoryShoppingManage/InventoryManage.js';
import BitacoraManage from './components/InventoryShoppingManage/BitacoraManage';
import SizeManage from './components/ClothingManage/SizeManage';
import ClothingManage from './components/ClothingManage/ClothingManage';
import ClothingList from './components/ClothingManage/ClothingList';
import UpdateClothing from './components/ClothingManage/UpdateClothing';
import ClothingGroupAssign from './components/ClothingManage/ClothingGroupAssign';
import CategoryManage from './components/ClothingManage/CategoryManage';
import CategoryAddClothing from './components/ClothingManage/CategoryAddClothing';
import Main from './components/Main';
import ClientManage from './components/ShoppingCartManage/ClientManage';
import ClientRegister from './components/ShoppingCartManage/ClientRegister';
import RestoreAccount from './components/ShoppingCartManage/RestoreAccount';
import VerifyKey from './components/ShoppingCartManage/VerifyKey';
import NewPassword from './components/ShoppingCartManage/NewPassword';
import CouponManage from './components/ShoppingCartManage/CouponManage';
import DeliveryStaffManage from './components/ShoppingCartManage/DeliveryStaffManage';
import ReportClientFrequent from './components/ShoppingCartManage/ReportClientFrequent';
import ReportPaymentType from './components/ShoppingCartManage/ReportPaymentType';
import ReportSaleShopping from './components/ShoppingCartManage/ReportSaleShopping';
import CategoryShopping from './components/ShoppingCartManage/CategoryShopping';
import CuponGet from './components/ShoppingCartManage/CuponGet';
import ShoppingList from './components/ShoppingCartManage/ShoppingList';
import SaleNoteManage from './components/ShoppingCartManage/SaleNoteManage';
import InvoiceManage from './components/ShoppingCartManage/InvoiceManage';
import SaleNoteAdmin from './components/ShoppingCartManage/SaleNoteAdmin';

function App() {
  return (
    <Router>
        <Route path="/" exact component={Main} />
        <Route path="/main_shopping" exact component={MainShopping} />
        <Route path="/main_admin" exact component={MainAdmin} />
        <Route path="/login" exact component={Login} />
        <Route path="/user_manage" exact component={UserManage} />
        <Route path="/user_update/:id" exact component={UserUpdate} />
        <Route path="/provider_manage" exact component={ProviderManage} />
        <Route path="/entry_note_manage" exact component={EntryNoteManage} />
        <Route path="/entry_note_manage/detail/:entry_no" exact component={EntryNoteDetailManage} />
        <Route path="/inventory_manage" exact component={InventoryManage} />
        <Route path="/bitacora_manage" exact component={BitacoraManage} />
        <Route path="/size_manage" exact component={SizeManage} />
        <Route path="/clothing_manage" exact component={ClothingManage} />
        <Route path="/clothing_list" exact component={ClothingList} />
        <Route path="/clothing_update/:clothing_code/:id_size" exact component={UpdateClothing} />
        <Route path="/clothing_group_manage/:code_clothing" exact component={ClothingGroupAssign} />
        <Route path="/category_manage" exact component={CategoryManage} />
        <Route path="/category_add_clothing/:code_category" exact component={CategoryAddClothing} />
        <Route path="/client_user_manage" exact component={ClientManage} />
        <Route path="/register_my_account" exact component={ClientRegister} />
        <Route path="/restore_my_account" exact component={RestoreAccount} />
        <Route path="/verify_key" exact component={VerifyKey} />
        <Route path="/new_password_account/:email" exact component={NewPassword} />
        <Route path="/coupon_manage" exact component={CouponManage} />
        <Route path="/delivery_staff_manage" exact component={DeliveryStaffManage} />
        <Route path="/report_client_frequent" exact component={ReportClientFrequent} />
        <Route path="/report_type_payment" exact component={ReportPaymentType} />
        <Route path="/report_shopping_sale" exact component={ReportSaleShopping} />
        <Route path="/category/:id_category" exact component={CategoryShopping} />
        <Route path="/get_coupon" exact component={CuponGet} />
        <Route path="/shopping_list/:code_shop" exact component={ShoppingList} />
        <Route path="/sale_note_manage/:code_shopping" exact component={SaleNoteManage} />
        <Route path="/invoice_manage" exact component={InvoiceManage} />
        <Route path="/sale_note_admin" exact component={SaleNoteAdmin} />
    </Router>
  );
}

export default App;
