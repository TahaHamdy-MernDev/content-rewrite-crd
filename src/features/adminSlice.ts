// src/features/adminSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";
import { Admin } from "../components/Admins/Admins";

export interface AdminState {
  adminArr: Admin[];
  originalAdminArr: Admin[]; // To store the original admin array
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AdminState = {
  adminArr: [],
  originalAdminArr: [],
  status: "idle",
  error: null,
};

export const fetchAdmins = createAsyncThunk("admin/fetchAdmins", async () => {
  const response = await Api.get("/admin");
  return response.data.data;
});

export const fastSearch = createAsyncThunk(
  "admin/fastSearch",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/admin/${search}`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (_id: string, { rejectWithValue }) => {
    try {
      await Api.delete(`/admin/${_id}`);
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.adminArr = state.originalAdminArr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminArr = action.payload;
        state.originalAdminArr = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch admins";
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.adminArr = state.adminArr.filter(
          (admin) => admin._id !== action.payload
        );
        state.originalAdminArr = state.originalAdminArr.filter(
          (admin) => admin._id !== action.payload
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete admin";
      })
      .addCase(fastSearch.fulfilled, (state, action) => {
        state.adminArr = action.payload;
      })
      .addCase(fastSearch.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to search admin";
      });
  },
});

export const { resetSearch } = adminSlice.actions;
export default adminSlice.reducer;
