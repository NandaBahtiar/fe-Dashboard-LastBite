import React, {useCallback, useEffect} from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom';
import SellerVerified from "./SellerVerified.jsx";
import SellerNotVerified  from "./SellerNotVerified.jsx";
import SellerSuspend from "./SellerSuspend.jsx";
import SellerDibatalkan from "./SellerDibatalkan.jsx";
// import useUserDetail from "../../hooks/useSellerDetail.js";
import {useSelector} from "react-redux";
import useSellerDetail from "../../hooks/useSellerDetail.js";
import Loading from "../../components/Loading/Loading.jsx";


const SellerDetail = () => {
    const { id } = useParams();
    const { fetchSellerDetail,updateSeller } = useSellerDetail();
    const { sellerDetail, status, error } = useSelector((state) => state.sellerDetail);
    const loading = status === 'loading';


    
    const fetchData = useCallback(() => {
        fetchSellerDetail(id);
    }, [fetchSellerDetail, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (loading) {
        return <>
        <Loading/>
        </>;
    }

    if (error) {
        return <>Error: {error}</>;
    }


    if (!sellerDetail || !sellerDetail.status) {
        return <div>No seller details found or status information missing.</div>;
    }

    const isVerified = sellerDetail.status === "ACTIVE";
    const isSuspended = sellerDetail.status === "SUSPENDED";
    const isCancelled = sellerDetail.status === "CANCELLED";

    if (isVerified) {
        return <SellerVerified user={sellerDetail} UpdateSeller={updateSeller} />;
    } else if (isSuspended) {
        return <SellerSuspend user={sellerDetail} updateSeller={updateSeller} />;
    } else if (isCancelled) {
        return <SellerDibatalkan user={sellerDetail} updateSeller={updateSeller} />;
    }
    return <SellerNotVerified user={sellerDetail} UpdateSeller={updateSeller} />;
};
export default SellerDetail;