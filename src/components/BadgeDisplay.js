import './stylesheets/BadgeDisplay.css';

// React Styling
const img_size = {
    width: 350,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
    borderWidth: 1,
};

const BadgeDisplay = ({ badges }) => {
    // Generate badge components from array of badges 
    const badgeComponents = badges.map((badge) => {
        return (
            <img src={badge} style={img_size}></img>
        )
    });

    return (
        <div className="grid">{badgeComponents}</div>
    )
};

export default BadgeDisplay;