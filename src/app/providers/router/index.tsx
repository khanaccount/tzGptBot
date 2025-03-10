import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router";

interface RouterProviderProps {
  children: ReactNode;
}

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return <BrowserRouter basename="/tzGptBot">{children}</BrowserRouter>;
};

export default RouterProvider;
