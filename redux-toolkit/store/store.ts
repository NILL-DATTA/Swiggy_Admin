import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import restaurantSlice from "../slice/restaurantSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(
    authPersistConfig,
    authSlice
);


// IMPORTANT: DO NOT persist API data (fixes hydration mismatch)
const restaurantReducer = restaurantSlice;

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        restaurant: restaurantReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// REHYDRATE

// restore data from localStorage to redux store

// PURGE

// delete all persist data

// its useFull for logout

// FLUSH
// save data pending persisted data forcefully

// PAUSE

// shut down the persist Temporal

// REGISTER
// register persisted reducer
