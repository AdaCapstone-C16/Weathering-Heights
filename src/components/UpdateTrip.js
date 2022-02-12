import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
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
        <div className="popup">
            <div className="popup-inner">
                <h2>Would you like to update this trip?</h2>
                <form>
                    <label>Update Trip {date}:</label>
                    <textarea rows="5" cols="33" placeholder='Enter trip notes!' onChange={handleTripNotes}></textarea>
                </form>
                <button  onClick={handleCancel}>Cancel</button>
                <button  onClick={handleYes}>Submit</button>
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