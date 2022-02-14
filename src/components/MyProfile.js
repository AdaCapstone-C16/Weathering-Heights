import React, {useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, get, set, update, child } from 'firebase/database';
import { db } from '../firebase';
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import BadgeDisplay from './BadgeDisplay';
import '../components/stylesheets/MyProfile.css';
import '../components/stylesheets/Misc.css';


export default function MyProfile({ data }) {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    const [addSummitPopup, setAddSummitPopup] = useState(false)
    const [myPeakList, setMyPeakList] = useState([])
    const [badgedRanges, setBadgedRanges] = useState();
    const [badges, setBadges] = useState();

    let peakNames = []
    for (let peak of data) {
        if (peak && peak.indigenous_name) {
            peakNames.push({value:peak.key,label:`${peak.indigenous_name} [${peak.name}]`})
        } else if (peak) {
            peakNames.push({value:peak.key, label:peak.name})
        };
    };

    useEffect(() => {
        // Retrieves list of users badge names
        onValue(ref(db, `users/${currentUser.uid}/badges/`), (snapshot) => {
            const data = snapshot.val();
            const ranges = Object.keys(data);
            const badges = Object.values(data);
            
            setBadges(badges);
            setBadgedRanges(ranges);
        });
    }, []);

    const determineRangeComplete = (rangeName) => {
        console.log({rangeName})
        // Filter for mandatory peak objects to complete particular range
        const range = data.filter(peak => peak.range === rangeName);
        const rangeLen = range.length;
        console.log(range)
        console.log({rangeLen})

        // Filter for user's list of hiked peak objects in particular range
        const userRange = myPeakList.filter(peak => peak.range === rangeName);
        const userRangeLen = userRange.length;
        console.log(userRange)
        console.log({userRangeLen})

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
            console.log("is it the else?")
            return;
        }
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
                // Get selected peaks profile data from state to publish to db
                let peakName = summit[1];
                let id = summit[0]

                // Extracts sortable peak name from peak string
                if (summit[1].includes('[')) {
                    const re = /\[(.*?)\]/
                    peakName = re.exec(summit[1]);
                    peakName = peakName[1]
                }
                console.log("handleAddSummit")
                console.log({peakName})
                // Gets range data for peak from db
                // const peakProfile = data.filter(peak => peak.name === peakName);
                const peakProfile = data.filter(peak => peak.key === id);
                const range = peakProfile[0].range;
                console.log("handleAddSummit")
                console.log({range})
                
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
            setMyPeakList(myPeaksArr)
        })
    }

    return (
        <main id='main'>
            <section id='container-right'>

            {badges && <BadgeDisplay badges={badges}/>}

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
}