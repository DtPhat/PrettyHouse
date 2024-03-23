import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/home-page/HomePage";
import SignInPage from "./components/Authen/SignInPage";
import SignUpPage from "./components/Authen/SignUpPage";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/footer/Footer";
import Rooms from "./components/rooms/Rooms";
import Products from "./components/products/Products";
import Shop from "./components/shop/Shop";
import Momo from "./components/payment/Momo";
import DesignDetail from "./components/rooms/DesignDetail";
import Furniture from "./components/furniture/Furniture";
import AdminLayout from "./components/admin/AdminLayout";
import AccountsManagement from "./components/admin/AccountsManagement";
import FurnituresManagement from "./components/admin/FurnituresManagement";
import ColorsManagment from "./components/admin/ColorsManagment";
import MaterialsManagement from "./components/admin/MaterialsManagement";
import DesignsManagement from "./components/admin/DesignsManagement";
import ClientsManagement from "./components/admin/ClientsManagement";
import UpdateClients from "./components/admin/update/UpdateClients";
import CreateColors from "./components/admin/create/CreateColors";
import UpdateColors from "./components/admin/update/UpdateColors";
import CreateMaterials from "./components/admin/create/CreateMaterials";
import UpdateMaterials from "./components/admin/update/UpdateMaterials";
import UpdateAccount from "./components/admin/update/UpdateAccounts";
import SuccessPayment from "./components/payment/SuccessPayment";
import CreateFurnitures from "./components/admin/create/CreateFurnitures";
import UpdateFurniture from "./components/admin/update/UpdateFurnitures";
import CreateDesigns from "./components/admin/create/CreateDesigns";
import UpdateDesigns from "./components/admin/update/UpdateDesigns";
import RequestRefundManagement from "./components/admin/RequestRefundManagement";
import ContractsManagement from "./components/admin/ContractsManagement";
import UpdateContracts from "./components/admin/update/UpdateContracts";
import Cart from "./components/cart/Cart";
import Introduction from "./components/Navigation/Introduction";
import Policy from "./components/footer/Policy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateRequestRefund from "./components/admin/update/UpdateRequestRefund";
import Contracts from "./components/contracts/Contracts";
import ProtectedRoute from "./components/ProtectedRoute";
import Promotion from "./components/Navigation/Promotion";
import RefundOrderManagement from "./components/admin/RefundOrderManagement";
import RefundHistory from "./components/contracts/RefundHistory";
import RefundOrderDetail from "./components/admin/detail/RefundOrderDetail";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navigation />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/momo' element={<Momo />} />
        <Route path="success-payment" element={<SuccessPayment />} />
        <Route path="/:productClassification" element={<Products />} />
        <Route path="/furnitures/:furnitureId" element={<Furniture />} />
        <Route path="/design/:designId" element={<DesignDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Navigate to={'/admin/clients'} />} />
            <Route path="clients" element={<ClientsManagement />} />
            <Route path="clients/:id" element={<UpdateClients />} />
            <Route path="designs">
              <Route index element={<DesignsManagement />} />
              <Route path="create" element={<CreateDesigns />} />
              <Route path=":id" element={<UpdateDesigns />} />
            </Route>
            <Route path="furnitures" >
              <Route index element={<FurnituresManagement />} />
              <Route path="create" element={<CreateFurnitures />} />
              <Route path=":id" element={<UpdateFurniture />} />
            </Route>
            <Route path="materials" >
              <Route index element={<MaterialsManagement />} />
              <Route path="create" element={<CreateMaterials />} />
              <Route path=":id" element={<UpdateMaterials />} />
            </Route>
            <Route path="colors" >
              <Route index element={<ColorsManagment />} />
              <Route path="create" element={<CreateColors />} />
              <Route path=":id" element={<UpdateColors />} />
            </Route>
            <Route path="accounts" element={<AccountsManagement />} />
            <Route path="accounts/:id" element={<UpdateAccount />} />
            <Route path="refunds" >
              <Route index element={<RequestRefundManagement />} />
              <Route path=":id" element={<UpdateRequestRefund />} />
            </Route>
            <Route path="orders" >
              <Route index element={<RefundOrderManagement />} />
              <Route path=":id" element={<RefundOrderDetail />} />
            </Route>
            <Route path="contracts" >
              <Route index element={<ContractsManagement />} />
              <Route path=":id" element={<UpdateContracts />} />
            </Route>
          </Route>
        </Route>
        <Route path="/rooms/:roomClassification" element={<Rooms />} />
        <Route path="/designs/:designId" element={<DesignDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contracts/refunds" element={<RefundHistory />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}
export default App;