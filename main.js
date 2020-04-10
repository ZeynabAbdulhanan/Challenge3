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
    
    //$("#forecast").empty();
	
	for(var i=0; i< forecastList.length; i++){
     
        var dateTime = new Date(forecastList[i].dt_txt);
        var titel = ''; 
		var date = 'Date:' + dateTime.getDay() + '/' + dateTime.getMonth();
		var timeHour = 'Time:'+ dateTime.getHours(); 
        var timeMin = 'Time:' + dateTime.getMinutes();
		var temp = 'Tempurate:' + Math.floor(forecastList[i].main.temp - 273.15);
        var hum = 'Humidity:' + forecastList[i].main.humidity;
        
         
        //timeHour = (timeHour > 12) ? timeHour - 12 : timeHour;
        
        //timeHour = (timeHour < 10) ? "0" + timeHour : timeHour
        //timeMin = (timeMin < 10) ? "0" + timeMin : timeMin
        
        //var h5date= '<p class="date"> '+date+' </p>';
        //var pTemp = '<p class="temp"> '+temp+'&#176;C </p>';
        //var pHum = '<p class="hum"> '+hum+' </p>';
        
        //var weather = forecastList[i].weather[0].main
        
            //if (weather === "Rain") {
                //var icon = "<img src='http://openweathermap.org/img/wn/09d.png' style=' width: 40px; padding: 0px'>";
            //else if (weather === "Clouds") {
                //var icon = "<img src ='http://openweathermap.org/img/wn/03d.png' style =' height: 40px; width: 40px'>";
            //} 
            //else if (weather === "Clear") {
                //var icon = "<img src= 'http://openweathermap.org/img/wn/01d.png' style= ' height: 40px; width: 40px'>";
            //}
            //else if (weather === "Drizzle") {
                //var icon = "<img src = 'http://openweathermap.org/img/wn/10d.png' style ='height: 40px; width: 40px'>";
            //}
            //else if (weather === "Snow") {
                //var icon = "<img src = 'http://openweathermap.org/img/wn/13d.png' style = 'height: 40px; width: 40px'>";
            //}
        
        text = '<div class="forecastDiv">';
        text += '<p class="titelDiv"> '+titel+'</p>';
        //text += '<img class="weather' +weather+'>';         
        text +='<p class="date"> '+date+' </p>';
		text +='<p class="timeHour"> '+timeHour+'</p>'; text += '<p class="timeMin">'+timeMin+'</p>';
		text +='<p class="temp"> '+temp+'&#176;C </p>';
        text +='<p class="hum"> '+hum+' %</p>';
		text +='</div>';

		forecastBox.innerHTML += text;
	}
    
     //forecastBox.append("h5date");
     //forecastBox.append("pTemp");
     //forecastBox.append("pHum");
     //$("#forecast").append("forecastBox");
}

/////////////////////////////////////////////////////////sunrise/sunset/////////////////////////////////////////////////////////////
function getAPIdata2() {
    
    const riseSetTimes = document.getElementById('sunRiseSet');
    
    const sendHttpRequest = (method, url, data) =>{
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: data ? {'Content-Type': 'text/html; charset=UTF-8' } : {} 
            
        })
        .then(response => {
            if (response.status >=400){ //response ok
            console.error('Request failed', error);
            
        }
            return response.json();
        });
};

    const getData = () =>{
        sendHttpRequest('GET', 'https://sunrise-sunset.org/api')
        .then(response => {
        return response.json();
    })
        .then(responseData =>{
        console.log(responseData);
    });
};
    
    const sendData = () => {
        sendHttpRequest('POST', 'https://sunrise-sunset.org/api'), {
            "results":
        {
            "sunrise":"2015-05-21T05:05:35+00:00",
            "sunset":"2015-05-21T19:22:59+00:00"
        }
      
    };

}
    













//function sunRiseSet(){
    
    //var city = document.getElementById('city').value;
    
    //const sendHttpRequest = (method, url, data) =>{
        //const promsie = new promsie((resolve, reject)) => {
            //const xhr = new XMLHttpRequest(); 
            //xhr.open(method, url);
            
            //xhr.responseType = 'json'; 
            
            //if (data) {
                //xhr.setRequestHeader('content-type', 'application/json')
            //}
            
            //xhr.onload = () => {
                //if (xhr.status >= 400){
                    //reject(xhr.response); 
                //} else{
                    //resolve(xhr.response); 
                //}
            //}; 
            
            //xhr.onerror = () => {
                //reject('something went wrong!');
            //};
            
            //xhr.send(JSON.stringify(data));        
        //});
        //return promsie;
    //}; 

//function getSunRiseSet(response){
    
    //var sunRise = response.results.sunrise;
    //var sunSet = response.results.sunset; 
    //var DayLength = response.results.day_length;
    
    //var sunRiseSet = document.getElementById('sunRiseSet');
    //sunRiseSet = sunRise + sunSet + DayLength;
    
//}

//document.getElementById('getWeather').onclick = function(){
    //getAPIdata();
    //getHourlyForecast();
    //getAPIdata2();
}