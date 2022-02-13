import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/UpdateTrip.css'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const UpdateTrip = ({trigger, setTrigger, updateTrip, date}) => {
    const [tripNotes, setTripNotes] = useState(null)

    const handleTripNotes = (input) => {
        setTripNotes(input.target.value)
    }
    const handleYes = () => {
        console.log("you chose yes")
        updateTrip(date, tripNotes)
        setTrigger(false) 
    }

    const handleCancel = () => {
        console.log("you chose cancel")

        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="ut-container-outer">
            <div className="ut-container">
                <h2 className='ut-title'>UPDATE TRIP</h2>
                <form className='ut-upper-container'>
                    <label className='ut-title-2'>DATE: {date}</label>
                    <textarea rows="5" cols="70" placeholder='UPDATE TRIP NOTES HERE...' onChange={handleTripNotes}></textarea>
                </form>
                <div className='ut-button-container'>
                <button  className="ut-button" onClick={handleCancel}>CANCEL</button>
                <button className="ut-button" onClick={handleYes}>SUBMIT</button>
                </div>
            </div>
        </div>
    ): "";
}
UpdateTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    updateTrip: PropTypes.func.isRequired, 
    date: PropTypes.string.isRequired,
    };

export default UpdateTrip