
import React from 'react';
import Accordion from './Accordion';
import './stylesheets/Homepage.css';

export default function Homepage(props) {
    return (
    <section>
            {/* <div className='homepage-title'> Weathering Heights </div> */}
            {/* <Link to='/login'>Login</Link> */}
            <Accordion data={props.data}></Accordion>
    </section>   
    )
}