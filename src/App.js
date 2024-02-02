import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [disableState, setDisableState] = useState(true);
  const [disableCity, setDisableCity] = useState(true);
  const [selectedData, setSelectedData] = useState('');

  const handleCountryChange = async (e) =>{
    const country = e.target.value;
    setSelectedCountry(country);
    setDisableState(false);
    const stateEndpoint = `https://crio-location-selector.onrender.com/country=${country}/states`;
    try {
      const res = await axios.get(stateEndpoint);
      setStates(res.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  }

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setDisableCity(false);
    const cityEndpoint = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`;
    try {
      const res = await axios.get(cityEndpoint);
      setCities(res.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedData(
      <div>
        <b>You selected <span style={{fontWeight:'bolder',fontSize:'20px'}}>{city}</span>, <span style={{ color: 'grey' }}>{selectedState}, {selectedCountry}</span></b>
      </div>
    );
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(res.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    fetchCountries();
  }, []);

  const styleForSelected = {
    margin:'10px'
  }

  return (
    <div>
      <h1>Select Location</h1>
      <div>
      <select style={styleForSelected} value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <select style={styleForSelected} value={selectedState} disabled={disableState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select style={styleForSelected} value={selectedCity} disabled={disableCity} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      </div>
      <div>{selectedData}</div>
    </div>
  );
}

export default App;
