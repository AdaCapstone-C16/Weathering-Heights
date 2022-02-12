import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import MyPeak from './MyPeak'

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 10vh;
    background: #fff;
    background-color: #504C54;

`;

const Container = styled.div`
    position: absolute;
    top: 30%;
    border-radius: 25px;
    background-color:#504C54;
    padding: 10px
    button{
        margin-left: 90%;
        border-radius: 5px;
        margin-top: 1%;
        margin-bottom: 1%;
    }
`;

const MyPeakList = ({ peaks, updateList }) => {

    const getPeakListJSX = (peaks) => {
        return peaks.map((peak)=>{
            // console.log('here is the peak info being passed to MyPeak')
            // console.log(peak.key, peak.id, peak.name, peak.trips)
            return (<MyPeak key={peak.key} pKey={peak.key} id={peak.id} name={peak.name} trips={peak.trips} updateList={updateList}/>
            )
        })
    }

    return (
        // <IconContext.Provider value={{color : '#00FFB9', size : '25px'}}>
        //     <AccordionSection>
        //         <Container>
        //             {getPeakListJSX(peaks)}
        //         </Container>
        //     </AccordionSection>
        // </IconContext.Provider>
        <section>
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
            })
            ).isRequired, 
            updateList: PropTypes.func.isRequired
    };

export default MyPeakList;