import PropTypes from 'prop-types';
import './stylesheets/BadgeDisplay.css';

const BadgeDisplay = ({ badges, style }) => {

    // Generate badge components from array of badges 
    const badgeComponents = badges.map((badge, index) => {
        // Create alt text for badge img
        const re = /(?<=^badges\/)(.*)(.*)\.[^.]+$/
        let altText = re.exec(badge);
        altText = altText[1];
        altText = altText.replace('_range', '');
        altText = altText.replaceAll('_', ' ');
        altText += ' badge';
    
        return (
            <img 
                src={badge} 
                alt={altText}
                style={style} 
                className="zoom" 
                key={index}
            >
            </img>
        )
    });

    return (
        <div className="badge-div">{badgeComponents}</div>
    )
};

BadgeDisplay.propTypes = {
    badges: PropTypes.array.isRequired, 
    style: PropTypes.object.isRequired, 
};

export default BadgeDisplay;