import { useState, useEffect } from 'react';
import { ref, get, set, update } from "firebase/database";
import { db } from './../firebase.js';
import axios from "axios";
import PropTypes from 'prop-types';
import KEYS from "./firebase_api_key";
import { getNextSaturdayNWS, getNextSaturdayWeatherAPI } from '../utils/UpdateWeatherButtonUtils';
import './stylesheets/UpdateWeatherButton.css';

const UpdateWeatherButton = ({ coordinates, peakList, signalDBPull, updateWeatherFor }) => {
    const [lastPull, setLastPull] =  useState();

    // Populates last weather pull timestamp from db
    useEffect(() => {
        get(ref(db, '/last_weather_pull'))
        .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const time = data.time;
              setLastPull(time);
            } else {
              console.log("No data available");
            }
        })
    }, []);

    // Pulls new data from weather API, posts to DB
    const updateWeather = () => {
        // Timestamp & formatting
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timestamp = now.toLocaleTimeString(undefined, options);

        const apiKey = KEYS['REACT_APP_WEATHER_API_KEY'];
        const WeatherAPIURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;
        const NWSURL = 'https://api.weather.gov/points';

        if (coordinates !== []) {
            // Make API call for each set of peak coordinates

            // Weekend date formatted for render
            let forecast = getNextSaturdayWeatherAPI()[0];
            forecast.setHours(6, 0, 0);
            forecast = forecast.toLocaleTimeString(undefined, options)

            // Weekend date formatted for API call
            const date = getNextSaturdayWeatherAPI()[1];

            for (let i = 0; i < Object.keys(coordinates).length; i++) {
                // Lat, Lon truncated to four decimals
                let lat = parseFloat(coordinates[i].lat)
                lat = lat.toFixed(4);
                let lon = parseFloat(coordinates[i].lon)
                lon = lon.toFixed(4);
                
                let key = peakList[i].key;
                
                // Forecast Weather API calls
                // axios
                // .get(`${WeatherAPIURL}&q=${lat},${lon}&dt=${date}&aqi=no`)
                // .then((res) => {
                //     const now = res.data.forecast.forecastday[0].hour[6];
                //     // Updates precip data in DB
                //     update(ref(db, 'peaks/' + key), {
                //         chance_precip: now.chance_of_rain,
                //     });
                // }).catch((err) => {
                //     console.log(err.data);
                // });

                // axios
                // .get(`${NWSURL}/${lat},${lon}`)
                // .then((res) => {
                //     console.log("are we even getting here")
                //     const forecast_link = res.data.properties.forecast
                //     return axios.get(`${forecast_link}`);
                // })
                // .then((res) => {
                //     // Retrieves entire forecast
                //     let forecastAll = res.data.properties.periods;
                //     // Finds index for named "Saturday" forecast
                //     let index = getNextSaturdayNWS(forecastAll);
                //     // Gets forecast data for Saturday
                //     let saturday = forecastAll[index];
                //     let temp = saturday.temperature;
                //     let windDirection = `${saturday.windDirection}`;
                //     let windSpeed = saturday.windSpeed;
                    
                //     // Formats windSpeed
                //     windSpeed = windSpeed.slice(0, 2);
                //     windSpeed = windSpeed.replaceAll(' ', '');
                    
                //     // Updates temperature data in DB
                //     update(ref(db, 'peaks/' + key), {
                //         temp: temp,
                //         wind_speed: parseInt(windSpeed),
                //         wind_direction: windDirection,
                //     });
                // })
                // .catch((err) => {
                //     console.log(err.data);
                // });
            }
            // Initiate new pull from DB to update state 
            signalDBPull();

            // Update db & state for time of weather forecast
            update(ref(db, '/last_weather_pull'), {forecast: forecast});
            updateWeatherFor(forecast);
        }
        // Update db & state for timestamp of weather refresh
        update(ref(db, '/last_weather_pull'), {time: timestamp});
        setLastPull(timestamp);
    }
    
    return (
        <>
            <button className='refresh' onClick={() => updateWeather()}>Refresh Weather</button>
            <p>Last update: {lastPull}</p>
        </>
    )
};

UpdateWeatherButton.propTypes = {
    peakList: PropTypes.arrayOf(
        PropTypes.shape({
            chance_precip: PropTypes.number.isRequired,
            coordinates: PropTypes.arrayOf(PropTypes.string.isRequired,),
            elevation: PropTypes.string.isRequired,
            indigenous_name: PropTypes.string,
            key: PropTypes.number.isRequired,
            link: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            range: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired,
            temp: PropTypes.number.isRequired,
            windSpeed: PropTypes.number.isRequired,
            windDir: PropTypes.string.isRequired,
        })
    ),
    coordinates: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            lat: PropTypes.string.isRequired,
            lon: PropTypes.string.isRequired,
          })
        ),
    signalDBPull: PropTypes.func.isRequired,
  };

export default UpdateWeatherButton;