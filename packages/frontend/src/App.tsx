import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { AppRoutes } from "./constants/app-routes.constants";
import Cart from "./Pages/Cart/Cart";
import MainPage from "./Pages/MainPage/MainPage";
import Shop from "./Pages/Shop/Shop";
import AuthorizationPage from "./components/Authorization/Authorization";
import Registration from "./components/Registration/Registration";
import PersonalPage from "./Pages/PersonalPage/PersonalPage";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={AppRoutes.MAIN} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoutes.PRODUCTS} element={<Shop />} />
          <Route path={AppRoutes.CART} element={<Cart />} />
          <Route path="new" element={<Shop isNew={true} />} />
          <Route path={AppRoutes.AUTH} element={<AuthorizationPage />} />
          <Route path={AppRoutes.REG} element={<Registration />} />
          <Route path={AppRoutes.AUTH} element={<AuthorizationPage />} />
          <Route path={AppRoutes.REG} element={<Registration />} />
          <Route path={AppRoutes.ACCOUNT} element={<PersonalPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
