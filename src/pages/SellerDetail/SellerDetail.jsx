import React, {useCallback, useEffect} from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom';
import SellerVerified from "./SellerVerified.jsx";
import SellerNotVerified  from "./SellerNotVerified.jsx";
// import useUserDetail from "../../hooks/useSellerDetail.js";
import {useSelector} from "react-redux";
import useSellerDetail from "../../hooks/useSellerDetail.js";


const SellerDetail = () => {
    const params = useParams();
    const { fetchSellerDetail,updateSeller } = useSellerDetail();
    const { sellerDetail, status, error } = useSelector((state) => state.sellerDetail);
    const loading = status === 'loading';


    console.log("userDetail",sellerDetail)
    const fetchData = useCallback(() => {
        fetchSellerDetail(params);
    }, [fetchSellerDetail, params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    if (!sellerDetail) {
        return <div>No seller details found.</div>;
    }

    const isVerified = sellerDetail.status === "ACTIVE";

    if (isVerified) {
        return <SellerVerified user={sellerDetail} UpdateSeller={updateSeller} />;
    }
    return <SellerNotVerified user={sellerDetail} UpdateSeller={updateSeller} />;
};
export default SellerDetail;