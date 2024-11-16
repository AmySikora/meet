// src/__tests__/CitySearch.test.js

import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let allLocations;

  beforeEach(async () => {
    const allEvents = await getEvents();
    allLocations = extractLocations(allEvents);
    CitySearchComponent = render(
      <CitySearch allLocations={[]} setCurrentCity={() => {}} />
    );
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city text box gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);

    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );
  
    const cityTextBox = CitySearchComponent.getByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const filteredLocations = allLocations.filter(location =>
      location.toLowerCase().includes('berlin')
    );
  
    const expectedSuggestions = ['See all cities', ...filteredLocations];
    const suggestionListItems = CitySearchComponent.getAllByRole('listitem');
  
    expect(suggestionListItems).toHaveLength(expectedSuggestions.length);
  
    expectedSuggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });
  

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole(
        'listitem'
      );
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
