import React from 'react';
import '../components/stylesheets/DeleteTrip.css'
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
        <div className="dtpopup">
            <div className="dtpopup-inner">
                <h2 className='dttitle'>DELETE TRIP?</h2>
                <div className='dtbutton-container'>
                    <button className='dtbutton' onClick={handleNo}>NO</button>
                    <button  className='dtbutton' onClick={handleYes}>YES</button>
                </div>
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