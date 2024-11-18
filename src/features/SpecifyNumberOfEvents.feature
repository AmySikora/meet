Feature: Event Management Features
  As an app user,
  I should be able to manage events in various ways
  So that I can customize my experience and make better decisions.

  # Specify Number of Events
  Scenario: When a user determines the number of events they want to see, display only that number of events
    Given the user is on the events display settings
    When the user specifies the number of events to display (e.g., 5, 10, or 20)
    Then only that specified number of events should be shown on the screen


