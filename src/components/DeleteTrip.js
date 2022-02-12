import React from 'react';
import '../components/stylesheets/PopUps.css'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const DeleteTrip = ({trigger, setTrigger, deleteTrip, date}) => {

    const handleYes = () => {
        deleteTrip(date)
        setTrigger(false) 
    }

    const handleNo = () => {
        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Are you sure you would like to  delete this trip?</h2>
                <button  onClick={handleNo}>No</button>
                <button  onClick={handleYes}>Yes</button>
            </div>
        </div>
    ): "";
}
DeleteTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    deleteTrip: PropTypes.func.isRequired, 
    date: PropTypes.string.isRequired,
    };
export default DeleteTrip