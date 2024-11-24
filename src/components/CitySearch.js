import React, { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(["See all cities", ...allLocations]);
  }, [allLocations]); 

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredLocations =
      allLocations && allLocations.length > 0
        ? allLocations.filter((location) =>
            location.toLowerCase().includes(value.toLowerCase())
          )
        : [];

    const filteredSuggestions = value === ""
      ? ["See all cities", ...allLocations]
      : ["See all cities", ...filteredLocations];

    setSuggestions(filteredSuggestions);

    if (filteredLocations.length === 0) {
      setInfoAlert("We cannot find the city you are looking for. Please try another city.");
    } else {
      setInfoAlert("");
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("")
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        data-testid="city-search-input"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        id="city-search-input"
        name="city-search"
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
