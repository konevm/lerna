import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import Authorization from "./Authorization";

enum Logins {
  TRUE = "test11",
  SHORT = "bbb",
  NOT_LATIN = "вавыфс",
  WITH_SPACE = "john doe",
}
enum Passwords {
  TRUE = "fffsfsfsfsfs1F!",
  EMPTY = "",
  SPACES = "        ",
  SHORT = "bba1",
  ONLY_NUMBERS = "178123546",
  STRING_WITH_SPACES = "gkdghkdgh dghdkjgh dkglhdkg dghkdkgh",
  STRING_WITH_HOOKS = "jfjfjfjfjf()",
  STRING_WITH_UPPERLETTERS = "kfkfkfkfHH",
}

function renderApp() {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Authorization />
      </Provider>
    </BrowserRouter>
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
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: Logins.TRUE },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: Passwords.TRUE },
    });
    fireEvent.click(screen.getByText("Get Authorized"));
    const alert = await screen.findByTestId("wait");
    await waitFor(() => {
      expect(alert).toBeInTheDocument();
    });
    await waitFor(() => {
      setTimeout(() => {
        expect(window.localStorage.getItem("customer")).toEqual("test11");
      }, 5500);
    });
  });
});

describe("Testing login input", () => {
  afterEach(() => cleanup());
  it("shouldn't validate short login", async () => {
    renderApp();
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: Logins.SHORT },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: Passwords.TRUE },
    });
    await waitFor(() => {
      expect(screen.getByText("Get Authorized").getAttribute("disabled")).toBe("");
    });
    await waitFor(() => {
      expect(screen.getByText("login must be at least 5 characters")).toBeInTheDocument();
    });
  });
  it("shouldn't validate non latin letters in login", async () => {
    renderApp();
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: Logins.NOT_LATIN },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: Passwords.TRUE },
    });
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
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: Logins.TRUE },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: Passwords.SHORT },
    });
    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });
  });
  it("shoudn't apply empty string", async () => {
    renderApp();
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: Logins.TRUE },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: Passwords.EMPTY },
    });
    await waitFor(() => {
      expect(screen.getByText("Get Authorized").getAttribute("disabled")).toBe("");
    });
  });
});
