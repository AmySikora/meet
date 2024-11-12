// src/components/NumberOfEvents.js
import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(currentNOE);
    
    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value, 10);
        setNumber(value);

        if (isNaN(value) || value <= 0) {
            setErrorAlert("Enter a valid number");
        } else if (value > 32) {
            setErrorAlert("Only a maximum of 32 is allowed");
        } else {
            setErrorAlert("");
            setCurrentNOE(value);
        }
    };

    return (
        <div id="number-of-events">
            <label>
                Number of Events:
                <input 
                    type="number"
                    value={number}
                    onChange={handleInputChanged}
                    data-testid="numberOfEventsInput"
                    min="1"
                    max="32"
                />
            </label>
        </div>
    );
};

export default NumberOfEvents;
