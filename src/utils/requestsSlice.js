import { createSlice } from "@reduxjs/toolkit";

const connectionRequestsSlice = createSlice({
    name: 'connectionRequests',
    initialState: null,
    reducers: {
        addConnectionRequests: (state, action) => action.payload,
        removeConnectionRequests: (state, action) => null
    }
});

export const { addConnectionRequests, removeConnectionRequests } = connectionRequestsSlice.actions;
export default connectionRequestsSlice.reducer;