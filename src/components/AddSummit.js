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
        <div className="spopup">
            <div className="spopup-inner">
                <h2 className='stitle'>ADD SUMMIT</h2>
                <form>
                    <label className='stitle-2'> SELECT BULGER</label>
                    <Select options={data} onChange={handleSummitAdd}/>
                </form>
                <div className='sbutton-container'>
                    <button className="sbutton" onClick={handleClose}>Add!</button>
                    <button className="sbutton" onClick={handleCancel}> Cancel </button>
                </div>
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