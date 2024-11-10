// src/components/CitySearch.js

import { useState } from "react";

const CitySearch = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
      />
    </div>
  )
}

export default CitySearch;