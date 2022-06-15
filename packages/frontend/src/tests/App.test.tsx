import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import RenderWrapper from "./helpers/RenderWrapper";
import App from "../App";

function renderApp() {
  render(
    <RenderWrapper>
      <App />
    </RenderWrapper>
  );
}

afterAll(() => cleanup());

describe("App render", () => {
  it("should render without problems", () => {
    renderApp();
    expect(screen.getByText(/2021 Kal Hans Naturals/i)).toBeInTheDocument();
  });
});
