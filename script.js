console.log('javascript active')

var speed = 0
var forward = true
var left = false
var turn_speed = 0
var direction = forward
var duration = 1 //static but can be changed for debugging
var t

var slider_speed = document.getElementById("speed_slide");
var turn_speed = document.getElementById("turn_slide");

function show_video() {
    console.log('video active');
    var bot = document.getElementById("bot-id").value;
    document.getElementById('camera_feed').innerHTML= '<img src="http://'+bot+':8080/stream/video.mjpeg" alt="camera_feed">';
    document.getElementById('camera_feed').style.maxHeight = "640px";
}

function send_commands() {
    if (speed > 0) {
        direction = 'forward';
    } else if (speed = 0){
        direction = 'stop';
        speed = 0;
        duration = 0;
    } else if (speed < 0) {
        direction = 'backward';
        speed = speed * -1
    }
    if (turn_speed = -1){
        direction = 'left';
    } else {
        direction = 'right';
    }
    var bot = document.getElementById('bot-id').value
    $("#result").load("http://" + bot + ":8090/post/"+direction+"/" + speed + "/" + duration);
    console.log("http://" + bot + ":8090/post/"+direction+"/" + speed + "/" + duration)
}

slider_speed.oninput = function() {
    speed.innerHTML = this.value;
    document.getElementById('speedReadout').value=this.value;
    console.log("Speed: "+document.getElementById('speedReadout').value)
}
turn_speed.oninput = function() {
    turn_speed.innerHTML = this.value;
    //console.log(turn_speed.innerHTML) //was used for debugging
    if (turn_speed.innerHTML < 0) {
        document.getElementById('angleReadout').value = "Left";
    } else if (turn_speed.innerHTML > 0) {
        document.getElementById('angleReadout').value = "Right";
    } else {
        document.getElementById('angleReadout').value = "Straight";
    }
    console.log("Turn direction: "+document.getElementById('angleReadout').value);
}
function start_commands() {
    t=setInterval(send_commands,1000);
}
function stop_commands() {
    clearInterval(t);
}
/* Links:
https://www.w3schools.com/howto/howto_js_rangeslider.asp
*/