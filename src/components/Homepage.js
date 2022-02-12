
import React, { useState } from 'react';
//import { Accordion } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Accordion from './Accordion';
import CalendarForm from './CalendarForm';
import './stylesheets/Homepage.css';

export default function Homepage(props) {
    return (
    <section>
            <div className='homepage-title'> Weathering Heights </div>
            {/* <Link to='/login'>Login</Link> */}
            <Accordion data={props.data}></Accordion>
    </section>   
    )
}