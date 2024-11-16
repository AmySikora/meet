import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let mockSetErrorAlert, mockSetCurrentNOE, NumberOfEventsComponent;

  beforeEach(() => {
    mockSetErrorAlert = jest.fn();
    mockSetCurrentNOE = jest.fn();
    NumberOfEventsComponent = render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={mockSetCurrentNOE}
        setErrorAlert={mockSetErrorAlert}
      />
    );
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
    expect(numberTextBox).toBeInTheDocument();
  });

  test('default number is 32', () => {
    const numberTextBox = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
    expect(numberTextBox).toHaveValue(32);
  });

  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.getByTestId('numberOfEventsInput');

    await user.clear(numberTextBox);
    await user.type(numberTextBox, '10');

    expect(mockSetCurrentNOE).toHaveBeenCalledWith(10);
    expect(mockSetErrorAlert).toHaveBeenCalledWith(""); // No error for valid input
  });

  test('shows an error alert when input is invalid', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.getByTestId('numberOfEventsInput');

    await user.clear(numberTextBox);
    await user.type(numberTextBox, "abc");
    expect(mockSetErrorAlert).toHaveBeenCalledWith("Enter a valid number");

    await user.clear(numberTextBox);
    await user.type(numberTextBox, "50");
    expect(mockSetErrorAlert).toHaveBeenCalledWith("Only a maximum of 32 is allowed");
  });
});
