import React from 'react';
import { useParams } from 'react-router-dom';
import UserActive from "./UserActive.jsx";
import UserInactive from "./UserInactive.jsx";

const UserDetail = () => {
    const params = useParams();
    const id = params.id;

    if (id === "1") {
        return <UserActive />;
    }
    return <UserInactive />;
};

export default UserDetail;