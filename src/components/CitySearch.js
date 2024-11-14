import React, { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(["See all cities", ...allLocations]);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? ["See all cities", ...allLocations.filter(location => 
          location.toUpperCase().indexOf(value.toUpperCase()) > -1
        )]
      : ["See all cities"];
      
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value === "See all cities" ? "" : value);
  };

  return (
    <div id="city-search">
      <input
          type="text"
          className="city"
          placeholder="Search for a city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
          id="city-search-input"      
          name="city-search"          
        />

      {showSuggestions && (
        <ul className="suggestions">
          
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
