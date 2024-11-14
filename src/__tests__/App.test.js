import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const CitySearchDOM = AppComponent.getByTestId('city-search');
    const CitySearchInput = within(CitySearchDOM).getByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).getByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppComponent.getByTestId('event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    const berlinEvents = (await getEvents()).filter(event => event.location === 'Berlin, Germany');

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('shows an error alert when input is invalid in NumberOfEvents', async () => {
    const setErrorAlertMock = jest.fn();
    const user = userEvent.setup();
    const { getByTestId } = render(
      <NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} setErrorAlert={setErrorAlertMock} />
    );

    const NumberOfEventsInput = getByTestId('numberOfEventsInput');

    // Test non-numeric input
    await user.type(NumberOfEventsInput, "abc");
    expect(setErrorAlertMock).toHaveBeenCalledWith("Enter a valid number");

    // Test value greater than 32
    await user.clear(NumberOfEventsInput);
    await user.type(NumberOfEventsInput, "50");
    expect(setErrorAlertMock).toHaveBeenCalledWith("Only a maximum of 32 is allowed");

    // Test valid input
    await user.clear(NumberOfEventsInput);
    await user.type(NumberOfEventsInput, "10");
    expect(setErrorAlertMock).toHaveBeenCalledWith("");
  });
});

describe('<NumberOfEvents /> component', () => {
    test('number of events text box value changes when the user types in it', async () => {
      const setErrorAlertMock = jest.fn(); // Mock function for setErrorAlert
      const setCurrentNOEMock = jest.fn(); // Mock function for setCurrentNOE
      const { getByTestId } = render(
        <NumberOfEvents 
          currentNOE={32} 
          setCurrentNOE={setCurrentNOEMock} 
          setErrorAlert={setErrorAlertMock} 
        />
      );
  
      const numberTextBox = getByTestId('numberOfEventsInput');
  
      // Type an invalid value
      await userEvent.clear(numberTextBox);
      await userEvent.type(numberTextBox, '50');
      expect(setErrorAlertMock).toHaveBeenCalledWith("Only a maximum of 32 is allowed");
  
      // Clear and type a valid value
      await userEvent.clear(numberTextBox);
      await userEvent.type(numberTextBox, '10');
      expect(setErrorAlertMock).toHaveBeenCalledWith('');
      expect(setCurrentNOEMock).toHaveBeenCalledWith('10'); // Verify setCurrentNOE was called with '10'
    });
  });

describe('<CitySearch /> integration', () => {
  test('filters events by city when a suggestion is selected', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const CitySearchDOM = AppComponent.getByTestId('city-search');
    const CitySearchInput = within(CitySearchDOM).getByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).getByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppComponent.getByTestId('event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    const berlinEvents = (await getEvents()).filter(event => event.location === 'Berlin, Germany');

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('shows all events when "See all cities" is selected', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const CitySearchDOM = AppComponent.getByTestId('city-search');
    const CitySearchInput = within(CitySearchDOM).getByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const seeAllCitiesItem = within(CitySearchDOM).getByText('See all cities');
    await user.click(seeAllCitiesItem);

    const EventListDOM = AppComponent.getByTestId('event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    const allEvents = await getEvents();

    expect(allRenderedEventItems.length).toBe(allEvents.slice(0, 32).length);
  });
});
