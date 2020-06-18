console.log('javascript active')

var speed = 0
var forward = true
var left = false
var turn_speed = 0

var slider_speed = document.getElementById("speed_slide");

function show_video() {
    console.log('video active');
    var bot = document.getElementById("bot-id").value;
    document.getElementById('camera_feed').innerHTML= '<img src="http://'+bot+':8080/stream/video.mjpeg" alt="camera_feed">';
    document.getElementById('camera_feed').style.maxHeight = "640px";
}

slider_speed.oninput = function() {
    speed.innerHTML = this.value;
    console.log("Speed: "+speed)
}
//https://www.w3schools.com/howto/howto_js_rangeslider.asp