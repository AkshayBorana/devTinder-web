import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionsSlice';
import connectionRequestsReducer from './requestsSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        connectionRequests: connectionRequestsReducer
    }
});

export default appStore;