// src/App.js
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';

const App = () => {
 return (
   <div className="App">
     <EventList />
     <CitySearch />
   </div>
 );
}

export default App;