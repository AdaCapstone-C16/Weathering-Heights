import { useState, useEffect, useRef } from 'react';
import { ref, update } from "firebase/database";
import { db } from './../firebase.js';
import axios from "axios";
import PropTypes from 'prop-types';

const UpdateWeatherButton = ({ coordinates, peakList, signalDBPull }) => {
    
    const getNextSaturday = () => {
        // Calculates date for next coming Saturday, returns Sunday if today is Sunday
        const forecast = new Date();
        const day = forecast.getDay();
        const date = forecast.getDate();
        
        // Pull current weather for Sunday
        if (day === 0) 
            return forecast;
        // Pull current weather for Saturday
        else if (day === 6) 
            return forecast;
        // All other days of the week will pull from upcoming Saturday
        else {
            const tilSaturday = 6 - day
            const newDate = date + tilSaturday;
            forecast.setDate(newDate);
            
            // console.log(forecast);
            return forecast;
        }
    }

    const formatDate = (date) => {
        // Formats date to => 2022-02-12
        const d = new Date(date);
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;
        let year = `${d.getFullYear()}`;

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // Pulls new data from weather API, posts to DB
    const updateWeather = () => {
        console.log("inside updateWEather")
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`

        if (coordinates !== []) {
            // Make API call for each set of peak coordinates
            for (let i = 0; i < Object.keys(coordinates).length; i++) {
                // Lat, Lon truncated to four decimals
                let lat = parseFloat(coordinates[i].lat)
                lat = lat.toFixed(4);
                let lon = parseFloat(coordinates[i].lon)
                lon = lon.toFixed(4);
                
                let key = peakList[i].key;

                // Date of forecast Saturday 
                const date = formatDate(getNextSaturday());

                    // TODO: Why are all the weather pulls the same?
                    // Forecast Weather API calls
                    axios
                    .get(`${baseURL}&q=${lat},${lon}&dt=${date}&aqi=no`)
                    .then((res) => {
                        console.log(res.data.forecast)
                        const now = res.data.forecast.forecastday[0].hour[12];
                        // Updates temperature data in DB
                        update(ref(db, 'peaks/' + key), {
                        temp: now.temp_f,
                        chance_precip: now.chance_of_rain,
                        wind_speed: now.wind_mph,
                        wind_direction: `${now.wind_dir}`,
                    });
                })
                .catch((err) => {
                    console.log(err.data);
                });
            }
            // Initiate new pull from DB to update state 
            signalDBPull();
        }
    }
    
    return (
        <>
            <button onClick={() => updateWeather()}>Refresh Weather</button>
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