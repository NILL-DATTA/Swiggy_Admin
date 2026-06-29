"use client";

import React from "react";
import { Provider } from "react-redux";

import { Toaster } from "sonner";

import { CookiesNextProvider } from "cookies-next";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <CookiesNextProvider>
          <Toaster />
          {children}
        </CookiesNextProvider>
        <Toaster position="top-right" theme="dark" richColors duration={3000} />
      </Provider>
    </>
  );
}
