// src/__tests__/NumberOfEvents.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> Component', () => {
    beforeEach(() => {
        render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={() => {}}
                setErrorAlert={() => {}}
            />
        );
    });

    test('renders an input box', () => {
        const inputBox = screen.getByRole('textbox');
        expect(inputBox).toBeInTheDocument();
    });

    test('input box has a default value of 32', () => {
        const inputBox = screen.getByRole('textbox');
        expect(inputBox).toHaveValue(32);
    });

    test('updates input box value based on user input', async () => {
        const inputBox = screen.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        await user.clear(inputBox);
        await user.type(inputBox, '10');
        expect(inputBox).toHaveValue(10);
    });
});
