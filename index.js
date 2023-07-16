const userTab=document.querySelector("[data-userWeather]")
const searchTab=document.querySelector("[data-searchWeather]")
const userContainer=document.querySelector(".weather-container")
const grantAccessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[ data-searchForm]")
const loadingScreen=document.querySelector(".loading-container")
const userInfoContainer=document.querySelector(".user-info-container")

// initial variables

let currentTab=userTab;
const API_KEY="7910f74fe311a381a0d5cf93d88eacd7"
currentTab.classList.add("current-tab");

function switchTab(clickedTab){
  if(clickedTab!=currentTab){
    currentTab.classList.remove("current-tab")
    currentTab=clickedTab
    currentTab.classList.add("current-tab")
  }
}


userTab.addEventListener("click",()=>{
  switchTab(userTab);
})
searchTab.addEventListener("click",()=>{
  switchTab(searchTab);
})