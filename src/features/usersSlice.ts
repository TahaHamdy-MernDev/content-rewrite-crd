// slices/usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface User {
  _id: string;
  Name: string;
  Email: string;
  Role: string;
  Password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  data: User[];
  originalData: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  data: [
    {
      _id: "66a4ee9f0e465f31c50e37ab",
      Name: "Youssif Salama",
      Email: "admin@gmail.com",
      Role: "super_admin",
      Password: "$2b$10$firUIJMEQYRnPMa.pRjROuK6QND0RkpLuyGoXOsT1ZtXgq73t5m0a",
      createdAt: "2024-07-27T12:57:03.937Z",
      updatedAt: "2024-07-27T12:57:03.937Z",
      __v: 0,
    },
    {
      _id: "66aa6229f0cd0c2242a1b4ef",
      Name: "admin1",
      Email: "admin1@gmail.com",
      Role: "admin",
      Password: "$2b$10$q1VDuc9gj/rl.2cFWt6AqeTGr0LFuhZfY1M6HJfPO8JHtP8A6ISQa",
      createdAt: "2024-07-31T16:11:21.632Z",
      updatedAt: "2024-07-31T16:11:21.632Z",
      __v: 0,
    },
  ],
  originalData: [
    {
      _id: "66a4ee9f0e465f31c50e37ab",
      Name: "Youssif Salama",
      Email: "admin@gmail.com",
      Role: "super_admin",
      Password: "$2b$10$firUIJMEQYRnPMa.pRjROuK6QND0RkpLuyGoXOsT1ZtXgq73t5m0a",
      createdAt: "2024-07-27T12:57:03.937Z",
      updatedAt: "2024-07-27T12:57:03.937Z",
      __v: 0,
    },
    {
      _id: "66aa6229f0cd0c2242a1b4ef",
      Name: "admin1",
      Email: "admin1@gmail.com",
      Role: "admin",
      Password: "$2b$10$q1VDuc9gj/rl.2cFWt6AqeTGr0LFuhZfY1M6HJfPO8JHtP8A6ISQa",
      createdAt: "2024-07-31T16:11:21.632Z",
      updatedAt: "2024-07-31T16:11:21.632Z",
      __v: 0,
    },
  ],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchTerm: string) => {
    const response = await searchUsers(searchTerm);
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.data = state.originalData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;

// slices/historySlice.ts and slices/plansSlice.ts would be similar,
// just with different initial states and API calls
