import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
 import DashboardLayout from "../components/DashboardLayout/DashboardLayout.jsx";
import SellerDetail from "../pages/SellerDetail/SellerDetail.jsx";
import Seller from "../pages/Seller/Seller.jsx";
import Users from "../pages/Users/Users.jsx";
import UserDetail from "../pages/UserDetail/UserDetail.jsx";
import AdminSetting from "../pages/AdminSetting/AdminSetting.jsx";
import Withdraw from "../pages/Withdraw/Withdraw.jsx";
import WithdrawDetail from "../pages/WithdrawDetail/WithdrawDetail.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import Loading from "../components/Loading/Loading.jsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
                    <Route index element={<Dashboard/>}/>
                    {/* Add more dashboard child routes here */}
                    {/*<Route path="login" element={<Login/>}/> /!* Akan render di URL: /dashboard/profile *!/*/}
                    <Route path={"patners"} element={<Seller/>}/>
                    <Route path={"seller/detail/:id"} element={<SellerDetail/>}/>
                    <Route path={"users"} element={<Users/>}/>
                    <Route path={"user/detail/:id"} element={<UserDetail/>}/>
                    <Route path={"settings"} element={<AdminSetting/>}/>
                    <Route path={"withdraw"} element={<Withdraw/>}/>
                    <Route path={"withdraw/detail/:id"} element={<WithdrawDetail/>}/>

                </Route>
                <Route path={"*"} element={<NotFound/>}/>
                <Route path={"loading"} element={<Loading/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
