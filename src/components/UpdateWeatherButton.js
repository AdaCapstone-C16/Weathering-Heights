import { ref, update } from "firebase/database";
import { db } from './../firebase.js';
import axios from "axios";
import PropTypes from 'prop-types';
import KEYS from "./firebase_api_key";

const UpdateWeatherButton = ({ coordinates, peakList, signalDBPull }) => {
    
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

    const getNextSaturdayWeatherAPI = () => {
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
            
            const saturdayDate = formatDate(forecast)
            return saturdayDate;
        }
    }

    const getNextSaturdayNWS = (date, data) => {
        // Retrieves upcoming Saturday's daytime forecast at 06:00-08:00
        // Find index that matches named forecast for "Saturday"
        const forecast = data.findIndex(period => period.name === "Saturday");
        return forecast;
    }

    // Pulls new data from weather API, posts to DB
    const updateWeather = () => {
        const apiKey = KEYS['REACT_APP_WEATHER_API_KEY'];
        const WeatherAPIURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`
        const NWSURL = 'https://api.weather.gov/points'

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
                const date = getNextSaturdayWeatherAPI();
                
                // Forecast Weather API calls
                axios
                // .get(`${WeatherAPIURL}&q=${lat},${lon}&dt=${date}&aqi=no`)
                // .then((res) => {
                //     const now = res.data.forecast.forecastday[0].hour[12];
                //     // Updates temperature data in DB
                //     update(ref(db, 'peaks/' + key), {
                //     chance_precip: now.chance_of_rain,
                // });
                // })
                .get(`${NWSURL}/${lat},${lon}`)
                .then((res) => {
                    const forecast_link = res.data.properties.forecast
                    return axios.get(`${forecast_link}`);
                })
                .then((res) => {
                    // Retrieves entire forecast
                    let forecastAll = res.data.properties.periods;
                    // Finds index for named "Saturday" forecast
                    let index = getNextSaturdayNWS(date, forecastAll);
                    // Gets forecast data for Saturday
                    let saturday = forecastAll[index];
                    let temp = saturday.temperature;
                    let windDirection = `${saturday.windDirection}`;
                    let windSpeed = saturday.windSpeed;
                    
                    // Formats windSpeed
                    windSpeed = windSpeed.slice(0, 2);
                    windSpeed = windSpeed.replaceAll(' ', '');
                    
                    // Updates temperature data in DB
                    update(ref(db, 'peaks/' + key), {
                        temp: temp,
                        wind_speed: parseInt(windSpeed),
                        wind_direction: windDirection,
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