import React from 'react';

export default function Map() {
            return (    
            <div>
                <h3>Map of XXX</h3>
                <p>The following map shows gps tracks from climber's successful summits</p>
                <iframe title="myMap" src={'maps/1_MountRainier.html'}  width="1000" height="1000"></iframe>
                <p>See <a href='https://www.peakbagger.com/list.aspx?lid=5003'>Peak Baggers</a> to download gpx files.</p>
            </div>
            );
    }