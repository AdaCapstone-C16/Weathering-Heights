import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function Map({trigger, setTrigger, index, name, link}) {
    // const [peak, setPeak] = useState(nul)
    const handleClose = () => {
        setTrigger(false)
    }
    let indexNew = index+1
    const mapURL = indexNew+'_'+(name.replace(/ /g,''))+'.html'
    console.log('printing',mapURL)
    console.log(link)
    
    return (trigger) ? ( 
        <div className='mpopup'>
            <div className='mpopup-inner'>
                <h3 className='mtitle'>{name} Map</h3>
                <p className='mtitle-2'>The following map shows climber gps tracks from successful summits</p>
                <iframe className='map' title="myMap" src={mapURL}  width="500" height="500"></iframe>
                <p className='mtitle-3'>See <a href={link}>Peak Baggers</a> to download gpx files.</p>
                <div className='button-loc'>
                    <button onClick={handleClose} className='mbutton'>CLOSE</button>
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