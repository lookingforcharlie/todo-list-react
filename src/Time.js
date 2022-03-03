import React from 'react';
import { useState, useEffect} from 'react'; 

export default function Time() {
    const [clock, setClock] = useState(); 
    // One way to set up a live clock
    useEffect(() => {
        setInterval(() => {
            const myClock = new Date().toLocaleTimeString();  
            setClock(myClock); 
        }, 1000)
    },[])

    // Another way to set up a live clock 
    // const updateClock = () => {
    //     let myClock = new Date().toLocaleTimeString(); 
    //     setClock(myClock);  
    // }
    // setInterval(updateClock, 1000);
  
    return (
        <div>{clock}</div>
    )
}

