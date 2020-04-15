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
  
    var titel = "<h3 style='font-size: 18px'>Current weather for " + response.name + " , " + response.sys.country + "</h3>"
    
    var icon = "<h4 style='padding-left: 10px'><img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png' style=' width: 40px; padding: 0px'>";

    var weather = "<h4 style='padding-left: 10px'>Weather: " + response.weather[0].main + "</h4>";
    
	var type = "<h4 style='padding-left: 10px'>"+ response.weather[0].description + "</h4>";

	var degC = "<h4 style='padding-left: 10px'>Temperature: " + Math.floor(response.main.temp - 273.15) + "&#176;C </h4>";

    var feelsLike = "<h4 style='padding-left: 10px'>Feel like: " + response.main.feels_like + "&deg;</h4>";
 
    var hum = "<h4 style='padding-left: 10px'>Humidity: " + response.main.humidity + "%</h4>";
    
    var wind = "<h4 style='padding-left: 10px'>Wind speed: " + response.wind.speed + "m/s</h4>";
    
	    
    // render weather in DOM
	var titelOf = document.getElementById('titel');
	       titelOf.innerHTML = titel; 
    
    var iconOf = document.getElementById('weatherIcon');
	       iconOf.innerHTML = icon;
    
    var weatherOf = document.getElementById('weather');
	       weatherOf.innerHTML = weather;
    
    var typeOf = document.getElementById('titel');
	       typeOf.innerHTML = type;
    
    var degCOf = document.getElementById('temp');
	       degCOf.innerHTML = degC;
    
     var feelsLikeOf = document.getElementById('feelsLike');
	       feelsLikeOf.innerHTML = feelsLike;
    
    var humOf = document.getElementById('hum');
	       humOf.innerHTML = hum;
    
    var windOf = document.getElementById('windSpeed');
	      windOf .innerHTML = wind;
}

function onAPIError(error) {
    var weatherBox = document.getElementById('weather');
    var city = document.getElementById('city');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
    weatherBox.style.borderColor = "red";
    city.style.borderColor = "red";
}


////////////////////////////////////////////////////////forecast function///////////////////////////////////////////////////////////

function getHourlyForecast() {
	var url = 'https://api.openweathermap.org/data/2.5/forecast';
	var apiKey ='671ed302134d547adf8e79c854664915';
	var city = document.getElementById('city').value;;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
        console.log(weather); 
		// render weatherCondition
		getForecast(response);
	})
	
	// catch error
	.catch(function (error) {

		console.error('Request failed', error);
	});
}

function getForecast(response) {

    var forecastBox = document.getElementById('forecast');
    var forecastList = response.list;
	
	for(var i=0; i< forecastList.length; i++){
     
        var dateTime = new Date(forecastList[i].dt_txt);
        var icon =  "<h4 style='padding-left: 10px'><img src='http://openweathermap.org/img/w/"+forecastList[i].weather[0].icon+".png' style=' width: 40px; padding: 0px'>";
		var temp = Math.floor(forecastList[i].main.temp - 273.15);
        var hum = forecastList[i].main.humidity;

        forecastMessage =  '<div class="forecastMoment">';
        forecastMessage +=	 '<div class="time"> '+icon+' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
        forecastMessage +=	 '<div class="time"> '+hum+' </div>';
		forecastMessage += '</div>';

        forecastBox.innerHTML += forecastMessage;
                   
	}

}

/////////////////////////////////////////////////////////sunrise/sunset/////////////////////////////////////////////////////////////

function showSunRiseSet(){
    
    var url = 'https://api.stormglass.io/v2/astronomy/point';
    var lat = '58.7984';
    var lng = '17.8081';   
	var apiKey ='dbcd824e-7b46-11ea-b83a-0242ac130002-dbcd8302-7b46-11ea-b83a-0242ac130002';
	var city = document.getElementById('city').value;
    
    var request = url + '?' + 'lat=' + '$' + lat + '&' +'lng=' + '$' + lng + 'appid=' + apiKey + '&' + 'q=' + city;
    
    fetch(request)
    
    .then((response) => response.json()).then((jsonData) => {
            sunRiseSetTimes(jsonData)
    });
    }


function sunRiseSetTimes(jsonData) {
    
    var sunBox = document.getElementById('sunRiseSet');   
    
    var text = {
        "data": [
        {
            "sunrise": "5:05:55 AM </br> <img src='sunrise-100px.svg' class='sunrise' style='width: 40px; padding: 0px'>",
            "sunset": "5:05:55 PM </br> <img src='sunset-100px.svg' class='sunset' style=' width: 40px; padding: 0px'>",
            "day_length": "13:10:31",
        
        }]
    }
    
    document.getElementById('sunrise').innerHTML = text.data[0].sunrise; document.getElementById('sunset').innerHTML = text.data[0].sunset; document.getElementById('daylength').innerHTML = text.data[0].day_length;
    
    
    //sunRiseSet.innerHTML = text.data[0].sunrise +'</br>'+ text.data[0].sunset +'</br>' + text.data[0].day_length;
}


//////////////////////////////////////////////////////map/////////////////////////////////////////////////////////////////////////

mapboxgl.accessToken = 'pk.eyJ1IjoiemV5bmFiYWJkdWxoYW5hbiIsImEiOiJjazkxdjg0ZTcwMWt3M2xtcnk1aDFybHM4In0.7yRO7RB895NjzcHXZNuA7g';

// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '671ed302134d547adf8e79c854664915';

// Determine cities
var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'Paris',
    coordinates: [48.856613, 2.352222]
  },
  {
    name: 'London',
    coordinates: [51.507351, -0.127758]
  },
  {
    name: 'New York',
    coordinates: [40.712776, -74.005974]
  },
  {
    name: 'Jakarta',
    coordinates: [-6.175110, 106.865036]
  },
  {
    name: 'Dubai',
    coordinates: [25.204849, 55.270782]
  },
];

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [5.508852, 52.142480],
  zoom: 7
});


// get weather data and plot on map
map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('getWeather').onclick = function(){
    getAPIdata();
    getHourlyForecast();
    showSunRiseSet();   
}