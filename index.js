const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[ data-searchForm]")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")

// initial variables

let currentTab = userTab;
const API_KEY = "7910f74fe311a381a0d5cf93d88eacd7"
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab")
    currentTab = clickedTab
    currentTab.classList.add("current-tab")

    if (!searchTab.classList.contains("active")) {
      grantAccessContainer.classList.remove("active")
      userInfoContainer.classList.remove("active")
      searchTab.classList.add("active")
    } else {
      searchTab.classList.remove("active")
      userInfoContainer.classList.remove("active")
      getfromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  switchTab(userTab);
})
searchTab.addEventListener("click", () => {
  switchTab(searchTab);
})

function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessContainer.classList.add("active")
  } else {
    const coordinates = JSON.parse(localCoordinates)
    fetchUserWeatherInfo(coordinates);
  }

}
async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  // make grant container invisible
  grantAccessContainer.classList.remove('active')
  // make loader visible 
  loadingScreen.classList.add("active")
  // API call
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const data = await response.json();
    loadingScreen.classList.remove('active')
    userInfoContainer.classList.add('active')
    renderWeatherInfo(data)
  } catch (error) {
    loadingScreen.classList.remove("active")
    console.log(error)
  }




}
function renderWeatherInfo(weatherInfo) {
  // fetching the elements
  const cityName = document.querySelector("[data-cityName]")
  const countryIcon = document.querySelector("[data-countryIcon]")
  const desc = document.querySelector("[data-weatherDesc]")
  const weatherIcon = document.querySelector("[data-weatherIcon ]")
  const temp = document.querySelector("[data-temp ]")
  const windspeed = document.querySelector("[data-windspeed ]")
  const humidity = document.querySelector("[data-humidity ]")
  const cloudiness = document.querySelector("[data-cloudiness ]")
  // fetch value fro, weatherInfo and put it in ui
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144*108/${weatherInfo?.sys?.country.toLowerCase()}.png`
  desc.innerText = weatherInfo?.weather?.[0]?.description
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
  temp.innerText = weatherInfo?.main?.temp;
  windspeed.innerText = weatherInfo?.wind?.speed;
  humidity.innerText = weatherInfo?.wind?.humidity
  cloudiness.innerText = weatherInfo?.clouds?.all;
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("geoLocation support not available")
  }
}
function showPosition(position) {
  let userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude

  }
  sessionStorage.setItem("",JSON.stringify(userCoordinates))
  fetchUserWeatherInfo(userCoordinates);

}
const grantAccessButton = document.querySelector("[ data-grantAccess]")
grantAccessButton.addEventListener("click", getLocation);

// search input 
let searchInput=document.querySelector("[data-searchInput ]")

searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(!searchInput.value) return
  fetchSearchWeatherInfo(searchInput.value)
})
















// userTab.addEventListener("click", () => {
//   // switchTab(userTab);

//   userTab.classList.add("current-tab");

//   searchTab.classList.remove("current-tab");
//   userInfoContainer.classList.remove("active")
// // check session



// })
// searchTab.addEventListener("click", () => {
//   // switchTab(searchTab);
//   searchTab.classList.add("current-tab");
//   userTab.classList.remove("current-tab");
//   searchForm.classList.add("active");
//   userInfoContainer.classList.remove("active")
//   grantAccessContainer.classList.remove("active")


// })