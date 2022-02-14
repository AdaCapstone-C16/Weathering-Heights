import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function Map({trigger, setTrigger, index, name, link}) {
    // const [peak, setPeak] = useState(nul)
    const handleClose = () => {
        setTrigger(false)
    }
    const mapURL = index+'_'+(name.replace(/ /g,''))+'.html'
    const peakLink = 'https://www.peakbagger.com/'+link
    
    return (trigger) ? ( 
        <div className='mpopup'>
            <div className='mpopup-inner'>
                <h3 className='mtitle'>{name} Map</h3>
                <p className='mtitle-2'>The following map shows climber gps tracks from successful summits</p>
                <iframe className='map' title="myMap" src={mapURL}  width="500" height="500"></iframe>
                <p className='mtitle-3'>See <a href={peakLink}>Peak Baggers</a> to download gpx files.</p>
                <div className='m-inner-button-loc'>
                    <p onClick={handleClose} className='mbutton'>CLOSE</p>
                </div>
            </div>
        </div>
    
    ): "";
    }


    Map.propTypes = {
        trigger: PropTypes.bool.isRequired,
        setTrigger: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        };