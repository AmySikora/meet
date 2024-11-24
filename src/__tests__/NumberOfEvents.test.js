// src/__tests__/NumberOfEvents.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> Component", () => {
  let setCurrentNOE;
  let setErrorAlert;

  beforeEach(() => {
    setCurrentNOE = jest.fn();
    setErrorAlert = jest.fn();

    render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
    );
  });

  test("renders input textbox for number of events", () => {
    const input = screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  test("default value of the textbox is 32", () => {
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(32);
  });

  test("textbox value updates when user types", async () => {
    const input = screen.getByRole("spinbutton");
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, "10");

    expect(input).toHaveValue(10);
    expect(setErrorAlert).toHaveBeenCalledWith(""); 
    expect(setCurrentNOE).toHaveBeenCalledWith(10);
  });

  test("shows error for non-numeric input", async () => {
    const input = screen.getByRole("spinbutton");
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, "abc");

    expect(setErrorAlert).toHaveBeenCalledWith("Enter a valid number");
  });

  test("shows error for numbers greater than 32", async () => {
    const input = screen.getByRole("spinbutton");
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, "50");

    expect(setErrorAlert).toHaveBeenCalledWith("Only a maximum of 32 is allowed");
  });
});
