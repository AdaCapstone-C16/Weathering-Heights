import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ref, set, remove, update } from 'firebase/database';
import {db} from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Trip from './Trip';
import AddTrip from './AddTrip'
import DeleteSummit from './DeleteSummit';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../components/stylesheets/MyPeak.css';
import '../components/stylesheets/Misc.css';


const MyPeak = ({ pKey, id, name, range, trips, updateList, numPeaks, handleUpdateTripError }) => {
    const [addTripPopup, setAddTripPopup] = useState(false)
    const [deleteSummitPopup, setDeleteSummitPopup] = useState(false)
    const { currentUser } = useAuth()
    const [clicked, setClicked] = useState(false)

    const toggle = (index) => {
        if(clicked === index){
            return setClicked(null);
            }
        setClicked(index)
        }

    const handleAddTripPopup = () => {
        setAddTripPopup(true)
        }

    const handleDeleteSummitPopup = () => {
        setDeleteSummitPopup(true)
        }

    const addTrip = (date, notes) => {
        setClicked(null)
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), notes)
        updateList()
        }

    const deleteSummit = () => {
        // Removes current peak and range from user info
        remove(ref(db, `users/${currentUser.uid}/summits/${id}`))
        remove(ref(db, `users/${currentUser.uid}/badges/${range}`))

        // Adjusts badge if deletion reduces achievement level
        let badgeFileName;
        
        if (numPeaks <= 25) {
            remove(ref(db, `users/${currentUser.uid}/achievement`));
        } else if (numPeaks <= 50) {
            badgeFileName = "badges/smelly_foot_badge.png";
        }  else if (numPeaks <= 75) {
            badgeFileName = "badges/frost_foot_badge.png";
        } else if (numPeaks <= 100) {
            badgeFileName = "badges/trench_foot_badge.png";
        } else {
            return;
        }

        if (badgeFileName) {
            // Adds new range badge to user profile
            update(ref(db, `users/${currentUser.uid}/`), {achievement: badgeFileName})
        }

        updateList()
        }

    const deleteTrip = (date) => {
        setClicked(null)
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), null)
        updateList()
        }

    const updateTrip = (date, desc) => {
        setClicked(null)
        if (desc==null) {
            handleUpdateTripError()
        } else {
            set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), desc)
            updateList()
            }
        
        }

    const getTripListJSX = ( trips ) => {
        return trips.map((trip, index) => {
            const date = trip[0]
            const desc = trip[1]
            return (<Trip key={index} date={date} desc={desc} deleteTrip={deleteTrip} updateTrip={updateTrip}/>);       
        })
    }
    
    return (
            <>
                <section onClick={()=> toggle(id)} className="accordion-top">
                    <div className="grid-container">
                        <p className="bigItem">{id}. {name.toUpperCase()}</p>
                    </div>
                    <span> {clicked === id? <FiMinus style={{color:'#CCA19A'}}/> : <FiPlus style={{color:'#CCA19A'}}/>}</span>
                </section>
                {clicked === id ? 
                    <section className='accordion-bottom'>
                        <section className='trip-container'>
                            <p className='trip-reports-title'>TRIP REPORTS</p>
                            <ol>{getTripListJSX(trips)}</ol>
                        </section>
                        <section className='trip-btn-container'> 
                            <div>
                                <button onClick={handleAddTripPopup} className='button summit-btn'>ADD TRIP</button>
                                <AddTrip trigger={addTripPopup} setTrigger={setAddTripPopup} addTrip={addTrip}/>
                            </div>
                            <div>
                                <button onClick={handleDeleteSummitPopup} className='button summit-btn'>DELETE SUMMIT</button>
                                <DeleteSummit trigger={deleteSummitPopup} setTrigger={setDeleteSummitPopup} deleteSummit={deleteSummit}/>
                            </div>
                        </section>
                    </section>:
                    null}
            </>

    );
};

MyPeak.propTypes = {
    pKey: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    trips: PropTypes.array,
    updateList: PropTypes.func.isRequired,
    handleUpdateTripError: PropTypes.func.isRequired
    };



export default MyPeak;