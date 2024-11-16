import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");


  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" || !currentCity
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);  
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));

  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
      />
      <NumberOfEvents 
        setErrorAlert={setErrorAlert}
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
      <EventList events={events} />
    </div>
  );
  
}

export default App;