//for all purposes, this is basically the peakList 
//-----------------------------------------------{imports}------------------------------------------------------//
import React, { useState, useEffect } from 'react';
import { ref, get } from "firebase/database";
import { db } from './../firebase.js';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CalendarForm from './CalendarForm';
import UpdateWeatherButton from './UpdateWeatherButton';
import Map from './Map';
import './stylesheets/Accordion.css';
import './stylesheets/Map.css';

// import peaksContext from '../contexts/peaksContext';

//-----------------------------------------------{styled componenets css}------------------------------------------------------//

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #fff;
    margin-top: 2%;
    font-family: 'Montserrat', sans-serif;
`;
const Container = styled.div`
    background: #fff;
    position: absolute;
    align-self: center;
    top: 30%;
    border-radius: 25px;
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
    background-color: #DEDFEC;

    .sort-form{
        border-radius: 5px;
        margin-top: 1%;
        margin-bottom: 1%;
        float: right;
    }
    .scroll {
        height:675px;
    }
    
    .scroll {
        overflow:hidden; 
        overflow-y:scroll;
    }
`;

const Wrap = styled.div`
    background: #504C54;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-self: center;
    align-items: center;
    width: 100%
    text-align: center;
    cursor: pointer;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    

    h1{
        padding: 2rem;
        font-size: 1rem;
    }

    span{
        margin-right: 1.5rem;
    }

    .bigItem {
        grid-area: myArea;
        font-size: 2rem;
    }
    .item{
        font-size: 1rem;
    }
    
    .grid-container {
        display: grid;
        grid-template-areas: 'myArea myArea . . .';
        grid-gap: 10px;
        background: #272727;
        padding: 10px;
        border-radius: 25px;
        background-color: #504C54;
    }
    
    .grid-container > div {
        text-align: center;
        padding: 20px;
        border-radius: 25px;        
    }
`;

const Dropdown = styled.div`
    background: #504C54;
    color: white;
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: left;
    border-bottom: 5px solid #CCA19A;
    border-top: 5px solid #CCA19A;
    border-left: 5px solid #CCA19A;
    border-right: 5px solid #CCA19A;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;

    div{
        font-size: 1rem;
        text-indent: 35px;
    }
