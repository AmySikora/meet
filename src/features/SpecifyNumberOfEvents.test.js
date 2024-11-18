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

    when('the user specifies the number of events to display (e.g., 5, 10, or 20)', async () => {
      const numberInput = screen.getByTestId('numberOfEventsInput'); // Match the rendered DOM
      await user.clear(numberInput); // Clear any existing value
      await user.type(numberInput, '5'); // Enter '5' as the desired number
    });

    then('only that specified number of events should be shown on the screen', async () => {
      const EventListItems = await screen.findAllByRole('listitem'); // Ensure your events are rendered as `listitem` roles
      expect(EventListItems).toHaveLength(5); // Verify the length matches the specified number
    });
  });
});
