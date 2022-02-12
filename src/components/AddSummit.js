import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import Select from 'react-select'
import PropTypes from 'prop-types';

const AddSummit = ({trigger, setTrigger, data, handleAddSummit}) => {
    const [summit, setSummit] = useState(['',''])

    const handleSummitAdd = (event) => {
        setSummit([event.value, event.label])
        }

    const handleClose = () => {
        handleAddSummit(summit)
        setTrigger(false) 
        }

    const handleCancel = () => {
            setTrigger(false) 
            }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add New Summit:</h2>
                <form>
                    <label> Select a Bulger</label>
                    <Select options={data} onChange={handleSummitAdd}/>
                </form>
                <button className="close-button" onClick={handleClose}>Add!</button>
                <button onClick={handleCancel}> Cancel </button>
            </div>
        </div>
    
    ): "";
}

AddSummit.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    handleAddSummit: PropTypes.func.isRequired,
    data:PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired
            })
            ).isRequired, 
    };
export default AddSummit