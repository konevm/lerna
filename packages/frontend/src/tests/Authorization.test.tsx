import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderWrapper from "./helpers/RenderWrapper";
import Authorization from "../components/Authorization/Authorization";

enum Logins {
  TRUE = "test44",
  SHORT = "bbb",
  NOT_LATIN = "вавыфс",
  WITH_SPACE = "john doe",
}
enum Passwords {
  TRUE = "fffsfsfsfsfs1F!",
  SPACES = "        ",
  SHORT = "bba1",
  ONLY_NUMBERS = "178123546",
  STRING_WITH_SPACES = "gkdghkdgh dghdkjgh dkglhdkg dghkdkgh",
  STRING_WITH_HOOKS = "jfjfjfjfjf()",
  STRING_WITH_UPPERLETTERS = "kfkfkfkfHH",
}

function renderApp() {
  render(
    <RenderWrapper>
      <Authorization />
    </RenderWrapper>
  );
}

describe("Authorization Page", () => {
  afterEach(() => cleanup());
  it("should render component without problems", () => {
    renderApp();
    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
  });
  it("should allows the user to login successfully", async () => {
    renderApp();
    userEvent.type(screen.getByLabelText("Login"), Logins.TRUE);
    userEvent.type(screen.getByLabelText("Password"), Passwords.TRUE);
    userEvent.click(screen.getByText("Get Authorized"));
    const alert = await screen.findByTestId("wait");
    await waitFor(() => {
      expect(alert).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(window.localStorage.getItem("tokenKey")).toBeTruthy();
    });
  });
});

describe("Testing login input", () => {
  afterEach(() => cleanup());
  it("shouldn't validate short login", async () => {
    renderApp();
    userEvent.type(screen.getByLabelText("Password"), Passwords.TRUE);
    userEvent.type(screen.getByLabelText("Login"), Logins.SHORT);
    await waitFor(() => {
      expect(screen.getByText("Get Authorized").getAttribute("disabled")).toBe("");
    });
    await waitFor(() => {
      expect(screen.getByText("login must be at least 5 characters")).toBeInTheDocument();
    });
  });
  it("shouldn't validate non latin letters in login", async () => {
    renderApp();
    userEvent.type(screen.getByLabelText("Password"), Passwords.TRUE);
    userEvent.type(screen.getByLabelText("Login"), Logins.NOT_LATIN);
    await waitFor(() => {
      expect(screen.getByText("Get Authorized").getAttribute("disabled")).toBe("");
    });
    await waitFor(() => {
      expect(screen.getByText("Not allowed space and not-latin letters")).toBeInTheDocument();
    });
  });
});

describe("Testing password input", () => {
  afterEach(() => cleanup());
  it("shoudn't apply short passwords", async () => {
    renderApp();
    userEvent.type(screen.getByLabelText("Login"), Logins.TRUE);
    userEvent.type(screen.getByLabelText("Password"), Passwords.SHORT);
    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });
  });
  it("shoudn't apply empty string", async () => {
    renderApp();
    userEvent.type(screen.getByLabelText("Login"), Logins.TRUE);
    await waitFor(() => {
      expect(screen.getByText("Get Authorized").getAttribute("disabled")).toBe("");
    });
  });
});
