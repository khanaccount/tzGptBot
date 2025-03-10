import React, { ReactNode } from "react";
import RouterProvider from "./router";
import "./i18n/i18n";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>;
};

export default Providers;
