import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/axios";

const initialState = {
  user: {},
  userList: [],
};

export const createUser = createAsyncThunk("user/createUserSuccess", async (createData) => {
  try {
    const response = await apiClient()?.post("/api/employee/store", createData);
    return response.data;
  } catch (error) {
    console.log("Error creating user:", error);
  }
});

export const deleteUser = createAsyncThunk("user/deleteUserSuccess", async (id) => {
  try {
    const response = await apiClient()?.delete(`/api/employee/destroy/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error deleting user:", error);
  }
});

export const updateUser = createAsyncThunk("user/updateUserSuccess", async ({ id, updatedUserData }) => {
  try {
    const response = await apiClient()?.put(`/api/employee/update/${id}`, updatedUserData);
    return response?.data;
  } catch (error) {
    console.log("Error updating user:", error);
  }
});

export const getUser = createAsyncThunk("user/getUSerSuccess", async (id, updatedUserData) => {
  try {
    const response = await apiClient()?.get(`/api/employee/show/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.log("Error fetching user:", error)
  }
});

export const getUserList = createAsyncThunk("userList/getUserListSuccess", async (data) => {
  try {
    const response = await apiClient().get("/api/employee/", { params: { page: data.page, limit: data.limit, sortBy: data.sortBy, order: data.order, filter: data.filter } });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userList.employees.push(action.payload);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userList = state.userList.employees.filter(
        (user) => user._id !== action?.payload?.employeeID
      );
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const newUser = action.payload;
      const index = state.userList.employees.findIndex(
        (user) => user?._id === newUser?.employeeID
      );
      if (index !== 0) {
        state.userList.employees[index] = { ...state.userList.employees[index], ...newUser };
      } else {
        state?.userList.employees.push(newUser);
      }
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export default userSlice.reducer;
