import React, {useState } from 'react';
import PropTypes from 'prop-types';
import DeleteTrip from './DeleteTrip';
import UpdateTrip from './UpdateTrip';
import '../components/stylesheets/Misc.css'
import '../components/stylesheets/Trip.css'


const Trip = ({date, desc, deleteTrip, updateTrip}) => {

    const [tripDelete, setTripDelete] = useState(false)
    const [tripUpdate, setTripUpdate] = useState(false)

    const handleTripDelete = () => {
        setTripDelete(true)
    }

    const handleTripUpdate = () => {
        setTripUpdate(true)
    }
    
    
    return (
    <li className='trip-container'>
        <p>Date: {date}</p>
        <p>Description:{desc}</p>
        <button onClick={handleTripDelete} className='button'>Delete Trip</button>
        <DeleteTrip trigger={tripDelete} setTrigger={setTripDelete} deleteTrip={deleteTrip} date={date}/>
        <button onClick={handleTripUpdate} className='button'>Update Trip</button>
        <UpdateTrip trigger={tripUpdate} setTrigger={setTripUpdate} updateTrip={updateTrip} date={date} desc={desc}/>
    </li>
    );
}

Trip.propTypes = {
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    deleteTrip: PropTypes.func.isRequired,
    updateTrip: PropTypes.func.isRequired
    };
export default Trip;
