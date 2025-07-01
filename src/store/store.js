import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './Slice/CustomerSlice';
import partnerReducer from './Slice/PatnerSlice';
import statisticReducer from './Slice/StatisticSlice';
// import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        customers: customerReducer,
        partners: partnerReducer,
        statistics: statisticReducer,
        // auth: authReducer,
    },
});

export default store;