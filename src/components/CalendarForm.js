//imports in App
import React from 'react';
import { useRef } from 'react';
import './stylesheets/CalendarForm.css';
import KEYS from './firebase_api_key';

    function CalendarForm(props) {
    //gapi window
    var gapi = window.gapi

    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    

    //ref variables
    const nameInputRef = useRef();
    const descInputRef = useRef();
    const dateInputRef = useRef();
    const startTimeInputRef = useRef();
    const endTimeInputRef = useRef();
    const attendeeInputRef = useRef();
    // const peakInputRef = useRef();

    //variables
    let enteredName;
    let enteredDesc;
    let enteredDate;
    let enteredStartTime;
    let enteredEndTime;
    let enteredAttendee;
    let enteredPeak;
    let enteredTemp;
    let enteredWind;
    let enteredPrecip;



  //deals with form being submitted
    const submitHandler = (event) => {
        event.preventDefault();
        enteredName = nameInputRef.current.value;
        enteredDesc = descInputRef.current.value; 
        enteredDate = dateInputRef.current.value;
        enteredStartTime = startTimeInputRef.current.value;
        enteredEndTime = endTimeInputRef.current.value;
        enteredAttendee = attendeeInputRef.current.value;
        // enteredPeak = peakInputRef.current.value;
        enteredPeak = props.mountain;
        enteredTemp = props.weather[0] + "°F";
        enteredWind = props.weather[1] + " " + props.weather[2];
        enteredPrecip = props.weather[3] + "%";
    }

  //does sign-in, and post request 
    const handleClick = () => {
    gapi.load('client:auth2', () => {
        console.log('loaded client')

        gapi.client.init({
            apiKey: KEYS['GOOGLE_API_KEY'],
            clientId: KEYS['GOOGLE_ClIENT_ID'],
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', () => console.log('bam!'))

        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
        
        var event = {
            'summary': enteredName,
            'location': enteredPeak,
            'description': enteredDesc + "Weather Info: Temperature: " + enteredTemp + " Wind Speed " + enteredWind + " Chance of Precipitation " + enteredPrecip,
            'start': {
            'dateTime': new Date (enteredDate + " " + enteredStartTime),
            'timeZone': 'America/Los_Angeles'
            },
            'end': {
            'dateTime': new Date (enteredDate + " " + enteredEndTime),
            'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
            {'email': enteredAttendee}
            ],
            'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
            }
        }

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
        })

        request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
        })
        

        // get events
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
        })


        })
    })
    }

    return (
    <div className='google-form-container'>
        <form className='google-form'onSubmit={submitHandler}>
        <div></div>
        <span className='google-form-title'>Add Event to Google Calendar!</span>
        <label className='google-form-peak' htmlFor='peak'>Peak:</label>
        <input className='google-form-peak' type='text' id='peak' value={props.mountain} />
        <label className='google-form-name' htmlFor='name'>Name of Event:</label>
        <input className='google-form-name' type='name' id='name' required ref={nameInputRef} />
        <label className='google-form-desc' htmlFor='desc'>Description:</label>
        <input className='google-form-desc' type='text' id='desc' required ref={descInputRef} />
        <label className='google-form-date' htmlFor='date'>Date of Event:</label>
        <input className='google-form-date' type='date' id='date' required ref={dateInputRef} />
        <label className='google-form-start' htmlFor='start-time'>Start Time:</label>
        <input className='google-form-start' type='time' id='start-time' required ref={startTimeInputRef} />
        <label className='google-form-end' htmlFor='end-time'>End Time:</label>
        <input className='google-form-end' type='time' id='end-time' required ref={endTimeInputRef} />
        <label className='google-form-attendee' htmlFor='attendees'>Attendee:</label>
        <input className='google-form-attendee' type='attendees' id='attendees' required ref={attendeeInputRef} />  
        <div className=''><button className='google-form-button' onClick={handleClick}>Add Event</button></div>
        </form>
    </div>
    );
}

export default CalendarForm;
