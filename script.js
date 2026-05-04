let locationField;
let infoField;
let imgElement = document.getElementById("resultImage");

let audio = new Audio();

document.addEventListener('DOMContentLoaded', () => {
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');

  // background upload
  document.getElementById("bgUpload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      document.body.style.backgroundImage = `url(${url})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  });
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
        🌍 ${location}<br>
        🌡️ Temp: ${temp}°F<br>
        ☁️ Condition: ${condition}<br>
        📅 High: ${today.tempmax}°F | Low: ${today.tempmin}°F
      `;

      handleWeather(condition);

    })
    .catch(err => {
      console.error(err);
      infoField.innerHTML = "couldn't find that location 😢";
    });
}

function handleWeather(condition){

  condition = condition.toLowerCase();

  audio.pause();
  audio.currentTime = 0;

  if (condition.includes("rain")) {
    imgElement.src = "images/rainyday.png";
    audio.src = "sounds/rainsounds.mp3";
  }
  else if (condition.includes("snow")) {
    imgElement.src = "images/snowday.png";
    audio.src = "sounds/windsounds.mp3";
  }
  else if (condition.includes("cloud")) {
    imgElement.src = "images/cloudyday.png";
    audio.src = "sounds/windsounds.mp3";
  }
  else if (condition.includes("clear")) {
    imgElement.src = "images/sunnday.png";
    audio.src = "sounds/birdsounds.mp3";
  }
  else {
    imgElement.src = "images/default.png";
  }

  audio.loop = true;
  audio.play();
}

function stopSound(){
  audio.pause();
}

function resetBackground(){
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "white";
}