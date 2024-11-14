import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value <= 0) {
      setErrorAlert("Enter a valid number");
    } else if (value > 32) {
      setErrorAlert("Only a maximum of 32 is allowed");
    } else {
      setErrorAlert("");
      setCurrentNOE(value);
      console.log("Rendering NumberOfEvents with currentNOE:", currentNOE);
    }
    setNumber(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="number"
        id="number-of-events-input"
        name="numberOfEvents"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
