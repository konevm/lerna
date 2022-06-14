import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import Registration from "./Registration";

test("renders without problems", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Registration />
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByLabelText("Login")).toBeInTheDocument();
});
