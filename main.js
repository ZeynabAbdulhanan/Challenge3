function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='671ed302134d547adf8e79c854664915';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
    //titel
    var titel = "<h3 style='font-size: 18px'>Current weather for " + response.name + " , " + response.sys.country + "</h3>"
    
    //dat of today 
    //var time = formDate(date);
    
    //get weather main
    var weather = "<h4 style='padding-left: 10px'>Weather: " + response.weather[0].main + "</h4>";
	
    // get type of weather in string format with icon
	var type = "<h4 style='padding-left: 10px'>Description: <img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png' style=' width: 40px; padding: 0px'>"+ response.weather[0].description + "</h4>";

	// get temperature in Celcius
	var degC = "<h4 style='padding-left: 10px'>Temperature: " + Math.floor(response.main.temp - 273.15) + "&#176;C </h4>";
    
    //get feels like
    var feelsLike = "<h4 style='padding-left: 10px'>Feel like: " + response.main.feels_like + "&deg;</h4>";
    
	//get humidity
    var hum = "<h4 style='padding-left: 10px'>Humidity: " + response.main.humidity + "%</h4>";
    
    //get wind speed 
    var wind = "<h4 style='padding-left: 10px'>Wind speed: " + response.wind.speed + "m/s</h4>";
    
    // render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = titel + weather + type + degC  + feelsLike + hum + wind;
}

//function formDate(date) {
	//var day = date.getDate();
	//var month = date.getMonth() + 1;
	//return day +' / '+ month;
//}

function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
    var text = document.getElementById('city'); 
    weatherBox.innerHTML = 'No weather data available, <bro /> Have you entered a valid city?'; 
    weatherBox.style.border = "1px solid red"; 
    text.style.border = "1px solid red";
}

//function forecast

function getCurrentForecast() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='671ed302134d547adf8e79c854664915';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
    
    	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(data) {
		if(!data.ok) throw Error(data.statusText);
		return data.json();
	})
	
	// render weather per day
	.then(function(data) {
		// render weatherCondition
		onAPISucces(data);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}