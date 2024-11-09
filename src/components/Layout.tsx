"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    </SessionProvider>
  );
};

export default Layout;
