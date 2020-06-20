console.log('javascript active')

//var speed = document.getElementById('speedReadout').value
var turn_speed = 0
var direction = 'forward'
var duration = 1 //static but can be changed for debugging
var interval

var slider_speed = document.getElementById("speed_slide");
var turn_speed = document.getElementById("turn_slide");

turn_speed.innerHTML

function show_video() {
    console.log('video active');
    var bot = document.getElementById("bot-id").value;
    document.getElementById('camera_feed').innerHTML= '<img src="http://'+bot+':8080/stream/video.mjpeg" alt="camera_feed">';
    document.getElementById('camera_feed').style.maxHeight = "640px";
}

function send_commands() {
    console.log(turn_speed.value); //used for debugging
    speed = document.getElementById('speedReadout').value
    if (document.getElementById('speedReadout').value == 0){
        direction = 'stop';
        //speed = 0;
        //duration = 0;
    } 
    if (document.getElementById('speedReadout').value > 0) {
        direction = 'forward';
    } else if (document.getElementById('speedReadout').value < 0) {
        direction = 'backward';
        speed = document.getElementById('speedReadout').value*-1;
    } if (turn_speed.value == -1){
        if (direction == 'forward') {
            direction = 'left';
        } else {
            direction = 'right';
        }
    } else if (turn_speed.value == 1) {
        if (direction == 'forward') {
            direction = 'right';
        } else {
            direction = 'left';
        }
    } 
    var bot = document.getElementById('bot-id').value
    $("#result").load("http://" + bot + ":8090/post/"+direction+"/" + speed + "/" + duration);
    console.log("http://" + bot + ":8090/post/"+direction+"/" + speed + "/" + duration)
}

slider_speed.oninput = function() {
    var speed = this.value;
    document.getElementById('speedReadout').value=this.value;
    console.log("Speed: "+document.getElementById('speedReadout').value)
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
function start_commands() {
    interval=setInterval(send_commands,1000);
}
function stop_commands() {
    clearInterval(interval);
}
/* Links:
https://www.w3schools.com/howto/howto_js_rangeslider.asp
*/