import { db } from './../firebase.js';
import { ref, get, child, set, update } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import './stylesheets/BadgeDisplay.css';

// React Styling
const img_size = {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    borderWidth: 1,
};

const BadgeDisplay = ({ data }) => {
    const { currentUser } = useAuth();


    

    // const determineRangeComplete = (rangeName) => {
    //     // Filter for mandatory peak objects to complete particular range
    //     const range = data.filter(peak => peak.range === rangeName);
    //     const rangeLen = range.length;
    //     console.log(rangeLen)

    //     // Filter for user's list of hiked peak objects in particular range
    //     const userRange = userData.filter(peak => peak.range === rangeName);
    //     const userRangeLen = userRange.length;

    //     const peakName = userRange[0].name

    //     if (rangeLen === userRangeLen) {
    //         console.log("YOU'vE HIKED ALL THE PEAKS");
    //         // Adds new range badge to user profile
    //         // TODO: Change true to ".png"
    //         update(ref(db, `users/${currentUser.uid}/badges/`), {[peakName]: "true"})
    //     } else {
    //         console.log("you haven't quite hiked all the peaks")
    //     }
    // }
    
    
    // When user adds new badge -> check for range completion
    //   Run that range through the length comparison function
    //      if range complete
    //          db(set(/ranges/{rangeName: true/png name}))


    return (
        <>
            {/* <img src="../../public/badges/big_foot_badge.png" alt="big foot badge"></img> */}
            <div className="img-wrapper">   
                <img 
                    // src={require("../../public/badges/wenatchee_mountains_range.png")}
                    src={require("../badges/wenatchee_mountains_range.png")} 
                    alt="please be smaller"
                    style={img_size}
                    className="hover-zoom"
                ></img>
            </div> 
        </>
    )
};

export default BadgeDisplay;