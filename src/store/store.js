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
import ordersReportReducer from './Slice/OrdersReportSlice';
import customerOrdersReducer from './Slice/CustomerOrdersSlice';
import salesSummaryReducer from './Slice/SalesSummarySlice';
import reviewReducer from './Slice/ReviewSlice';

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
        ordersReport: ordersReportReducer,
        orderDetail: customerOrdersReducer,
        salesSummary: salesSummaryReducer,
        reviews: reviewReducer,
        
        // auth: authReducer,
    },
});

export default store;