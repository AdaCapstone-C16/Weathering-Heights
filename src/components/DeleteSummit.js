import React from 'react';
import '../components/stylesheets/DeleteSummit.css'
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
        <div className="dpopup">
            <div className="dpopup-inner">
                <h2 className='dtitle'>DELETE SUMMIT?</h2>
                <div className='sbutton-container'>
                    <button  className='dbutton' onClick={handleYes}>Yes</button>
                    <button  className='dbutton' onClick={handleCancel}>Cancel</button>
                </div>
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