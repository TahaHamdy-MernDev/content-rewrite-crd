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
export interface UserHistoryItem {
  _id: string;
  OriginalPost: string;
  GeneratedPost: string;
  FeedBacked: boolean;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  userArr: User[];
  originalData: User[];
  userHistory: UserHistoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userArr: [],
  originalData: [],
  userHistory: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await Api.get("/user/all");
    return res.data.data;
  } catch (error) {
    console.error("[ERROR] login failed: ", error);
  }
});

export const usersFastSearch = createAsyncThunk(
  "user/usersFastSearch",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/user/${search}`);
      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);
export const getUserHistory = createAsyncThunk(
  "user/get-user/:id",
  async (id: string|undefined, { rejectWithValue }) => {
    try {
      const { data } = await Api.get(`/user/history/${id}`);
      return data.data;
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
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userArr = action.payload;
        state.originalData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(usersFastSearch.pending, (state) => {
        state.error = null;
      })
      .addCase(usersFastSearch.fulfilled, (state, action) => {
        if (action.payload) {
          state.userArr = action.payload;
        }
      })
      .addCase(usersFastSearch.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to search admin";
      })
      .addCase(getUserHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserHistory.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          state.userHistory = action.payload;
          state.error = null;
        }
      })
      .addCase(getUserHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to get user history";
      });
  },
});

export const { filterUsers, resetFilter } = userSlice.actions;
export default userSlice.reducer;
