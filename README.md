Meet App
The Meet App is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. It uses the Google Calendar API to help users discover and visualize upcoming events in various cities.

Objective
To create a serverless PWA that delivers a responsive, offline-ready experience for event discovery using a TDD approach, ensuring reliability and high-quality code.

Context
With a serverless architecture, Meet App requires no backend maintenance and scales easily, while PWA features like offline support and home screen shortcuts provide a seamless user experience. Through TDD, tests guide each feature’s development, and data visualization tools make it easy to interpret event data at a glance.

Key Features
The app allows users to:

Filter Events by City: Search for events in a specific city.
Show/Hide Event Details: Expand and retract event descriptions.
Specify Number of Events: Control the number of displayed events.
Use the App When Offline: Access previously loaded events offline.
Add an App Shortcut to the Home Screen: Quickly access the app with a single tap.
Display Charts Visualizing Event Details:
Scatterplot: Visualize the number of events per location.
Pie Chart: Show the popularity of different event genres.
User Stories and Scenarios

1. Filter Events by City
As an app user, I should be able to filter events by city so that I can find events happening in a specific location.

Scenario 1 - When a user has not searched for a specific city, show upcoming events from all cities
  Given - the user hasn’t searched for any city
  When - the user opens the app
  Then - the user should see a list of all upcoming events

Scenario 2 - User should see a list of suggestions when they search for a city
  Given - the main page is open
  When - the user starts typing in the city textbox
  Then - the user should receive a list of cities (suggestions) that match what they’ve typed

Scenario 3 - User can select a city from the suggested list
  Given - the user was typing “Las Vegas” in the city textbox and the list of cities is showing
  When - the user selects a city (e.g., Las Vegas, Nevada) from the list
  Then - their city should be changed to that city, and the user should see a list of upcoming events in that city

2. Show/Hide Event Details
As an app user, I should be able to expand and retract event descriptions so that I can read more details about the event and then retract them when I’m done.

Scenario 1 - When a user selects an event, show the full description
  Given - the user is viewing a list of events
  When - the user selects an event to view its details
  Then - the user should see the full description of that event

Scenario 2 - When a user hides an event, retract the description
  Given - the user is viewing the full description of an event
  When - the user chooses to hide the event details
  Then - only the title or summary of the event should display

3. Specify Number of Events
As an app user, I should be able to specify the number of events I’d like to see so that I can determine the number of events to attend.

Scenario 1 - When a user determines the number of events they want to see, display only that number of events
  Given - the user is on the events display settings
  When - the user specifies the number of events to display (e.g., 5, 10, or 20)
  Then - only that specified number of events should be shown on the screen

4. Use the App When Offline
As an app user, I should be able to use the app when I am not online so that I can still use it when I don’t have internet access.

Scenario 1 - When a user goes offline, allow access to previously loaded events
  Given - the user has opened the app and loaded events while connected to the internet
  When - the user loses internet connectivity
  Then - the user should still be able to view the events that were loaded

5. Add an App Shortcut to the Home Screen
As an app user, I should be able to add a shortcut to the app onto my home screen so that I don’t have to hunt around for it.

Scenario 1 - When a user adds a shortcut, create an icon on the home screen
  Given - the user is using the app on a mobile device
  When - the user selects the option to add a shortcut to the home screen
  Then - an app icon should appear on the user’s home screen
  And - tapping the icon should open the app directly

6. Display Charts Visualizing Event Details
As an app user, I should be able to see charts of event details so that I can determine which events interest me.

Scenario 1 - When a user opens a chart, display event details visually
  Given - the user is on the event analysis page
  When - the user opens a chart to view event details by category, date, or other criteria
  Then - the user should see a graphical representation of the events
  And - the chart should display the event details accurately