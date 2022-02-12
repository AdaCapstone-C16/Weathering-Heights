//for all purposes, this is basically the peakList 
//-----------------------------------------------{imports}------------------------------------------------------//
import React, { useState, useContext } from 'react';
import { Data } from "./Data";
import { threePeaks } from "./Data";
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CalendarForm from './CalendarForm';
import './stylesheets/Accordion.css';
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
    flex-direction: column;
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

// const Dropdown = styled.div`
// background: #DEDFEC;
// color: #000000;
//     display: flex;
//     flex-direction: column;
//     align-items: left;
//     border-bottom: 1px solid #000000;
//     border-top: 1px solid #000000;
//     border-radius: 25px;
//     margin-left: 30px;
//     margin-right: 30px;
    
//     p{
//         font-size: 1rem;
//     }
// `;


//-----------------------------------------------{Accordion Function}------------------------------------------------------//

const Accordion = (props) => {

    //const a = useContext(peaksContext)

    //Dummy data for the dynamic parameters
    let temp = 101;
    let precip = 0;
    let wind = 101;

    const bulgerList = props.data;
    //lift this state
    const [clicked, setClicked] = useState(false);
    const [selectedPeak, setSelectedPeak] = useState(null);
    const [selectedPeakWeather, setSelectedPeakWeather] = useState(null);
    const [sortby, setSortby] = useState('default');
    // console.log("Inside accordion")
    // console.log(props);

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
        {/* <input type="submit" value="Summit! 🏔️"/> */}
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
        
        //objs.sort( compare );



    //create a function to actually get the render, take in the sort category as an argument
    //This function should take in a parameter and then call a helper function and send it the sort criteria 
    //input: category 
    //output: sorted result 
    
    const getSortedList = (category) => {

        const peaksSorted = [...bulgerList];
        //const peaksSorted = [...threePeaks];
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

        // const resultJSX = testJSX(peaksSorted);
        // return resultJSX;
    }

    //-----------------------------------------------{JSX}------------------------------------------------------//

    return (
    <div>
    <CalendarForm className='cal-form' mountain={selectedPeak} weather={selectedPeakWeather}></CalendarForm>
    <IconContext.Provider value={{color : '#CCA19A', size : '25px'}}>
        <AccordionSection>
            <Container>
            <div className='option-bar'>
                <button className='refresh'>Refresh Weather</button>
                {selection}
            </div>
            {console.log(sortby)}
            <div className='accordion-card'>
            <div className='accordion-title'>100 Peaks of Washington</div>
            {getSortedList(sortby).map((item, index) => { 
                return(
                    <>
                    <Wrap onClick={()=> toggle(index)} key={index}>
                    <div className="grid-container">
                        <div className="bigItem">{item.name}</div>
                        <div className="item">Temp: {item.temp} °F</div>
                        <div className="item">Wind: {item.windSpeed} {item.windDir}</div>
                        <div className="item">Precip: {item.chance_precip}%</div>
                    </div>
                        <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                    </Wrap>
                    {clicked === index ? 
                        <Dropdown>
                        <div> 🥇 {item.rank}</div> 
                        <div> ❕ {item.indigenous_name}</div>
                        <div> 🧗 {item.elevation}</div>
                        <div> 🔗 {item.link}</div>
                        <div> 📍 {item.coordinates}</div>
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