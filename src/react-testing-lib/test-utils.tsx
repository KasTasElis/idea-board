/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { GlobalStateProvider } from "../state";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <GlobalStateProvider>{children}</GlobalStateProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
