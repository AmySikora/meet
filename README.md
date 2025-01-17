# Meet App

The **Meet App** is a serverless, progressive web application (PWA) built with **React**. It allows users to discover and visualize upcoming events in various cities while providing an offline-ready experience. Developed using a **test-driven development (TDD)** approach, the app ensures high-quality code and reliability.

---

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [User Stories & Scenarios](#user-stories--scenarios)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

---

## Objective

To create a serverless PWA that:
- Provides responsive and offline-ready functionality.
- Uses TDD to ensure reliability and maintainable code.
- Offers seamless event discovery and visualization features.

---

## Features

- **Filter Events by City**: Search for events in a specific city.
- **Show/Hide Event Details**: Expand and retract event descriptions.
- **Specify Number of Events**: Control the number of events displayed.
- **Offline Access**: Use the app offline with previously loaded data.
- **Add to Home Screen**: Install the app as a shortcut on mobile devices.
- **Visual Charts**: Analyze events using scatterplots and pie charts.

---

## User Stories & Scenarios

### Filter Events by City
**As a user, I want to filter events by city to find events in specific locations.**

- **Scenario 1**: Show events from all cities if no city is searched.
- **Scenario 2**: Display suggestions while typing a city name.
- **Scenario 3**: Show events in a specific city when selected from the suggestions.

### Show/Hide Event Details
**As a user, I want to expand and hide event details for more information.**

- **Scenario 1**: Expand event details when selected.
- **Scenario 2**: Retract event details to show only the title.

### Specify Number of Events
**As a user, I want to choose how many events are displayed.**

- **Scenario**: Show the number of events specified by the user.

### Use the App When Offline
**As a user, I want to access previously loaded events offline.**

- **Scenario**: Allow offline access to events loaded earlier.

### Add an App Shortcut to the Home Screen
**As a user, I want to add a shortcut to quickly access the app.**

- **Scenario**: Create an app icon on the home screen for easy access.

### Display Charts Visualizing Event Details
**As a user, I want visual representations of event details.**

- **Scenario**: Show scatterplots and pie charts for events by location and genre.

---

## Technologies Used

- **React**: Frontend framework for building the UI.
- **Google Calendar API**: Fetch event data for different cities.
- **Jest**: Testing framework for TDD.
- **Recharts**: For rendering scatterplots and pie charts.
- **Workbox**: For PWA offline functionality.
- **GitHub Pages**: Hosting the app for deployment.

---

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/).
- A Google Calendar API key is required to fetch event data.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meet-app.git
   cd meet-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:3000`.

### Deployment
This app is hosted on **GitHub Pages** and can be accessed [here](https://yourusername.github.io/meet-app/).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

