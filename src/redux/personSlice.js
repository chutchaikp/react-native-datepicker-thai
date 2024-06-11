import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk("users/getUsers", async () => {
  // try {
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

  // } catch (err) {
  //   let error = err; // cast the error for access
  //   if (!error.response) {
  //     throw err;
  //   }
  //   // We got validation errors, let's return those so we can reference in our component and set form errors
  //   return error.response.data;
  // }
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
        console.log("On pending");
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log("On fulfilled");
        console.log(action.payload);

        state.loading = false;
        // state.data = action.payload;
        return "hello";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log("On rejected");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
