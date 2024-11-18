Feature: Show/Hide Event Details
  As an app user,
  I should be able to expand and retract event descriptions
  So that I can read more details about the event and then retract them when I’m done.

  Scenario: When a user selects an event, show the full description
    Given the user is viewing a list of events
    When the user selects an event to view its details
    Then the user should see the full description of that event

  Scenario: When a user hides an event, retract the description
    Given the user is viewing the full description of an event
    When the user chooses to hide the event details
    Then only the title or summary of the event should display
