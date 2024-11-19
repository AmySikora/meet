import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('When a user determines the number of events they want to see, display only that number of events', ({ given, when, then }) => {
    let AppComponent;

    given('the user is on the events display settings', () => {
      AppComponent = render(<App />);
    });

    when(/^the user specifies the number of events to display \(e.g., (\d+), (\d+), or (\d+)\)$/, async (arg0, arg1, arg2) => {
      const numberInput = screen.getByTestId('numberOfEventsInput'); 
      await user.clear(numberInput); 
      await user.type(numberInput, '5'); 
    });

    then('only that specified number of events should be shown on the screen', async () => {
      const EventListItems = await screen.findAllByRole('listitem'); 
      expect(EventListItems).toHaveLength(5); 
    });
  });
});
