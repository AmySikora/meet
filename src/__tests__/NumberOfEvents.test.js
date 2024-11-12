// src/__tests__/NumberOfEvents.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

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

    test('render element with role of spinbutton', () => {
        const input = screen.getByRole('spinbutton'); // Updated to spinbutton for number input
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        const input = screen.getByRole('spinbutton');
        expect(input).toHaveValue(32);
    });

    test('change number of events when a user types in the input', async () => {
        const input = screen.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        await user.clear(input);
        await user.type(input, '10');
        expect(input).toHaveValue(10);
    });
});
