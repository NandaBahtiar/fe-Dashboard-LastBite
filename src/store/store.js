import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './Slice/CustomerSlice';
import patnersReducer from './Slice/PatnerSlice';
import statisticReducer from './Slice/StatisticSlice';
import userDetailReducer from './Slice/UserDetailSlice';
import sellerDetailReducer from './Slice/SellerDetailSlice';
import adminReducer from './Slice/AdminSlice';
import sellerMenuReducer from './Slice/SellerMenuSlice';
import canceledSellerReducer from './Slice/CanceledSellerSlice';
import deleteSellerReducer from './Slice/DeleteSellerSlice';
// import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        customers: customerReducer,
        patners: patnersReducer,
        statistics: statisticReducer,
        userDetail: userDetailReducer,
        sellerDetail: sellerDetailReducer,
        admin: adminReducer,
        sellerMenu: sellerMenuReducer,
        canceledSeller: canceledSellerReducer,
        deleteSeller: deleteSellerReducer,
        // auth: authReducer,
    },
});

export default store;