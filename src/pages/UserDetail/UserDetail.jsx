import React, {useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import UserActive from "./UserActive.jsx";
import UserSuspend from "./UserSuspend.jsx";

import useUserDetail from "../../hooks/useUserDetail.js";
import {useSelector} from "react-redux";
import Loading from "../../components/Loading/Loading.jsx";

const UserDetail = () => {
    const params = useParams();
    const { fetchUserDetail,updateUser } = useUserDetail();
    const { userDetail, status, error } = useSelector((state) => state.userDetail);
    const loading = status === 'loading';



    
    const fetchData = useCallback(() => {
        fetchUserDetail(params);
    }, [fetchUserDetail, params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (loading) {
        return <>
            <Loading/>
        </>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    if (!userDetail) {
        return <div>No user details found.</div>;
    }

    const isUserSuspended = userDetail.suspendedUntil && new Date(userDetail.suspendedUntil) > new Date();

    if (isUserSuspended) {
        return <UserSuspend user={userDetail} updateUser={updateUser} />;
    }
    return <UserActive user={userDetail} updateUser={updateUser} />;
};

export default UserDetail;