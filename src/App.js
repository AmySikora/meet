// src/App.js
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
 return (
   <div className="App">
     <EventList />
     <CitySearch />
     <NumberOfEvents
      />
    </div>
 );
}

export default App;