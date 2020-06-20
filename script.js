console.log('javascript active')

var speed = 0
var forward = true
var left = false
var turn_speed = 0
var direction = forward

var slider_speed = document.getElementById("speed_slide");

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
    } else if (speed < 0) {
        direction = 'backward';
        speed = speed * -1
    }
    
    $("#result").load("http://" + bot + ":8090/post/"+direction+"/" + speed + "/" + duration);
}

slider_speed.oninput = function() {
    speed.innerHTML = this.value;
    document.getElementById('speedReadout').value=this.value;
    console.log("Speed: "+speed)
}
//https://www.w3schools.com/howto/howto_js_rangeslider.asp