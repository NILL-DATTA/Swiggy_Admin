
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosError } from "axios";

import { getCookie, setCookie } from "cookies-next";

import { toast } from "sonner";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";

// COOKIES

const token = (getCookie("token") as string) ?? null;

const role = (getCookie("role") as string) ?? null;

const user = getCookie("user") ? JSON.parse(getCookie("user") as string) : null;

//  INITIAL STATE

const initialState = {
    loading: false,
    user,
    error: null,
    token,
    role,
};




// LOGIN

export const userSignin = createAsyncThunk<
    any,
    { rejectValue: string }
>("auth/signin", async (data, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.post(endPoints.auth.signIn, data);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        return rejectWithValue(err.response?.data?.message || "Login failed");
    }
});

// SLICE

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder




            //  LOGIN

            .addCase(userSignin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(userSignin.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.token = payload.accessToken;
                state.user = payload.data;
                state.role = payload.data.role;

                // save cookies

                if (payload.status == true) {
                    setCookie("token", payload.accessToken, {
                        path: "/",
                        sameSite: "lax",
                    });

                    setCookie("refresh-token", payload.refreshToken, {
                        path: "/",
                        sameSite: "lax",
                    });

                    setCookie("role", payload.data.role, {
                        path: "/",
                        sameSite: "lax",
                    });

                    setCookie("user", JSON.stringify(payload.data), {
                        path: "/",
                        sameSite: "lax",
                    });

                    toast.success(payload?.message || "Login successful");
                }
            })

            .addCase(userSignin.rejected, (state, action) => {
                state.loading = false;

                const message =
                    action.payload || action.error.message || "Login failed";

                state.error = message;

                toast.error(message);
            });
    },
});

export default authSlice.reducer;
