import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let setErrorAlertMock;
  let setCurrentNOEMock;

  beforeEach(() => {
    setErrorAlertMock = jest.fn();
    setCurrentNOEMock = jest.fn();
  });

  test('renders number of events text input', () => {
    const { getByTestId } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOEMock} setErrorAlert={setErrorAlertMock} />
    );
    const numberTextBox = getByTestId('numberOfEventsInput');
    expect(numberTextBox).toBeInTheDocument();
  });

  test('default number is 32', () => {
    const { getByTestId } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOEMock} setErrorAlert={setErrorAlertMock} />
    );
    const numberTextBox = getByTestId('numberOfEventsInput');
    expect(numberTextBox).toHaveValue("32");
  });

  test('number of events text box value changes when the user types in it', async () => {
    const { getByTestId } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOEMock} setErrorAlert={setErrorAlertMock} />
    );
    const numberTextBox = getByTestId('numberOfEventsInput');

    await userEvent.clear(numberTextBox);
    await userEvent.type(numberTextBox, "10");

    expect(setCurrentNOEMock).toHaveBeenCalledWith("10");
    expect(setErrorAlertMock).toHaveBeenCalledWith(""); // Ensures no error alert for a valid input
  });

  test('shows an error alert when input is invalid', async () => {
    const { getByTestId } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOEMock} setErrorAlert={setErrorAlertMock} />
    );
    const numberTextBox = getByTestId('numberOfEventsInput');

    await userEvent.clear(numberTextBox);
    await userEvent.type(numberTextBox, "abc");
    expect(setErrorAlertMock).toHaveBeenCalledWith("Enter a valid number");

    await userEvent.clear(numberTextBox);
    await userEvent.type(numberTextBox, "50");
    expect(setErrorAlertMock).toHaveBeenCalledWith("Only a maximum of 32 is allowed");
  });
});
