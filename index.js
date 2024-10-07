let video = document.querySelector("video");
let recordContBtn = document.querySelector(".record-cont-btn");
let recordBtn = document.querySelector(".record-btn");
let timer = document.querySelector(".timer");
let captureContBtn = document.querySelector(".capture-cont-btn");
let captureBtn = document.querySelector(".capture-btn")
let transparentColor = "transparent";


let recorder;
let chunks = [];

let recorderFlag = false;


let constraints = {
    audio:false,
    video:true,
}


navigator.mediaDevices.getUserMedia(constraints)

.then((stream)=>{
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start",(e)=>{
        chunks = [];
 
    })

    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data)

    })


    recorder.addEventListener("stop",(e)=>{
        let blob = new Blob(chunks,{ type : "video/mp4"});
        let videoUrl = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoUrl;
        a.download = "stram.mp4";
        a.click();

    })




    recordContBtn.addEventListener("click",(e)=>{
        if(!recorder) return;

        recorderFlag = !recorderFlag;

        if (recorderFlag){
            recorder.start();
            recordBtn.classList.add("scale-record");
            startTimer();
        }else{
            recorder.stop();
            recordBtn.classList.remove("scale-record")
            stopTimer();
        }
    })
    


});


captureContBtn.addEventListener("click",(e)=>{
    captureContBtn.classList.add("scale-capture");
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    
    tool.fillStyle = transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);
   
    
    let a = document.createElement("a");
    let imageUrl = canvas.toDataURL("image/jpeg");
    a.href = imageUrl;
    a.download = "image.jpeg";
    a.click();


    setTimeout(()=>{
        captureContBtn.classList.remove("scale-capture")
    },1000);
    
})




let counter = 0;
let timerId;

function startTimer(){
    timer.style.display = "block";

    function displayTimer(){

        let totalseconds = counter;
        let hours = Number.parseInt(totalseconds / 3600);
        totalseconds = totalseconds % 3600;

        let minutes = Number.parseInt(totalseconds / 60);
        totalseconds = totalseconds % 60;

        let seconds = totalseconds;

        hours = (hours < 10) ? `0${hours}`: hours;
        minutes = (minutes < 10) ? `0${minutes}` :  minutes;
        seconds = (seconds < 10) ? `0${seconds}` :  seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter ++
    }
    timerId = setInterval(displayTimer,1000);
}
function stopTimer(){
    clearInterval(timerId)
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}



//filtering //

let filterLayered = document.querySelector(".filter-layer");

let allFilter = document.querySelectorAll(".filter");

allFilter.forEach((item)=>{
    item.addEventListener("click",(e)=>{
        transparentColor = getComputedStyle(item).getPropertyValue("background-color");
        filterLayered.style.backgroundColor = transparentColor;

    })
    
})