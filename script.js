const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "9ec2369f5b370d37af652aa748f65138";

weatherform.addEventListener("submit", async event =>{

    event.preventDefault();
    const city = cityinput.value;
    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherInfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please a City")
    }

});

async function getweatherdata(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();

}

function displayweatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    

}

function getweatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌦️";
            break;
        case (weatherId >=300 && weatherId < 400):
            return "🌦️";
            break;
        case (weatherId >=500 && weatherId < 600):
            return "🌦️";
            break; 
        case (weatherId >=600 && weatherId < 700):
            return "❄️";
            break;
        case (weatherId >=700 && weatherId < 800):
            return "🌁";
            break;
        case (weatherId == 800):
            return "☀️";
            break; 

        case (weatherId >=801 && weatherId < 810):
            return "☁️";
            break;
        default:
            return "❓";
        

    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}