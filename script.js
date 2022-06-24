function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let input = document.querySelector("#inputCity");
  city.innerHTML = `${input.value}`;
  function TempCity(responce) {
    let weather = Math.round(responce.data.main.temp);
    let temp = document.querySelector("#tempC");
    temp.innerHTML = `${weather}`;
    let humidity = responce.data.main.humidity;
    let humid = document.querySelector("#humid");
    humid.innerHTML = `Humidity: ${humidity}%`;
  }
  cityName = input.value;
  cityName = cityName.toLowerCase();
  cityName = cityName.trim();
  console.log(cityName);
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  cityURL = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(cityURL);
  axios.get(cityURL).then(TempCity);
}
function changeToCurrentCity(event) {
  event.preventDefault();
  function retrievePosition(position) {
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);
    let apiKey = "4bef2345e330426bc02f380640dec5ea";
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(weatherURL);
    function Weather(responce) {
      let city = responce.data.name;
      let country = responce.data.sys.country.toLowerCase();
      let weather = Math.round(responce.data.main.temp);
      let temp = document.querySelector("#tempC");
      temp.innerHTML = `${weather}`;
      let humidity = responce.data.main.humidity;
      let humid = document.querySelector("#humid");
      humid.innerHTML = `Humidity: ${humidity}%`;
      function CountryName(responce) {
        let countryName = responce.data[country];
        let currentcity = document.querySelector("h1");
        currentcity.innerHTML = `${city}, ${countryName}`;
        document.getElementById(
          "flag"
        ).src = `https://flagcdn.com/w80/${country}.png`;
      }
      let countryURL = "https://flagcdn.com/en/codes.json";
      axios.get(countryURL).then(CountryName);
    }
    axios.get(weatherURL).then(Weather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let time = document.querySelector("#currenttime");
let date = new Date();
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = date.getHours();
let minutes = date.getMinutes();
let day = weekday[date.getDay()];
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}, ${day}`;

let search = document.querySelector("#search");
search.addEventListener("submit", changeCity);

//Current City, country and flag

let current = document.querySelector("#current-city");
current.addEventListener("click", changeToCurrentCity);

//function changeToF(event) {
//event.preventDefault();
//let temp = document.querySelector("#tempC");
//}
//let fahrenheit = document.querySelector("#fahr");
//fahrenheit.addEventListener("click", changeToF);
//function changeToC(event) {
//event.preventDefault();
//  let temp = document.querySelector("#tempC");
//  temp.innerHTML = "22";
//}
//let celsius = document.querySelector("#celcius");

//celsius.addEventListener("click", changeToC)
