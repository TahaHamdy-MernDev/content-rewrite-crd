import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "../Api";

export interface User {
  _id: string;
  Email: string;
  Password: string;
  Usage: number;
  OAuthId: string;
  PlanHistory: Array<{
    PlanId: string;
    Date: string;
  }>;
  ExpiryDate: string;
  Confirmed: boolean;
  PlanId: {
    _id: string;
    Credits: number;
    Users: string[];
    Type: string;
    Months: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  userArr: User[];
  originalData: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userArr: [],
  originalData: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await Api.get("/user/all");
    return res.data.data as User[];
  } catch (error) {
    console.error("[ERROR] login failed: ", error);
  }
});

export const usersFastSearch = createAsyncThunk(
  "user/usersFastSearch",
  async (search: string, { rejectWithValue }) => {
   
    try {
      const response = await Api.get(`/user/${search}`);
      return response.data.data as User[];
    } catch (error: any) {
      if (error?.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.userArr = state.originalData.filter(
        (user) =>
          user.Email.toLowerCase().includes(searchTerm) ||
          user.PlanId.Type.toLowerCase().includes(searchTerm)
      );
    },
    resetFilter: (state) => {
      state.userArr = state.originalData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.userArr = action.payload;
        state.originalData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(usersFastSearch.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(usersFastSearch.fulfilled, (state, action) => {
        // state.loading = false;
        if (action.payload) {
          state.userArr = action.payload;
        }
      })
      .addCase(usersFastSearch.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message ?? "Failed to search admin";
      });
  },
});

export const { filterUsers, resetFilter } = userSlice.actions;
export default userSlice.reducer;
