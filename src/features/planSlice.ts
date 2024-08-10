import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "../Api";
import { Plan } from "../interfaces/Plan";

export interface PlanState {
  plans: Plan[];
  originalData: Plan[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  originalData: [],
  loading: false,
  error: null,
};

export const fetchPlans = createAsyncThunk("plans/fetchPlans", async () => {
  const res = await Api.get("/plan");
  return res.data.data as Plan[];
});

export const searchPlans = createAsyncThunk(
  "plans/searchPlans",
  async (searchTerm: string) => {
    const res = await Api.get(`/plan/${searchTerm}`);
    return res.data.data as Plan[];
  }
);

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan(state, action) {
      state.plans.push(action.payload);
    },
    deletePlan(state, action) {
      state.plans = state.plans.filter((plan) => plan._id !== action.payload);
    },
    filterPlans: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.plans = state.originalData.filter((plan) => 
          plan.Type.toLowerCase().includes(searchTerm)||
          plan.Credits.toString().includes(searchTerm) 
      );
    },
    resetFilter: (state) => {
      state.plans = state.originalData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
        state.originalData = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch plans";
      })
      .addCase(searchPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      });
  },
});

export const { addPlan, deletePlan, filterPlans, resetFilter } =
  planSlice.actions;

export default planSlice.reducer;
