import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { ref, set, remove, update } from 'firebase/database';
import {db} from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Trip from './Trip';
import AddTrip from './AddTrip'
import DeleteSummit from './DeleteSummit';
import styled from 'styled-components';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../components/stylesheets/MyPeak.css';
import '../components/stylesheets/Misc.css';

const Wrap = styled.div`
background: #DEDFEC;
color: #000000;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%
text-align: center;
cursor: pointer;
border-radius: 25px;
margin-left: 30px;
margin-right: 30px;

h1{
    padding: 2rem;
    font-size: 1rem;
}
span{
    margin-right: 1.5rem;
}
.bigItem {
    grid-area: myArea;
    font-size: 2rem;
}
.item{
    font-size: 1rem;
}

.grid-container {
    display: grid;
    grid-template-areas: 'myArea myArea . . .';
    grid-gap: 10px;
    background: #DEDFEC;
    padding: 10px;
    border-radius: 25px;
}

.grid-container > div {
    text-align: center;
]    border-radius: 25px;
}
`;

const Dropdown = styled.div`
background: #DEDFEC;
color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #000000;
    border-top: 1px solid #000000;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;
    
    p{
        font-size: 1rem;
    }
`;

const MyPeak = ({ pKey, id, name, range, trips, updateList, numPeaks, handleUpdateTripError }) => {
    const [addTripPopup, setAddTripPopup] = useState(false)
    const [deleteSummitPopup, setDeleteSummitPopup] = useState(false)
    const { currentUser } = useAuth()
    const [clicked, setClicked] = useState(false)

    const toggle = (index) => {
        //if clicked question is already open, then close it 
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
                {/* <Wrap onClick={()=> toggle(id)}>
                <div className="grid-container">
                    <div className="bigItem">{id}. {name}</div>
                </div>
                    <span> {clicked === id? <FiMinus /> : <FiPlus/>}</span>
                </Wrap> */}
                <section onClick={()=> toggle(id)} className="accordion-top">
                    <div className="grid-container">
                        <p className="bigItem">{id}. {name.toUpperCase()}</p>
                    </div>
                    <span> {clicked === id? <FiMinus style={{color:'#CCA19A'}}/> : <FiPlus style={{color:'#CCA19A'}}/>}</span>
                </section>
                {clicked === id ? 
                    // <Dropdown>
                    //     <section className='tcontainer'> 
                    //         <div>
                    //             <button onClick={handleAddTripPopup} className='button summit-btn'>ADD TRIP</button>
                    //             <AddTrip trigger={addTripPopup} setTrigger={setAddTripPopup} addTrip={addTrip}/>
                    //         </div>
                    //         <div>
                    //             <button onClick={handleDeleteSummitPopup} className='button summit-btn'>DELETE SUMMIT</button>
                    //             <DeleteSummit trigger={deleteSummitPopup} setTrigger={setDeleteSummitPopup} deleteSummit={deleteSummit}/>
                    //         </div>
                    //     </section>
                    //     <section className='trips'>
                    //         <ol>{getTripListJSX(trips)}</ol>
                    //     </section>
                    // </Dropdown>:
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