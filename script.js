console.log('javascript active') //makes sure javascript is working

//constants
const duration = 1 //can be changed for debugging

//sets variables that need to be global
var turn_speed = 0
var direction = 'forward'
var interval

var slider_speed = document.getElementById("speed_slide"); //imports the speed slider
var turn_speed = document.getElementById("turn_slide"); //imports the turn slider

function show_video() {
    console.log('video active'); //debugging message
    var bot = document.getElementById("bot-id").value; //gets the bot IP address for the video
    document.getElementById('camera_feed').innerHTML= '<img src="http://'+bot+':8081" alt="camera_feed">'; //initiaises camera feed
    document.getElementById('camera_feed').style.display = "inline-block"; //sets max size so it doesn't take over the page
    window.location="#speedReadout"
}

function send_commands() { //runs every second when the interval is enabled
    console.log(turn_speed.value); //used for debugging
    speed = document.getElementById('speedReadout').value //gets the current value from the speed slider
    if (document.getElementById('speedReadout').value == 0){
        direction = 'stop';
        //speed = 0;
        //duration = 0;
    }
    if (document.getElementById('speedReadout').value > 0) { //if the speed is positive
        direction = 'forward';
    } else if (document.getElementById('speedReadout').value < 0) { //if the speed is negative
        direction = 'backward';
        speed = document.getElementById('speedReadout').value*-1; //make negative speed positive so the robot can process it
    } if (turn_speed.value == -1){ //if turning left
        if (direction == 'forward') { //if positive speed
            direction = 'left'; //go the selected direction
        } else {
            direction = 'right'; //if negative speed, go the opposite direction
        }
    } else if (turn_speed.value == 1) { //if turning right
        if (direction == 'forward') { //same as before
            direction = 'right';
        } else {
            direction = 'left';
        }
    }
    var bot = document.getElementById('bot-id').value //gets the bot IP address from the text box
    $("#result").load("http://" + bot + ":8090/post/"+direction+"/" + speed/10 + "/" + duration); //background process to send commands to bot
    console.log("http://" + bot + ":8090/post/"+direction+"/" + speed/10 + "/" + duration) //sends url command to console for debugging
}

slider_speed.oninput = function() { //runs when speed slider value is changed/ when it is slid
    var speed = this.value; //sets the speed variable
    document.getElementById('speedReadout').value=this.value; //changes the readout to show the new value
    console.log("Speed: "+document.getElementById('speedReadout').value) //debuggingn loggingw
}
turn_speed.oninput = function() {
    turn_speed.innerHTML = this.value;
    console.log(turn_speed.value) //used for debugging
    if (turn_speed.value < 0) {
        document.getElementById('angleReadout').value = "Left";
    } else if (turn_speed.value > 0) {
        document.getElementById('angleReadout').value = "Right";
    } else {
        document.getElementById('angleReadout').value = "Straight";
    }
    console.log("Turn direction: "+/*document.getElementById('angleReadout').value*/turn_speed.innerHTML);
}
function start_commands() { //function to start sending commands every second
    interval=setInterval(send_commands,700); //sets interval to send command every second
}
function stop_commands() {
    clearInterval(interval); //stops the sending of commands
    interval = setInterval(stop_bot, 1000); //temp fix for issue #3, in future will replace with bot sending confirmation replies
    x = 0;
}

function stop_bot() { //temp fix for issue #3, in future will replace with bot sending confirmation replies
    var bot = document.getElementById('bot-id').value //gets the bot IP address from the text box
    $("#result").load("http://" + bot + ":8090/post/"+'stop'+"/" + speed/10 + "/" + duration); //stops the bot moving when button is pressed
    console.log("Bot halted");
    console.log(x);
    if (++x === 5){
        clearInterval(interval);
    }
}

/* Links:
https://www.w3schools.com/howto/howto_js_rangeslider.asp
*/
