import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout.jsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
                    <Route index element={<Dashboard/>}/>
                    {/* Add more dashboard child routes here */}
                    <Route path="login" element={<Login/>}/> {/* Akan render di URL: /dashboard/profile */}
                </Route>
                <Route path={"*"} element={<Login/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
