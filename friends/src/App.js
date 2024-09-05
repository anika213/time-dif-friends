import React, { useState } from 'react';
import './App.css';
import pic1 from './pic1.jpg';
import pic2 from './pic2.jpg';
import pic3 from './pic3.png';
import pic4 from './pic4.png';
import pic5 from './pic5.png';
import pic6 from './pic6.png';
import pic7 from './pic7.png';



function App() {
  const [selectedCountry, setSelectedCountry] = useState('singapore');
  const [selectedTime, setSelectedTime] = useState('');
  const [calculatedTimes, setCalculatedTimes] = useState({});

  const timeOffsets = {
    singapore: 8,
    india: 5.5,
    pacific: -7,
    eastern: -4,
    sydney: 10
  };

  const handleCalculate = () => {
    if (!selectedTime) return;
  
    // Get hours and minutes from the input value
    const [hours, minutes] = selectedTime.split(':').map(Number);
  
    // Create a new Date object for the selected country
    const selectedTimeDate = new Date();
    selectedTimeDate.setHours(hours);
    selectedTimeDate.setMinutes(minutes);
  
    const baseOffset = timeOffsets[selectedCountry];
    const updatedTimes = {};
  
    // Calculate the time difference for all other countries
    Object.keys(timeOffsets).forEach((key) => {
      if (key !== selectedCountry) {
        const offsetDifference = timeOffsets[key] - baseOffset;
        const hourDifference = Math.floor(offsetDifference);
        const minuteDifference = (offsetDifference % 1) * 60;
  
        const newDate = new Date(selectedTimeDate);
        newDate.setHours(newDate.getHours() + hourDifference);
        newDate.setMinutes(newDate.getMinutes() + minuteDifference);
  
        const updatedHours = String(newDate.getHours()).padStart(2, '0');
        const updatedMinutes = String(newDate.getMinutes()).padStart(2, '0');
  
        updatedTimes[key] = `${updatedHours}:${updatedMinutes}`;
      }
    });
  
    // Update the state with the new calculated times
    setCalculatedTimes(updatedTimes);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <p>Time differences - you guys are so welcome</p>


        <div className="dropdown-container">
          <label>
            Select country:
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {Object.keys(timeOffsets).map((country) => (
                <option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="time-input-container">
          <label>
            Select time:
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </label>
        </div>

        <button className="calculate-button" onClick={handleCalculate}>
          Calculate
        </button>

        {Object.keys(calculatedTimes).length > 0 && (
          <div className="result-container">
            <h3>Calculated Times</h3>
            <ul>
              {Object.keys(calculatedTimes).map((country) => (
                <li key={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1)}: {calculatedTimes[country]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <div className="pics"> 
      <img src={pic1} />
      <img src={pic2} />
      <img src={pic3}  />
      <img src={pic4} />
      <img src={pic5} />
      <img src={pic6} />
      <img src={pic7} />  


    </div>
    </div>
  );
}

export default App;
