import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let sampleEvent = mockData[0];
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('When a user selects an event, show the full description', ({ given, when, then }) => {
    given('the user is viewing a list of events', () => {
      render(<Event event={sampleEvent} />);
    });

    when('the user selects an event to view its details', async () => {
      await user.click(screen.getByText('Show Details'));
    });

    then('the user should see the full description of that event', () => {
      expect(screen.getByTestId('event-details')).toBeInTheDocument();
      expect(screen.getByTestId('event-details').textContent).toBe(sampleEvent.description);
    });
  });

  test('When a user hides an event, retract the description', ({ given, when, then }) => {
    given('the user is viewing the full description of an event', async () => {
      render(<Event event={sampleEvent} />);
      await user.click(screen.getByText('Show Details'));
      expect(screen.getByTestId('event-details')).toBeInTheDocument();
    });

    when('the user chooses to hide the event details', async () => {
      await user.click(screen.getByText('Hide Details'));
    });

    then('only the title or summary of the event should display', () => {
      expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
      expect(screen.getByText(sampleEvent.summary)).toBeInTheDocument();
    });
  });
});
