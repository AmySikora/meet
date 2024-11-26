import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert } from "./components/Alert";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");
  const [infoAlert, setInfoAlert] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities" || !currentCity
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorAlert("Failed to fetch events. Please try again later.");
    }
  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="header">
        <div className="title">
          <h1>Meet App</h1>
            <p>Search for a city</p>
        </div>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setErrorAlert={setErrorAlert}
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
       </header>
      <EventList events={events} />
    </div>
  );
};

export default App;
