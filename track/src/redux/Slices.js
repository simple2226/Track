import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Globals = createSlice({
    name: 'globals',
    initialState: {
        // domain: 'http://localhost:3000/api',
        domain: '/api',
        status: 0,
        match_status: 0,
        theme: !localStorage.getItem('theme') || localStorage.getItem('theme') === 'true' ? true : false
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setMatchStatus: (state, action) => {
            state.match_status = action.payload
        },
        toggleTheme: (state, action) => {
            state.theme = !state.theme
            localStorage.setItem('theme', (state.theme ? 'true' : 'false'))
        }
    }
})

export const Dashboard = createSlice({
    name: 'dashboard_data',
    initialState: {
        data: null
    },
    reducers: {
        fetch_match: (state, action) => {
            state.data = action.payload
        },
    }
})

export const Account = createSlice({
    name: 'account_data',
    initialState: {
        data: null
    },
    reducers: {
        fetch_account: (state, action) => {
            state.data = action.payload
        },
        update_account: (state, action) => {
            for (let key in action.payload) {
                state.data[key] = action.payload[key]
            }
        }
    }
})

export const globals = Globals.reducer
export const {setStatus, setMatchStatus, toggleTheme} = Globals.actions
export const dashboard = Dashboard.reducer
export const {fetch_match} = Dashboard.actions
export const account = Account.reducer
export const {fetch_account, update_account, did_not_fetch} = Account.actions