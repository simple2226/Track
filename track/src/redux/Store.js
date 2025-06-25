import { configureStore } from "@reduxjs/toolkit";
import { globals, dashboard, account } from "./Slices";

export const Store = configureStore({
    reducer: {
        globals: globals,
        dashboard: dashboard,
        account: account
    }
})