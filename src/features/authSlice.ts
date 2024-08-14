import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";
import CookiesService from "../services/CookiesService";
import { jwtDecode } from "jwt-decode";

export type User = {
  userEmail: string;
  _id: string;
  Role: "super_admin" | "admin" | "user"; // Adjust roles as needed
  Name: string;
  iat: number;
  exp: number;
};
export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: Partial<User>;
}

const initialState: AuthState = {
  token: CookiesService.get("authToken") as string | null,
  status: "idle",
  error: null,
  data: {},
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData: { Email: string; Password: string }) => {
    const response = await Api.post("/admin/login", userData);
    console.log("[DEBUG], response: ", response.data);

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      CookiesService.remove("authToken");
    }, setData: (state, action) => {
        state.data = jwtDecode(action.payload);
        state.token = action.payload;
	}
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        CookiesService.set("authToken", action.payload.token, { path: "/" });
        state.data = jwtDecode(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to login";
      });
  },
});

export const { logout, setData } = authSlice.actions;

export default authSlice.reducer;
