import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(
      // "https://jsonplaceholder.typicode.com/users",
      "http://io.fleetlocate.asia:85/api/fuel-v5/17552/2024-06-09T17:00:09Z/2024-06-10T17:00:09Z",
    );

    // console.log(JSON.stringify(response));
    const { data } = response;
    const { recordsets } = data;

    return recordsets;

    // const response = await fetch('https://api.example.com/user');
    // const jsonData = await response.json();
    // return jsonData;
  } catch (err) {
    let error = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return error.response.data;
  }
});

// const initialState = {
//   entities: {},
//   error: null,
// };
const initialState = { data: null, loading: false, error: null };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  // extraReducers: (builder) => {
  //   // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
  //   builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
  //     state.entities[payload.id] = payload;
  //   });
  //   builder.addCase(fetchUsers.rejected, (state, action) => {
  //     if (action.payload) {
  //       // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
  //       state.error = action.payload.errorMessage;
  //     } else {
  //       state.error = action.error.message;
  //     }
  //   });
  // },
});

export default usersSlice.reducer;
