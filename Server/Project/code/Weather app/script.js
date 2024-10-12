const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0dd01b7ca9msh52429939036d887p1ea59djsn7e3c5f252620',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
const getwether = (city) => {
    cityName.innerHTML = city;
    let cityn=document.getElementsByClassName('city');
    cityn[0].innerHTML=city;
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+ city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            temp.innerHTML = response.temp;           
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp; 
            wind_speed.innerHTML=response.wind_speed;
            wind_degrees.innerHTML=response.wind_degrees;
            cloud_pct.innerHTML=response.cloud_pct;
        })
        .catch(err => console.error(err));
}
 let submit = document.getElementById('submit');
 submit.addEventListener("click", (e) =>{
     e.preventDefault();
     getwether(city.value);
 })
getwether("delhi")



