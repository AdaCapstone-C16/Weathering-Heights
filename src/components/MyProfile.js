import React, {useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ref, onValue, get, set, update, child } from 'firebase/database';
import {db} from '../firebase'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import BadgeDisplay from './BadgeDisplay';
import '../components/stylesheets/Misc.css'
import '../components/stylesheets/MyProfile.css'


export default function MyProfile({ data }) {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    const [addSummitPopup, setAddSummitPopup] = useState(false)
    const [myPeakList, setMyPeakList] = useState([])
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
        // Retrieves users list of badge names
        onValue(ref(db, `users/${currentUser.uid}/badges/`), (snapshot) => {
            const data = snapshot.val();
            const badges = Object.keys(data);
            console.log(badges)
            
            setBadges(badges);
        });
    }, []);

    const determineRangeComplete = (rangeName) => {
        // Filter for mandatory peak objects to complete particular range
        const range = data.filter(peak => peak.range === rangeName);
        const rangeLen = range.length;

        // Filter for user's list of hiked peak objects in particular range
        const userRange = myPeakList.filter(peak => peak.range === rangeName);
        const userRangeLen = userRange.length;

        if (badges === undefined) {
            return;
        }
        // If badge already won, skip
        else if (badges[0].includes(rangeLen)) {
            return;
        }
        // If last peak in range summitted and badge not previously won, assign a badge
        else if (rangeLen === (userRangeLen + 1)) {
            // Find correct png 
            const formatRangeName = rangeName.toLowerCase();
            let badgeFileName = formatRangeName.replaceAll(' ', '_');
            badgeFileName += '_range.png';

            // Adds new range badge to user profile
            update(ref(db, `users/${currentUser.uid}/badges/`), {[rangeName]: badgeFileName})
            return `${rangeName}`
        } else { // Otherwise we don't give a badge
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
                setError('THIS SUMMIT ALREADY EXISTS IN YOUR PROFILE')
            } else {
                // Get selected peaks profile data from state to publish to db
                let peakName = summit[1];

                // Extracts sortable peak name from peak string
                if (summit[1].includes('[')) {
                    const re = /\[(.*?)\]/
                    peakName = re.exec(summit[1]);
                    peakName = peakName[1]
                }

                const peakProfile = data.filter(peak => peak.name === peakName);
                const range = peakProfile[0].range;
                
                set(ref(db, `users/${currentUser.uid}/summits/${summit[0]}`), {name:summit[1], range:range})
                determineRangeComplete(range);
                getMyPeakData()
            }
        })}
        
    const handleExitError = () => {
        setError('')
    }

    const handleUpdateTripError = () => {
        setError('YOU MUST ENTER A VALID NEW TRIP REPORT')
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
                // console.log(myPeaksArr)
            setMyPeakList(myPeaksArr)
        })
    }

    // If the logout button is clicked, it will navigate user to the homepage
    // async function handleLogout() {
    //     setError('')
    //     try {
    //         await logout()
    //         navigate("/")
    //     } catch {
    //         setError('Failed to log out')
    //     }
    //     }
    
    // const handleHomepage =() => {
    //     navigate("/")
    //     }
    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/")
        } catch {
            setError('Failed to log out')
        }
    }
    
    const handleHomepage =() => {
        navigate("/")
    }

    return (
        <main id='main'>
            <section id='container-right'>
                    {/* <p id='title'>WEATHERING HEIGHTS</p> */}
                    {/* <div className=''> */}
                        {/* <section> */}
                        {/* <button onClick={handleMap}>MAP</button>
                        <button onClick={handleHomepage}>HOMEPAGE</button>
                        <button onClick={handleLogout}>LOGOUT</button> */}
                        {/* </section> */}
                        
                    {/* </div> */}
                <p id='title'>WEATHERING HEIGHTS</p>
                
                <h4>MY PROFILE</h4>

                <div>
                    <BadgeDisplay data={data}/>
                </div>

                <div className=''>
                    <section>
                        <button onClick={handleHomepage}>HOMEPAGE</button>
                        <button onClick={handleLogout}>LOGOUT</button>
                        <button onClick={handleAddSummitPopup}>ADD A SUMMIT</button>
                        <AddSummit trigger={addSummitPopup} setTrigger={setAddSummitPopup} data={peakNames} handleAddSummit={handleAddSummit}></AddSummit>
                    </section>
                    
                </div>
            </section>
            <section id='container-left'>
                <section>
                    <div className='my-summit-title-container'> 
                        <h4 className='my-summit-title'>MY SUMMITS:</h4>
                        <button onClick={handleAddSummitPopup} className='button'>ADD SUMMIT  +</button>
                        <AddSummit trigger={addSummitPopup} setTrigger={setAddSummitPopup} data={peakNames} handleAddSummit={handleAddSummit}></AddSummit>
                    </div>
                    <div>
                        {error && <Alert variant="danger">{error}<button onClick={handleExitError} className='error-button'>OK</button></Alert>}
                        <MyPeakList peaks={myPeakList} updateList={getMyPeakData} handleUpdateTripError={handleUpdateTripError}></MyPeakList>
                    </div>
                </section>
            </section>
        </main>
        );
}