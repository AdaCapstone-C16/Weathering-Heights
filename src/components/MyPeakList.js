import React from 'react';
import PropTypes from 'prop-types';
import MyPeak from './MyPeak';
import '../components/stylesheets/MyPeakList.css';

const MyPeakList = ({ peaks, updateList }) => {
    const peaksLength = peaks.length; 
    const getPeakListJSX = (peaks) => {
        return peaks.map((peak)=>{
            return (
                <MyPeak 
                    key={peak.key} 
                    pKey={peak.key} 
                    id={peak.id} 
                    name={peak.name} 
                    range={peak.range} 
                    trips={peak.trips} 
                    updateList={updateList}
                    numPeaks={peaksLength}
                    />
            )
        })
    }

    return (
        <section className='scroll'>
            {getPeakListJSX(peaks)}
        </section>
    )
};

MyPeakList.propTypes = {
    peaks: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            trips: PropTypes.array,
        })).isRequired, 
        updateList: PropTypes.func.isRequired
    };

export default MyPeakList;