import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/Misc.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const AddTrip = ({trigger, setTrigger, addTrip}) => {

    const [selectedDate, setSelectedDate] = useState(null)
    const [tripNotes, setTripNotes] = useState(null)

    
    const handleSelectedDate =(date) =>{
        setSelectedDate(date)
    }
    
    const handleTripNotes = (input) => {
        setTripNotes(input.target.value)
    }
    
    const parseDate = () => {
        let strDate = JSON.stringify(selectedDate)
        let year = strDate.slice(1, 5)
        let day = strDate.slice(9,11)
        let mnth = strDate.slice(6,8)
        const dateFinal = [mnth, day, year].join("-")
        return dateFinal
    }
    
    const handleClose = () => {
        const date = parseDate()
        addTrip(date,tripNotes)
        setTrigger(false) 
    }

    const handleCancel = () => {
        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="container-outer">
            <div className="container">
                <h2 className='title'>ADD NEW TRIP REPORT</h2>
                <form className='upper-container'>
                    <div className='date-container'>
                        <label className='title-2'> SELECT DATE:</label>
                        <DatePicker selected={selectedDate} onChange={handleSelectedDate}></DatePicker>

                    </div>
                    <textarea rows="5" cols="75" placeholder='ENTER TRIP NOTES HERE... ' onChange={handleTripNotes}></textarea>
                </form>
                <section className='button-container'>
                    <button className="close-button button" onClick={handleClose}>Add!</button>
                    <button  className="button"onClick={handleCancel}>Cancel</button>
                </section>
            </div>
        </div>
    ): "";
}

AddTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    addTrip: PropTypes.func.isRequired
    };
export default AddTrip