import playList from "./playList.js";
import {
  greetingTranslation,
  dateTranslation,
  weatherTranslation,
  settingsTranslation,
} from "./translate.js";

const body = document.querySelector("body");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const greetingCont = document.querySelector(".greeting-container");
const weather = document.querySelector(".weather");
const player = document.querySelector(".player");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector(".change-quote");
const quoteAuthor = document.querySelector(".author");
const quoteCont = document.querySelector(".quote-container");
const playMusiс = document.querySelector(".play");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const trackName = document.querySelector(".track-name");
const switchBtn = document.querySelectorAll(".switch-btn");
const langSettings = document.querySelector(".language-title");
const playerSettings = document.querySelector(".player-title");
const weatherSettings = document.querySelector(".weather-title");
const timeSettings = document.querySelector(".time-title");
const dateSettings = document.querySelector(".date-title");
const greetingSettings = document.querySelector(".greeting-title");
const quoteSettings = document.querySelector(".quote-title");
const switchOnAll = document.querySelectorAll(".on");
const switchOffAll = document.querySelectorAll(".off");
const engLang = document.querySelector(".english");
const rusLang = document.querySelector(".russian");
const imgBtn = document.querySelector(".image-button");
const imgList = document.querySelector(".image-list");
const imageItems = Array.from(imgList.children);
const playerSwitch = document.querySelector(".player-switch");
const weatherSwitch = document.querySelector(".weather-switch");
const timeSwitch = document.querySelector(".time-switch");
const dateSwitch = document.querySelector(".date-switch");
const greetingSwitch = document.querySelector(".greeting-switch");
const quoteSwitch = document.querySelector(".quote-switch");
let user = document.querySelector(".user");
let tasks = document.getElementById("tasks");
const toDo = document.querySelector(".toDo");

let selectedImgBackground = document.getElementsByClassName(
  "selectedImgBackground"
);
const imageSettings = document.querySelector(".image-server");

let languageGreeting = greetingTranslation.en;
let languageDate = dateTranslation.en;
let languageWeather = weatherTranslation.en;
let languageSettings = settingsTranslation.en;
let playNum = 0;
let randomNum = 0;
let isPlay = false;
const slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", getSlideNext);
const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(languageDate);
  showGreeting(languageGreeting);
  setTimeout(showTime, 1000);
}
showTime();
function showDate(languageDate) {
  const localDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timezone: "UTC",
  };
  const currentDate = localDate.toLocaleDateString(languageDate, options);
  date.textContent = currentDate;
}

function showGreeting(languageGreeting) {
  const now = new Date();
  const hours = now.getHours();
  const getTimeOfDay = () => {
    if (hours > 5 && hours <= 12) {
      return `${languageGreeting[2]}`;
    } else if (hours > 12 && hours <= 18) {
      return `${languageGreeting[3]}`;
    } else if (hours > 18 && hours <= 22) {
      return `${languageGreeting[4]}`;
    } else {
      return `${languageGreeting[1]}`;
    }
  };
  const timeOfDay = getTimeOfDay();
  const getGreeting = () => {
    if (languageGreeting === greetingTranslation.en) {
      return languageGreeting[0];
    } else if (hours > 5 && hours <= 12) {
      return `${languageGreeting[5]}`;
    } else if (hours > 12 && hours <= 18) {
      return `${languageGreeting[0]}`;
    } else if (hours > 18 && hours <= 22) {
      return `${languageGreeting[0]}`;
    } else {
      return `${languageGreeting[6]}`;
    }
  };
  const greetingText = getGreeting();
  greeting.textContent = `${greetingText} ${timeOfDay}`;
}

