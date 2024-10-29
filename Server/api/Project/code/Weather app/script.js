const options = {
    method: 'GET',
    headers: {
        // 'X-RapidAPI-Key': '0dd01b7ca9msh52429939036d887p1ea59djsn7e3c5f252620',
         'X-RapidAPI-Key': 'a303f1cbc9ce43339b754229241410',
        // 'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
const temp=document.getElementById('temp');
const cloud_pct=document.getElementById('cloud_pct');
const min_temp=document.getElementById('min_temp');
const wind_speed=document.getElementById('wind_speed');
const wind_degrees=document.getElementById('wind_degrees');
const max_temp=document.getElementById('max_temp');

const getWeather = (name) => {
    // Set city name in multiple places
    document.getElementById('cityName').innerHTML = name;
    const cityElements = document.getElementsByClassName('city');
    if (cityElements.length > 0) {
        cityElements[0].innerHTML = name;
    }
  
    // Fetch weather data
    fetch(`https://api.weatherapi.com/v1/current.json?key=a303f1cbc9ce43339b754229241410&q=${name}`)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            
            // Ensure data is present and update UI accordingly
            if (response.current) {
                document.getElementById('temp').innerHTML = response.current.temp_c;
                document.getElementById('max_temp').innerHTML = response.current.temp_c; // Modify this based on the actual available data
                document.getElementById('min_temp').innerHTML = response.current.temp_c; // Modify this based on the actual available data
                document.getElementById('wind_speed').innerHTML = response.current.wind_kph;
                document.getElementById('wind_degrees').innerHTML = response.current.wind_degree;
                document.getElementById('cloud_pct').innerHTML = response.current.feelslike_c; // Adjust based on actual key for 'feels like'
            } else {
                console.error("Weather data is not available in the response.");
            }
        })
        .catch(err => console.error(err));
};

 let submit = document.getElementById('submit');
 submit.addEventListener("click", (e) =>{
     e.preventDefault();
     getWeather(city.value);
 })
 getWeather("delhi")



