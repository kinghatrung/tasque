import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "~/types/user";
import type { RootState } from "~/redux/store";

import { toast } from "sonner";
import { authService } from "~/services/authService";

interface AuthState {
  currentUser: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
};

export const signIn = createAsyncThunk<User, { username: string; password: string }>(
  "auth/signIn",
  async ({ username, password }, { dispatch }) => {
    const res = await authService.signIn(username, password);
    const user = await dispatch(fetchMe()).unwrap();

    const { accessToken } = res;

    const infoUser = { accessToken, ...user };

    return infoUser;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (showSuccessMessage: boolean = true) => {
  const res = await authService.signOut();
  if (showSuccessMessage) toast.success(res.data.message);
  return res.data;
});

export const fetchMe = createAsyncThunk<User>("auth/fetchMe", async () => {
  const user = await authService.fetchMe();
  return user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
      });
  },
});

export const authSelect = (state: RootState) => {
  return state.auth;
};

export const authReducer = authSlice.reducer;