function setLocalStorage() {
  localStorage.setItem("name", user.value);
}
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("keyup", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    user.value = localStorage.getItem("name");
    tasks.value = localStorage.getItem("task");
  }
}
window.addEventListener("load", getLocalStorage);
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (randomNum = String(
    Math.floor(Math.random() * (max - min + 1)) + min
  ).padStart(2, "0"));
}
const getTimeOfDay = () => {
  const now = new Date();
  const hours = now.getHours();
  if (hours > 5 && hours <= 12) {
    return "morning";
  } else if (hours > 12 && hours <= 18) {
    return "afternoon";
  } else if (hours > 18 && hours <= 22) {
    return "evening";
  } else {
    return "night";
  }
};
let imgRandomNum = getRandomNum(1, 20);
localStorage.setItem("imgNum", imgRandomNum);
function setBg() {
  if (String(imgRandomNum).length === 1) {
    imgRandomNum = String(imgRandomNum).padStart(2, "0");
  }
  localStorage.setItem("imgNum", imgRandomNum);
  let timeOfDay = getTimeOfDay();
  let url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imgRandomNum}.jpg`;
  const img = new Image();
  img.src = url;
  img.addEventListener("load", () => {
    body.style.backgroundImage = `url(${url})`;
  });
}
setBg();
async function getImageFromUnsplash() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=z02NyeG7mV2BJKekF0el42XIvcafL976hJZXFzTr4DE`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
  img.addEventListener("load", () => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  });
}
async function getImageFromFlickr() {
  let timeOfDay = getTimeOfDay();
  const img = new Image();
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7e61193a444019273c8f459eae43f3f8&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[randomNum].url_l;
  img.addEventListener("load", () => {
    body.style.backgroundImage = `url(${data.photos.photo[randomNum].url_l})`;
  });
}
imageItems.forEach(function (imageItem) {
  imageItem.addEventListener("click", function () {
    imageItems.forEach(function (imageItem) {
      imageItem.classList.remove("selectedImgBackground");
    });
    imageItem.classList.add("selectedImgBackground");
    selectImgServer();
  });
});
function selectImgServer() {
  if (selectedImgBackground[0].classList.contains("flickr")) {
    getImageFromFlickr();
  } else if (selectedImgBackground[0].classList.contains("unsplash")) {
    getImageFromUnsplash();
  } else {
    setBg();
  }
}

function getSlideNext() {
  imgRandomNum = localStorage.getItem("imgNum");
  if (imgRandomNum < 20) {
    imgRandomNum++;
  } else {
    imgRandomNum = 1;
  }
  setBg(imgRandomNum);
}
function getSlidePrev() {
  imgRandomNum = localStorage.getItem("imgNum");

  if (imgRandomNum > 1 && imgRandomNum <= 20) {
    imgRandomNum--;
  } else {
    imgRandomNum = 20;
  }
  setBg(imgRandomNum);
}

window.addEventListener("keyup", setCityInfo);
function setCityInfo() {
  localStorage.setItem("city", city.value);
}

window.addEventListener("beforeunload", setCityInfo);
function getCityInfo() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}

