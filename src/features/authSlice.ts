import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";
import CookiesService from "../services/CookiesService";

export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: CookiesService.get("authToken") as string | null,
  status: "idle",
  error: null,
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    const response = await Api.post("/user/login", userData);
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
    },
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
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
