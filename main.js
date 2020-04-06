
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
    
    //time of the city 
    //var time = formDate(date);
    
    //get weather main
    var weather = "<h4>Weather:" + response.weather[0].main + "</h4>";
	
    // get type of weather in string format
	var type = "<h4>Description:"+ response.weather[0].description + "</h4>";

	// get temperature in Celcius
	var degC = "<h4>Temperature:" + Math.floor(response.main.temp - 273.15) + "</h4>";
    
	//get humidity
    var hum = "<h4>Humidity:" + response.main.humidity + "</h4>";
    
    // render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = titel + weather + type + degC +'&#176;C' + hum;
}
    
//function formDate(date) {
	//var day = date.getDate();
	//var month = date.getMonth() + 1;
	//return day +' / '+ month;
//}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Geen weergegevens beschikbaar <bro /> Heb je een geldige stad ingevoerd?'; 
}
