import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";
import { Restaurant, RestaurantState } from "../../typescript/restaurant.type";


type UpdateApplicationPayload = {
    id: string;
    status: "approved" | "rejected" | "suspended";
    reason?: string;
};

// INITIAL STATE

const initialState: RestaurantState = {
    loading: false,
    error: null,
    restaurants: [],
    approvedRestaurantlist: []
};


export const pendingRestaurantList = createAsyncThunk<
    Restaurant[],
    void,
    { rejectValue: string }
>(
    "restaurant/pendingList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(
                endPoints.restaurant.pendinglist
            );



            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to fetch pending restaurants"
            );
        }
    }
);

export const aplication_status = createAsyncThunk<
    any,
    UpdateApplicationPayload,
    { rejectValue: string }
>(
    "restaurant/updateStatus",
    async ({ id, status, reason }, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.patch(
                endPoints.restaurant.updateApplicationStatus(id),
                {
                    status,
                    reason,
                }
            );

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to update application status"
            );
        }
    }
);


export const approvedRestaurantList = createAsyncThunk<
    any,            // response type
    string,         // id
    { rejectValue: string }
>(
    "restaurant/approvedList",
    async (id, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(
                endPoints.restaurant.approvedlist);

            return response.data.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message ||
                "Failed to approve restaurant"
            );
        }
    }
);




// SLICE

const restaurantSlice = createSlice({
    name: "restaurant",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder



            .addCase(pendingRestaurantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            .addCase(pendingRestaurantList.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload;
            })



            .addCase(pendingRestaurantList.rejected, (state, action) => {
                state.loading = false;

                const message =
                    action.payload ??
                    action.error.message ??
                    "Failed to fetch pending restaurants";

                state.error = message;

                toast.error(message);
            })


            .addCase(aplication_status.pending, (state) => {
                state.loading = true;
                state.error = null;
            })



            .addCase(aplication_status.fulfilled, (state, action) => {
                state.loading = false;
                console.log("PAYLOAD:", action.payload);

                state.restaurants = state.restaurants.filter(
                    (item) => item._id !== action.payload._id
                );


                state.approvedRestaurantlist = state.approvedRestaurantlist.filter(
                    (item) => item._id !== action.payload._id
                );
            })


            .addCase(approvedRestaurantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })


            .addCase(approvedRestaurantList.fulfilled, (state, action) => {
                state.loading = false;
                state.approvedRestaurantlist = action.payload;

            })


            .addCase(approvedRestaurantList.rejected, (state, action) => {
                state.loading = false;

                const message =
                    action.payload ??
                    action.error.message ??
                    "Failed to fetch pending restaurants";

                state.error = message;

                toast.error(message);
            });
    },
});

export default restaurantSlice.reducer;