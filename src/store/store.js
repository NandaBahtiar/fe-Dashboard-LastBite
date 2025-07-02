import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './Slice/CustomerSlice';
import patnersReducer from './Slice/PatnerSlice';
import statisticReducer from './Slice/StatisticSlice';
import userDetailReducer from './Slice/UserDetailSlice';
// import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        customers: customerReducer,
        patners: patnersReducer,
        statistics: statisticReducer,
        userDetail: userDetailReducer,
        // auth: authReducer,
    },
});

export default store;