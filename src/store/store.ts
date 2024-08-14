import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminReducer from "../features/adminSlice";
import userReducer from "../features/usersSlice";
import planReducer from "../features/planSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    users: userReducer,
    plans: planReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