window.addEventListener("load", getCityInfo);
const city = document.querySelector(".city");
city.addEventListener("change", getWeather);
window.addEventListener("load", getWeather);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languageWeather[3]}&appid=398b0b556b76a2dabf81e5ced57a68b0&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${languageWeather[0]}: ${data.wind.speed.toFixed(0)} ${
      languageWeather[1]
    }`;
    humidity.textContent = `${languageWeather[2]} ${data.main.humidity}%`;
  } catch (e) {
    alert("City not exist");
  }
}

let random = getRandomNum(10, 91);
localStorage.setItem("num", random);
async function getQuotes(quotes, random) {
  const res = await fetch(quotes);
  const data = await res.json();
  let quoteNum = random;
  quoteText.textContent = `${data[quoteNum].text}`;
  quoteAuthor.textContent = `${data[quoteNum].author}`;
}
getQuotes("data.json", random);

quoteBtn.addEventListener("click", quotesChange);
function quotesChange() {
  if (langSwitch.children[1].classList.contains("switch-on")) {
    let quotes = "dataRu.json";
    let random = getRandomNum(10, 91);
    localStorage.setItem("num", random);
    getQuotes(quotes, random);
  } else {
    let quotes = "data.json";
    let random = getRandomNum(10, 91);
    localStorage.setItem("num", random);
    getQuotes(quotes, random);
  }
}
function translate() {
  random = localStorage.getItem("num");
  if (langSwitch.children[1].classList.contains("switch-on")) {
    let quotes = "dataRu.json";
    getQuotes(quotes, random);
    languageGreeting = greetingTranslation.ru;
    user.placeholder = "[Введите имя]";
    city.placeholder = "[Введите город]";
    languageDate = dateTranslation.ru;
    languageWeather = weatherTranslation.ru;
    getWeather(languageWeather);
    languageSettings = settingsTranslation.ru;
    settingsTranslate(languageSettings);
    if (city.value === "Minsk") {
      city.value = "Минск";
    }
  } else {
    let quotes = "data.json";
    getQuotes(quotes, random);
    languageGreeting = greetingTranslation.en;
    user.placeholder = "[Enter name]";
    city.placeholder = "[Enter your city]";
    languageDate = dateTranslation.en;
    languageWeather = weatherTranslation.en;
    getWeather(languageWeather);
    languageSettings = settingsTranslation.en;
    settingsTranslate(languageSettings);
    if (city.value === "Минск") {
      city.value = "Minsk";
    }
  }
}
playMusiс.addEventListener("click", playAudio);

const playListContainer = document.querySelector(".play-list");
playList.forEach((e) => {
  const playListLi = document.createElement("li");
  const playBtn = document.createElement("button");
  playListLi.classList.add("play-item");
  playListLi.textContent = e.title;
  playListContainer.append(playListLi);
  playListLi.prepend(playBtn);
  playBtn.className = "play player-icon play-btn";
});

const playItem = document.querySelectorAll(".play-item");

const audio = new Audio();
function playAudio() {
  handlePlayBtnLi();
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = progressBar.value;
    audio.play();
    isPlay = true;
    playMusiс.classList.add("pause");
    playItem[playNum].classList.add("item-active");
    trackName.textContent = playList[playNum].title;
    playBtnLi[playNum].classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    playMusiс.classList.remove("pause");
    playItem[playNum].classList.remove("item-active");
    playBtnLi[playNum].classList.remove("pause");
  }
}

function handlePlayBtnLi() {
  for (let i = 0; i < playBtnLi.length; i++) {
    playBtnLi[i].classList.remove("pause");
  }
}
document.querySelector(".currentTime").textContent = "0:00";
document.querySelector(".durationTime").textContent = "0:00";
const progressBar = document.querySelector("#progress-bar");

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector(".currentTime").textContent = formatTime(
    Math.floor(audio.currentTime)
  );
  document.querySelector(".durationTime").textContent = formatTime(
    Math.floor(audio.duration)
  );
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener("click", setProgress);

audio.addEventListener("timeupdate", updateProgressValue);

const playBtnLi = document.querySelectorAll(".play-btn");
playBtnLi.forEach((buttonItem) => {
  buttonItem.addEventListener("click", (e) => {
    playNum = Array.prototype.indexOf.call(playBtnLi, e.target);
    playAudio(playNum);
  });
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

audio.addEventListener("ended", () => {
  playNextTrack();
});

playNext.addEventListener("click", playNextTrack);
function playNextTrack() {
  isPlay = false;
  if (playNum >= 0 && playNum < 3) {
    playItem[playNum].classList.remove("item-active");
    playNum++;
    progressBar.value = 0;
  } else {
    playItem[3].classList.remove("item-active");
    playNum = 0;
    progressBar.value = 0;
  }
  playAudio();
}
playPrev.addEventListener("click", playPrevTrack);
function playPrevTrack() {
  isPlay = false;
  if (playNum > 0 && playNum <= 3) {
    playItem[playNum].classList.remove("item-active");
    playNum--;
    progressBar.value = 0;
  } else {
    playItem[0].classList.remove("item-active");
    playNum = 3;
    progressBar.value = 0;
  }
  playAudio();
}

const soundVolume = document.querySelector(".soundVolume");
soundVolume.addEventListener(
  "input",
  function () {
    audio.volume = soundVolume.value;
  },
  false
);

function muter() {
  audio.muted = audio.muted == false ? true : false;
  if (audio.muted) {
    muteButton.style.opacity = 0.4;
  } else {
    muteButton.style.opacity = 1;
  }
}

const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", muter);
const settings = document.querySelector(".settings");
const settingsBtn = document.querySelector(".settings-btn");
settingsBtn.addEventListener("click", function () {
  settingsBtn.classList.toggle("settings-on");
  if (settingsBtn.classList.contains("settings-on")) {
    settings.classList.add("settings-active");
    settings.classList.remove("settings-not-active");
  } else {
    settings.classList.add("settings-not-active");
    settings.classList.remove("settings-active");
    imgList.classList.remove("image-list-active");
    imgList.classList.add("image-list-not-active");
    imgBtn.classList.remove("pushed");
  }
});
imgBtn.addEventListener("click", function () {
  if (imgBtn.classList.contains("pushed")) {
    imgList.classList.remove("image-list-active");
    imgList.classList.add("image-list-not-active");
    imgBtn.classList.remove("pushed");
  } else {
    imgList.classList.add("image-list-active");
    imgList.classList.remove("image-list-not-active");
    imgBtn.classList.add("pushed");
  }
});

function settingsTranslate(languageSettings) {
  langSettings.textContent = languageSettings[0];
  switchOnAll.forEach((switchOn) => {
    engLang.textContent = languageSettings[1];
    switchOn.textContent = languageSettings[3];
  });
  switchOffAll.forEach((switchOff) => {
    rusLang.textContent = languageSettings[2];
    switchOff.textContent = languageSettings[4];
  });
  playerSettings.textContent = languageSettings[5];
  weatherSettings.textContent = languageSettings[6];
  timeSettings.textContent = languageSettings[7];
  dateSettings.textContent = languageSettings[8];
  greetingSettings.textContent = languageSettings[9];
  quoteSettings.textContent = languageSettings[10];
  imageSettings.textContent = languageSettings[11];
}
settingsTranslate(languageSettings);

const langSwitch = document.querySelector(".language-switch");

switchBtn.forEach((Btn) => {
  Btn.addEventListener("click", function () {
    Btn.classList.toggle("switch-on");

    switch (Btn.parentElement.className) {
      case "language-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        translate();
        break;

      case "player-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (player.classList.contains("player-off")) {
          player.classList.add("player-on");
          player.classList.remove("player-off");
        } else {
          player.classList.add("player-off");
          player.classList.remove("player-on");
        }
        break;

      case "weather-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (weather.classList.contains("weather-off")) {
          weather.classList.add("weather-on");
          weather.classList.remove("weather-off");
        } else {
          weather.classList.add("weather-off");
          weather.classList.remove("weather-on");
        }
        break;

      case "time-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (time.classList.contains("time-off")) {
          time.classList.add("time-on");
          time.classList.remove("time-off");
        } else {
          time.classList.add("time-off");
          time.classList.remove("time-on");
        }
        break;
      case "date-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (date.classList.contains("date-off")) {
          date.classList.add("date-on");
          date.classList.remove("date-off");
        } else {
          date.classList.add("date-off");
          date.classList.remove("date-on");
        }
        break;

      case "greeting-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (greetingCont.classList.contains("greeting-off")) {
          greetingCont.classList.add("greeting-on");
          greetingCont.classList.remove("greeting-off");
        } else {
          greetingCont.classList.add("greeting-off");
          greetingCont.classList.remove("greeting-on");
        }
        break;

      case "quote-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (quoteCont.classList.contains("quote-off")) {
          quoteCont.classList.add("quote-on");
          quoteCont.classList.remove("quote-off");
        } else {
          quoteCont.classList.add("quote-off");
          quoteCont.classList.remove("quote-on");
        }
        break;
      case "todo-switch":
        this.previousElementSibling.classList.toggle("selected");
        this.nextElementSibling.classList.toggle("selected");
        if (toDo.classList.contains("todo-off")) {
          toDo.classList.add("todo-on");
          toDo.classList.remove("todo-off");
        } else {
          toDo.classList.add("todo-off");
          toDo.classList.remove("todo-on");
        }
        break;
    }
  });
});

function setLocalStorageLanguage() {
  localStorage.setItem(".ru", langSwitch.children[2].classList);
  localStorage.setItem(".en", langSwitch.children[0].classList);
  localStorage.setItem(".lang_on", langSwitch.children[1].classList);
}
window.addEventListener("beforeunload", setLocalStorageLanguage);

function getLocalStorageLanguage() {
  if (
    localStorage.getItem(".ru") &&
    localStorage.getItem(".en") &&
    localStorage.getItem(".lang_on")
  ) {
    langSwitch.children[2].classList = localStorage.getItem(".ru");
    langSwitch.children[0].classList = localStorage.getItem(".en");
    langSwitch.children[1].classList = localStorage.getItem(".lang_on");
    translate();
  }
}
window.addEventListener("load", getLocalStorageLanguage);

function setLocalStoragePlayerSet() {
  localStorage.setItem(".off_player", playerSwitch.children[2].classList);
  localStorage.setItem(".on_player", playerSwitch.children[0].classList);
  localStorage.setItem(".player_switch", playerSwitch.children[1].classList);
  localStorage.setItem(".player_off", player.classList);
}

window.addEventListener("beforeunload", setLocalStoragePlayerSet);

function getLocalStoragePlayerSet() {
  if (
    localStorage.getItem(".off_player") &&
    localStorage.getItem(".on_player") &&
    localStorage.getItem(".player_off")
  ) {
    playerSwitch.children[2].classList = localStorage.getItem(".off_player");
    playerSwitch.children[0].classList = localStorage.getItem(".on_player");
    playerSwitch.children[1].classList = localStorage.getItem(".player_switch");

    if (playerSwitch.children[1].classList.contains("switch-on")) {
      player.classList = localStorage.getItem(".player_off");
    }
  }
}

window.addEventListener("load", getLocalStoragePlayerSet);

function setLocalStorageWeatherSet() {
  localStorage.setItem(".off_weather", weatherSwitch.children[2].classList);
  localStorage.setItem(".on_weather", weatherSwitch.children[0].classList);
  localStorage.setItem(".weather_switch", weatherSwitch.children[1].classList);
  localStorage.setItem(".weather_off", weather.classList);
}

window.addEventListener("beforeunload", setLocalStorageWeatherSet);

function getLocalStorageWeatherSet() {
  if (
    localStorage.getItem(".off_weather") &&
    localStorage.getItem(".on_weather") &&
    localStorage.getItem(".weather_off")
  ) {
    weatherSwitch.children[2].classList = localStorage.getItem(".off_weather");
    weatherSwitch.children[0].classList = localStorage.getItem(".on_weather");
    weatherSwitch.children[1].classList =
      localStorage.getItem(".weather_switch");

    if (weatherSwitch.children[1].classList.contains("switch-on")) {
      weather.classList = localStorage.getItem(".weather_off");
    }
  }
}

window.addEventListener("load", getLocalStorageWeatherSet);

function setLocalStorageTimeSet() {
  localStorage.setItem(".off_time", timeSwitch.children[2].classList);
  localStorage.setItem(".on_time", timeSwitch.children[0].classList);
  localStorage.setItem(".time_switch", timeSwitch.children[1].classList);
  localStorage.setItem(".time_off", time.classList);
}

window.addEventListener("beforeunload", setLocalStorageTimeSet);

function getLocalStorageTimeSet() {
  if (
    localStorage.getItem(".off_time") &&
    localStorage.getItem(".on_time") &&
    localStorage.getItem(".time_off")
  ) {
    timeSwitch.children[2].classList = localStorage.getItem(".off_time");
    timeSwitch.children[0].classList = localStorage.getItem(".on_time");
    timeSwitch.children[1].classList = localStorage.getItem(".time_switch");

    if (timeSwitch.children[1].classList.contains("switch-on")) {
      time.classList = localStorage.getItem(".time_off");
    }
  }
}

window.addEventListener("load", getLocalStorageTimeSet);

function setLocalStorageDateSet() {
  localStorage.setItem(".off_date", dateSwitch.children[2].classList);
  localStorage.setItem(".on_date", dateSwitch.children[0].classList);
  localStorage.setItem(".date_switch", dateSwitch.children[1].classList);
  localStorage.setItem(".date_off", date.classList);
}

window.addEventListener("beforeunload", setLocalStorageDateSet);

function getLocalStorageDateSet() {
  if (
    localStorage.getItem(".off_date") &&
    localStorage.getItem(".on_date") &&
    localStorage.getItem(".date_off")
  ) {
    dateSwitch.children[2].classList = localStorage.getItem(".off_date");
    dateSwitch.children[0].classList = localStorage.getItem(".on_date");
    dateSwitch.children[1].classList = localStorage.getItem(".date_switch");

    if (dateSwitch.children[1].classList.contains("switch-on")) {
      date.classList = localStorage.getItem(".date_off");
    }
  }
}
window.addEventListener("load", getLocalStorageDateSet);

function setLocalStorageGreetingSet() {
  localStorage.setItem(".off_greeting", greetingSwitch.children[2].classList);
  localStorage.setItem(".on_greeting", greetingSwitch.children[0].classList);
  localStorage.setItem(
    ".greeting_switch",
    greetingSwitch.children[1].classList
  );
  localStorage.setItem(".greeting_off", greetingCont.classList);
}

window.addEventListener("beforeunload", setLocalStorageGreetingSet);

function getLocalStorageGreetingSet() {
  if (
    localStorage.getItem(".off_greeting") &&
    localStorage.getItem(".on_greeting") &&
    localStorage.getItem(".greeting_off")
  ) {
    greetingSwitch.children[2].classList =
      localStorage.getItem(".off_greeting");
    greetingSwitch.children[0].classList = localStorage.getItem(".on_greeting");
    greetingSwitch.children[1].classList =
      localStorage.getItem(".greeting_switch");

    if (greetingSwitch.children[1].classList.contains("switch-on")) {
      greetingCont.classList = localStorage.getItem(".greeting_off");
    }
  }
}
window.addEventListener("load", getLocalStorageGreetingSet);

function setLocalStorageQuoteSet() {
  localStorage.setItem(".off_quote", quoteSwitch.children[2].classList);
  localStorage.setItem(".on_quote", quoteSwitch.children[0].classList);
  localStorage.setItem(".quote_switch", quoteSwitch.children[1].classList);
  localStorage.setItem(".quote_off", quoteCont.classList);
}

window.addEventListener("beforeunload", setLocalStorageQuoteSet);

function getLocalStorageQuoteSet() {
  if (
    localStorage.getItem(".off_quote") &&
    localStorage.getItem(".on_quote") &&
    localStorage.getItem(".quote_off")
  ) {
    quoteSwitch.children[2].classList = localStorage.getItem(".off_quote");
    quoteSwitch.children[0].classList = localStorage.getItem(".on_quote");
    quoteSwitch.children[1].classList = localStorage.getItem(".quote_switch");

    if (quoteSwitch.children[1].classList.contains("switch-on")) {
      quoteCont.classList = localStorage.getItem(".quote_off");
      quoteBtn.classList.add("quote-off");
    }
  }
}
window.addEventListener("load", getLocalStorageQuoteSet);

document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("Please Enter a Task");
  } else {
    document.querySelector("#tasks").innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${document.querySelector("#newtask input").value}
              </span>
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
          </div>
          
      `;

    const current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
        localStorage.removeItem("task");
      };
    }
  }
};
let task = document.querySelector("#newtask input").value;
localStorage.setItem("task", task);
function setLocalStorageTasks() {
  localStorage.setItem("taskValues", JSON.stringify(tasksArray));
}
window.addEventListener("beforeunload", setLocalStorageTasks);
