import './stylesheets/BadgeDisplay.css';

// React Styling
const img_size = {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    borderWidth: 1,
};

const BadgeDisplay = ({ data, badges }) => {

    // Generate badge components from array of badges 
    const badgeComponents = badges.map((badge, index) => {

        return (
            <img src={badge} style={img_size}></img>
        )
    });



    return (
        <div className="grid">{badgeComponents}</div>
        // <>
        //     {/* <img src="../../public/badges/big_foot_badge.png" alt="big foot badge"></img> */}
        //     <div className="img-wrapper">   
        //         <img 
        //             src="badges/wenatchee_mountains_range.png"
        //             // src={require("public/badges/wenatchee_mountains_range.png")} 
        //             alt="please be smaller"
        //             style={img_size}
        //             className="hover-zoom"
        //         ></img>
        //     </div> 
        // </>
    )
};

export default BadgeDisplay;