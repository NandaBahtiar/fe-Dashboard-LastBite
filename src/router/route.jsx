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
import NotFound from "../components/NotFound/NotFound.jsx";


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
                    <Route path={"patner/detail/:id"} element={<SellerDetail/>}/>
                    <Route path={"users"} element={<Users/>}/>
                    <Route path={"user/detail/:id"} element={<UserDetail/>}/>
                    <Route path={"settings"} element={<AdminSetting/>}/>

                </Route>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
