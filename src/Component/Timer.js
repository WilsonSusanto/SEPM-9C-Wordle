import React, { useEffect } from "react";
import { useState } from "react";


const Timer = () => {
    const [timer, setTimer] = useState();
    useEffect(() => {
        setTimeout(() => {
            // Timing code yoinked from https://stackoverflow.com/questions/54256629/countdown-to-midnight-refresh-every-day
            const midnight = new Date();
            const currentTime = new Date();
            midnight.setHours(24,0,0,0);
            let timeDiff = (midnight.getTime() - currentTime.getTime()) / 1000;
            const hours = Math.floor(timeDiff / 3600);
            timeDiff = timeDiff - (hours * 3600);
            const minutes = Math.floor(timeDiff / 60);
            timeDiff = timeDiff - (minutes * 60);
            const seconds = Math.floor(timeDiff);

            timeDiff = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2)
            setTimer(timeDiff);
        },1000);
    })

    function changeVisibility() {
        document.querySelector(".timerDiv").style.display = "block";
    }

    return(
        <div>
            <button onClick={changeVisibility}>Show time until next wordle word</button>
            <div className="timerDiv" style={{display: "none"}}>
                <h1>Time until next Wordle word</h1>
                <p>{timer}</p>
            </div>
        </div>
    )
} 

export default Timer;