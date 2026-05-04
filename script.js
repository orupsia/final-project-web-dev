let locationField;
let infoField;

let audio = new Audio();

document.addEventListener('DOMContentLoaded', () => {
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
});

function getWeather(){
  let location = locationField.value;

  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YH5QF5SWJL5LZ8SFPZFT2RCC2`)
    .then(res => res.json())
    .then(data => {

      let today = data.days[0];
      let temp = today.temp;
      let condition = today.conditions;

      infoField.innerHTML = `
         ${location}<br>
         Temp: ${temp}°F<br>
         Condition: ${condition}<br>
        High: ${today.tempmax}°F | Low: ${today.tempmin}°F
      `;

      handleWeather(condition);

    })
    .catch(err => {
      console.error(err);
      infoField.innerHTML = "couldn't find that location, try that again";
    });
}

function handleWeather(condition){

  condition = condition.toLowerCase();

  audio.pause();
  audio.currentTime = 0;

  if (condition.includes("rain")) {
    bgImage = "images/rainyday.png";
    audio.src = "sounds/rainsounds.mp3";
  }
  else if (condition.includes("snow")) {
    bgImage = "images/snowday.png";
    audio.src = "sounds/windsounds.mp3";
  }
  else if (condition.includes("cloud")) {
    bgImage = "images/cloudyday.png";
    audio.src = "sounds/windsounds.mp3";
  }
  else if (condition.includes("clear")) {
    bgImage = "images/sunnday.png";
    audio.src = "sounds/birdsounds.mp3";
  }
 

 
  document.body.style.backgroundImage = `url('${bgImage}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  audio.loop = true;
  audio.play();
}

function stopSound(){
  audio.pause();
  audio.currentTime = 0;
  audio.src = "";
}