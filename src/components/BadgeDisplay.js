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
    )
};

export default BadgeDisplay;