import React, { useState, useEffect } from 'react';

export default function Timer() {
    const [formattedTime, setFormattedTime] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight (0 hours)
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            setFormattedTime(`${hours}:${minutes}:${seconds} ${ampm}`);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            setFormattedDate(now.toLocaleDateString(undefined, options));
        };

        const intervalId = setInterval(updateClock, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures effect runs only once on mount

    return (
        <>
            <div className='container'>
                <h1 className='current-time'>{formattedTime}</h1>
                <h1 className='current-date'>{formattedDate}</h1>
            </div>
        </>
    );
}