`;

//-----------------------------------------------{Accordion Function}------------------------------------------------------//

const Accordion = (props) => {

    const bulgerList = props.data;
    //lift this state
    const [clicked, setClicked] = useState(false);
    const [selectedPeak, setSelectedPeak] = useState(null);
    const [selectedPeakWeather, setSelectedPeakWeather] = useState(null);
    const [sortby, setSortby] = useState('default');

    const [selectedIndex, setSelectedIndex] = useState()
    const [mapPopup, setMapPopup] = useState(false)
    const [selectedLink, setSelectedLink] = useState(null)

    const [weatherFor, setWeatherFor] = useState(null);

    useEffect(() => {
        get(ref(db, '/last_weather_pull'))
        .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const forecast = data.forecast;
              updateWeatherFor(forecast);
            } else {
              console.log("No data available");
            }
        })
    }, [])

    const updateWeatherFor = (date) => {
        setWeatherFor(date);
    }

    const handleMapPopup = () => {
        setMapPopup(true)
        bulgerList.forEach(peak => {
            if (peak.name===selectedPeak) {
                setSelectedIndex(peak.key)
            }
        });
    }

    const toggle = (index) => {
        //if clicked question is already open, then close it 
        //raise this handler 
        if(clicked === index){
            return setClicked(null);
        }
        setClicked(index)
        const myList = getSortedList(sortby);
        setSelectedPeak(myList[index].name)
        setSelectedPeakWeather([myList[index].temp, myList[index].windSpeed, myList[index].windDir, myList[index].chance_precip])
        setSelectedLink(myList[index].link)
    }

    //pass the correct JSX to return/render
    //this is the selection dropdown menu
    let option = null;
    const selection = (
    <form className='sort-form'>
        <label for="weather">Sort by:</label>
        <select name="weather-parameter" id="weather-parameter" onChange={(e)=>{
            option = e.target.value;
            setSortby(option);

        }}>
            <option value="default">Default</option>
            <option value="temp asc">Temperature - asc</option>
            <option value="temp desc">Temperature - desc</option>
            <option value="wind asc">Wind Speed - asc</option>
            <option value="wind desc">Wind Speed - desc</option>
            <option value="precip asc">Precipitation - asc</option>
            <option value="precip desc">Precipitation - desc</option>
        </select>
        {/* <input type="submit" value="Summit! ???????"/> */}
    </form>
    );
    
    function compareTempASC( a, b ) {
        return (a.temp - b.temp);
    }
    function compareTempDESC( a, b ) {
        return (b.temp - a.temp);
    }
    function compareWindASC( a, b ) {
        return (a.windSpeed - b.windSpeed);
    }
    function compareWindDESC( a, b ) {
        return (b.windSpeed - a.windSpeed);
    }
    function comparePrecipASC( a, b ) {
        return (a.chance_precip - b.chance_precip);
    }
    function comparePrecipDESC( a, b ) {
        return (b.chance_precip - a.chance_precip);
    }
    
    const getSortedList = (category) => {

        const peaksSorted = [...bulgerList];
        
        if(category === 'temp asc'){
            peaksSorted.sort( compareTempASC );
        }
        else if(category === 'temp desc'){
            peaksSorted.sort( compareTempDESC );
        }
        else if(category === 'wind asc'){
            peaksSorted.sort( compareWindASC );
        }
        else if(category === 'wind desc'){
            peaksSorted.sort( compareWindDESC );
        }
        else if(category === 'precip asc'){
            peaksSorted.sort( comparePrecipASC );
        }
        else if(category === 'precip desc'){
            peaksSorted.sort( comparePrecipDESC );
        }
        return peaksSorted;
    }

    //-----------------------------------------------{JSX}------------------------------------------------------//

    return (
    <div>

    <CalendarForm className='cal-form' mountain={selectedPeak} weather={selectedPeakWeather}></CalendarForm>
    <IconContext.Provider value={{color : '#CCA19A', size : '25px'}}>
        <AccordionSection>
            <Container className='scroll'>
                <div className='accordion-card'>
                    <div className='accordion-title'>The Bulger List: Washington's Tallest 100 Peaks</div>
                        <div className="weather-for">Weather for: {weatherFor}</div>
                        <div className='option-bar'>
                            {selection}
                        </div>
                        {console.log(sortby)}
                        
                        <UpdateWeatherButton 
                                id='refresh'
                                peakList={props.data}  
                                coordinates={props.coordinates}
                                signalDBPull={props.signalDBPull}
                                updateWeatherFor={updateWeatherFor} />
                        
            
            {/* <p>Washington's Tallest 100 Peaks</p> */}
            {getSortedList(sortby).map((item, index) => { 
                return(
                    <>
                    <Wrap onClick={()=> toggle(index)} key={index}>
                    <div className="grid-container">
                        <div className="bigItem">{item.name}</div>
                        <div className="item">Temp: {item.temp} ??F</div>
                        <div className="item">Wind: {item.windSpeed} {item.windDir}</div>
                        <div className="item">Precip: {item.chance_precip}%</div>
                    </div>
                        <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                    </Wrap>
                    {clicked === index ? 
                        <Dropdown>
                            <div>
                                <div> ????   Rank:   {item.rank}</div> 
                                <div> ???   Indigenous Name: --  {item.indigenous_name}</div>
                                <div> ????   Elevation:   {item.elevation} ft.</div>
                                <div> ????   Peak Bagger's Link:   <a href={'https://www.peakbagger.com/'+item.link}>{item.name}</a></div>
                                <div> ????   Coordinates:   {item.coordinates[0]}, {item.coordinates[1]}</div>
                            </div>
                            <div className='seemap-btn-loc'>
                                <button onClick={handleMapPopup} className='seemap-btn'>SEE MAP</button>
                                <Map trigger={mapPopup} setTrigger={setMapPopup} index={selectedIndex} name={selectedPeak} link={selectedLink}/>
                            </div>
                        </Dropdown>:
                        null}
                    </>
                )
            })
            }
            </div>
            </Container>
        </AccordionSection>
    </IconContext.Provider>
    </div>
    );

};
export default Accordion