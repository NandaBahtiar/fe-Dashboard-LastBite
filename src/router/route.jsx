import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout.jsx";
import PartnerDetail from "../pages/PartnerDetail/PartnerDetail.jsx";
import Patners from "../pages/Patners/Patners.jsx";
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
                    <Route path="login" element={<Login/>}/> {/* Akan render di URL: /dashboard/profile */}
                    <Route path={"patners"} element={<Patners/>}/>
                    <Route path={"patner/detail/:id"} element={<PartnerDetail/>}/>
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
