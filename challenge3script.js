
function getAPIdata() {

	// construct request
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=671ed302134d547adf8e79c854664915&q=the%20Hague,nl';

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		//console.log(response);
		var weatherBox = document.getElementById('weather');
		//weatherBox.innerHTML = response;
		//weatherBox.innerHTML = response.weather[0].description;
		//weatherBox.innerHTML = response.main.temp;

		// var degC = Math.floor(response.main.temp - 273.15);
		// var weatherBox = document.getElementById('weather');
		// weatherBox.innerHTML = degC + '&#176;C <br>';
	});
}

// init data stream
getAPIdata();

