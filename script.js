// define the variables that reference the needed elements on the page
const clock = document.querySelector("#local-time");
const image = document.getElementById("clock-image");

//define the audio file that will be played on alarm trigger and set it to loop 
const audio = new Audio("alarm_clock.mp3");
audio.loop = true;

//here we are defining the variables that will be used to set the alarm
let alarmTime = null;
let alarmTimeout = null;

//Function to display time in 12 hour format with AM/PM indicator 
function displayTime() {
    const date = new Date();
    const hours = updateTime(date.getHours());
    const minutes = updateTime(date.getMinutes());
    const seconds = updateTime(date.getSeconds());
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    // const ampm = hours >= 12 ? "PM" : "AM";
    // clock.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    //Function to update time with leading zero if time is less than 10 
    function updateTime(time) {
        if (time < 10) {
            return "0" + time;
        } else {
            return time;
        }
    }
}
//calling displayTime function every second to update time 
setInterval(displayTime, 1000);

//This function is called when user clicks on set alarm button 
function setAlarmTime(value) {
    alarmTime = value;
    console.log(alarmTime);

}

//Function to play alarm sound and display image when alarm time is reached 
function setAlarm() {
    //if alarmTime is not null or undefined then only set alarm else do nothing
    if (alarmTime) { 
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);
        //if alarmTime is less than current time then do nothing
        if (timeToAlarm > current) { 
            const timeOut = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => {
                audio.play();
                clock-image.classList.add('active');
            }, timeOut);
            console.log("Alarm set");
        }
    }
}

//Function to stop alarm sound and hide image when stop alarm button is clicked
function stopAlarm() { 
    //stop alarm sound 
    audio.pause(); 
    //if alarmTimeout is not null or undefined then only stop alarm else do nothing 
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        clock-image.classList.remove('active');
        console.log("Alarm stopped");
    }
}