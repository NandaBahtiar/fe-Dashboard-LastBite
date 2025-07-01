import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaFilePdf, FaReceipt, FaMoneyBillWave, FaStar, FaBox } from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom';
import PartnersVerified from "./PartnersVerified.jsx";
import PartnersNotVerified  from "./PartnersNotVerified.jsx";

const PartnerDetail = () => {
    const params = useParams();
    const id = params.id;
    const verifed = true

 if (id === "1"){
     return <PartnersVerified/>
 }
 return <PartnersNotVerified/>
};

export default PartnerDetail;