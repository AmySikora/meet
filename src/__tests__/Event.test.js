// src/__tests__/Event.test.js

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import mockData from "../mock-data";

const sampleEvent = mockData[0];

describe('<Event /> Component', () => {
  beforeEach(() => {
    render(<Event event={sampleEvent} />);
  });

  test('displays event title', () => {
    expect(screen.getByText(sampleEvent.summary)).toBeInTheDocument();
  });

  test('shows event start time', () => {
    expect(screen.getByText(sampleEvent.created)).toBeInTheDocument();
  });

  test('displays event location', () => {
    expect(screen.getByText(sampleEvent.location)).toBeInTheDocument();
  });

  test('includes a "Show Details" button', () => {
    expect(screen.getByText("Show Details")).toBeInTheDocument();
  });

  test('displays details when "Show Details" button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("Show Details"));
    
    const detailsSection = screen.getByTestId('event-details');
    expect(detailsSection).toBeInTheDocument();
  });

  test('hides details when "Hide Details" button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("Show Details"));
    await user.click(screen.getByText("Hide Details"));

    const detailsSection = screen.queryByTestId('event-details');
    expect(detailsSection).not.toBeInTheDocument();
  });
});