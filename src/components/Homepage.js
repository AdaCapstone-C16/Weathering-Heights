
import React from 'react';
import Accordion from './Accordion';
import './stylesheets/Homepage.css';

export default function Homepage(props) {
    return (
    <section>
            <Accordion data={props.data}></Accordion>
    </section>   
    )
}