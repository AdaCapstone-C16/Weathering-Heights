import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';
import { db } from '../firebase';
import { ref, onValue, get, set, update, child } from 'firebase/database';
import AddSummit from './AddSummit';
import BadgeDisplay from './BadgeDisplay';
import MyPeakList from './MyPeakList';
import './stylesheets/MyProfile.css';
import './stylesheets/Misc.css';
import './stylesheets/BadgeDisplay.css';

// React Styling
const img_size = {
    width: 350,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
    borderWidth: 1,
};

export default function MyProfile({ data }) {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()

    const [addSummitPopup, setAddSummitPopup] = useState(false)
    const [myPeakList, setMyPeakList] = useState([])
    const [badgedRanges, setBadgedRanges] = useState([]);
    const [badges, setBadges] = useState();
    const [achievement, setAchievement] = useState();

    let peakNames = []
    for (let peak of data) {
        if (peak && peak.indigenous_name) {
            peakNames.push({value:peak.key,label:`${peak.indigenous_name} [${peak.name}]`})
        } else if (peak) {
            peakNames.push({value:peak.key, label:peak.name})
        };
    };

    useEffect(() => {
        // Retrieves list of user's badge names
        onValue(ref(db, `users/${currentUser.uid}/badges/`), (snapshot) => {
            const data = snapshot.val();

            if (data === null) {
                return
            }

            const ranges = Object.keys(data);
            const badges = Object.values(data);

            setBadges(badges);
            setBadgedRanges(ranges);
        })

        // Retrieves achievement status from db
        onValue(ref(db, `users/${currentUser.uid}/achievement/`), (snapshot) => {
            const data = snapshot.val();
            setAchievement(data);
        });
    }, []);

    // Determines badge award and adds badge to db
    const determineRangeComplete = (rangeName) => {
        // Filter for mandatory peak objects to complete particular range
        const range = data.filter(peak => peak.range === rangeName);
        const rangeLen = range.length;

        // Filter for user's list of hiked peak objects in particular range
        const userRange = myPeakList.filter(peak => peak.range === rangeName);
        const userRangeLen = userRange.length;

        if (badgedRanges === undefined) {
            return;
        }
        // If badge already won, skip
        else if (badgedRanges.includes(range)) {
            return;
        }
        // If last peak in range summitted and badge not previously won, assign a badge
        else if (rangeLen === (userRangeLen + 1)) {
            // Find correct png 
            const formatRangeName = rangeName.toLowerCase();
            let badgeFileName = formatRangeName.replaceAll(' ', '_');
            badgeFileName = badgeFileName.replaceAll('-', '_');
            badgeFileName = 'badges/' + badgeFileName + '_range.png';

            // Adds new range badge to user profile
            update(ref(db, `users/${currentUser.uid}/badges/`), {[rangeName]: badgeFileName})
            return badgeFileName;
        } else { // Otherwise we don't give a badge
            console.log("THE ELSE")
            return;
        }
    }

    // Determines achievement award and adds badge to db
    const determineAchievementBadge = (peakArr) => {
        let badgeFileName;
        
        // Determines if a new achievement badge has been won
        if (peakArr.length === 25) {
            badgeFileName = "badges/smelly_foot_badge.png";
        } else if (peakArr.length === 50) {
            badgeFileName = "badges/frost_foot_badge.png";
        } else if (peakArr.length === 75) {
            badgeFileName = "badges/trench_foot_badge.png";
        } else if (peakArr.length === 100) {
            badgeFileName = "badges/big_foot_badge.png";
        } else {
            return;
        }
 
        // Adds new range badge to user profile
        update(ref(db, `users/${currentUser.uid}/`), {achievement: badgeFileName})
    }

    useEffect(() => {
        getMyPeakData();
    }, []);
    
    const handleAddSummitPopup= () => {
        setAddSummitPopup(true)
    }
    
    const handleAddSummit = (summit) => {
        setError('')
        get(child(ref(db), `users/${currentUser.uid}/summits/${summit[0]}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('This summit is already in your summits')
                setError('This summit already exists in your profile')
            } else {
                let id = summit[0]
                
                // Gets range data for peak from db
                const peakProfile = data.filter(peak => peak.key === id);
                const range = peakProfile[0].range;
                
                set(ref(db, `users/${currentUser.uid}/summits/${summit[0]}`), {name:summit[1], range:range})
                determineRangeComplete(range);
                getMyPeakData()
            }
        })}
        
    const handleExitError = () => {
        setError('')
    }

    const getMyPeakData = () => {
        let myPeaksArr = []
        const dbRef = ref(db);
        get(child(dbRef, `users/${currentUser.uid}/summits`)).then((snapshot) => {
            snapshot.forEach((peak) => {
                let pID = peak.key
                const pName = peak.child('name').val()
                const pRange = peak.child('range').val()
                let pTrips = []
                get(child(dbRef, `users/${currentUser.uid}/summits/${peak.key}/trips`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach((trip)=>{
                            const tripArr = [trip.key,trip.val()]
                            pTrips.push(tripArr)
                        })
                    } else {
                        console.log('There are no associated trips to this summit');
                    }
                }).catch((error) => {
                    console.log(error)
                    return error
                });
                myPeaksArr.push({key:pID, 
                                id:pID,
                                name:pName,
                                range:pRange,
                                trips:pTrips
                            })
                });
            determineAchievementBadge(myPeaksArr);    
            setMyPeakList(myPeaksArr)
            
        })
    }

    return (
        <main id='main'>
            <section id='container-right'>

            {achievement && <img src={achievement} 
                                alt={"Users achievement badge"} 
                                style={img_size} 
                                className="zoom">
                            </img>}
            {badges && <BadgeDisplay badges={badges} style={img_size}/>}

            </section>
            <section id='container-left'>
                <section>
                    <div className='my-summit-title-container'> 
                        <h4 className='my-summit-title'>MY SUMMITS:</h4>
                        <button onClick={handleAddSummitPopup} className='button'>ADD SUMMIT  +</button>
                        <AddSummit trigger={addSummitPopup} setTrigger={setAddSummitPopup} data={peakNames} handleAddSummit={handleAddSummit}></AddSummit>
                    </div>
                    <div>
                        {error && <Alert variant="danger">{error}<button onClick={handleExitError}>OK</button></Alert>}
                        <MyPeakList peaks={myPeakList} updateList={getMyPeakData}></MyPeakList>
                    </div>
                </section>
            </section>
        </main>
        );
};

MyProfile.propTypes = {
    data: PropTypes.array.isRequired, 
};