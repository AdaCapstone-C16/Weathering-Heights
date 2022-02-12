import React from 'react';
import '../components/stylesheets/PopUps.css'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';

const DeleteSummit = ({trigger, setTrigger, deleteSummit}) => {

    
    const handleYes = () => {
        deleteSummit()
        setTrigger(false) 
    }

    const handleCancel = () => {
        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Are you sure you would like to delete this summit?</h2>
                <button  onClick={handleYes}>Yes</button>
                <button  onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    ): "";
}

DeleteSummit.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    deleteSummit: PropTypes.func.isRequired, 
    };
export default DeleteSummit