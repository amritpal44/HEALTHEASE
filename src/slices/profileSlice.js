import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    // appointments: localStorage.getItem("appointmentCount") ? JSON.parse(localStorage.getItem("appointmentCount")) : 0
};


const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        // setAppointmentCount(state, value){
        //     state.appointments = value.payload
        // }
    }
})

export const {setUser, setLoading, setAppointmentCount} = profileSlice.actions;
export default profileSlice.reducer