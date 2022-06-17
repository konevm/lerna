import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderWrapper from "./helpers/RenderWrapper";
import Registration from "../components/Registration/Registration";

function renderComponent() {
  render(
    <RenderWrapper>
      <Registration />
    </RenderWrapper>
  );
}

describe("Registration component render", () => {
  it("should renders without problems", () => {
    renderComponent();
    expect(screen.getByLabelText("Login")).toBeInTheDocument();
  });
  it("should register new customer", async () => {
    renderComponent();
    userEvent.type(screen.getByLabelText(/Login/i), "Login");
    userEvent.type(screen.getByLabelText("Name"), "Name");
    userEvent.type(screen.getByLabelText("Last Name"), "LastName");
    userEvent.type(screen.getByLabelText("Email"), "xxx@bbbbb.hh");
    userEvent.type(screen.getByLabelText("Password"), "fffsfsfsfsfs1F!");
    userEvent.type(screen.getByLabelText("Confirm Password"), "fffsfsfsfsfs1F!");
    userEvent.type(screen.getByLabelText("Post Address"), "New York");
    userEvent.type(screen.getByLabelText("Phone Number"), "12312312");
    userEvent.click(screen.getByText("Get Registered"));
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Sign out")).toBeInTheDocument();
      }, 5000);
    });
  });
});
