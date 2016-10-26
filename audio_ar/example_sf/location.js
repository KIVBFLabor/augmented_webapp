window.onload=function(){
	var watchID = null;
	// Dies ist die Toleranz für die Koordinaten
	var tol = 0.0001;
	// Dieses Array enthält Personen mit Namen, Längen- und Breitengraden
	var locations = new Array(
		{name:"Sascha & Raphael", lat:48.0270174, lon:7.8093796},
		{name:"Stefan", lat:48.0270459, lon:7.8095432},
		{name:"Johannes", lat:49.0076881, lon:8.3448834}
	);
	

	function checklocation(lat, lon){
		// Das Array von Personen/Orten wird durchlaufen
		for(var i = 0; i < locations.length; i++){
			// Die Toleranzen werden zu jedem Wert hinzugefügt
			var lolat = locations[i].lat-tol;
			var hilat = locations[i].lat+tol;
			var lolon = locations[i].lon-tol;
			var hilon = locations[i].lon+tol;
			// Die Werte werden mit der aktuellen Position verglichen
			if(lolat<lat && lat<hilat && lolon<lon && lon<hilon){
				document.getElementById("text").innerHTML = "Du bist bei "+locations[i].name+"!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
				break;
			}else{
				document.getElementById("text").innerHTML = "In diesem Zimmer ist niemand, den ich kenne!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
			}
		}
	}

	function onSuccess(position) {
		checklocation(position.coords.latitude, position.coords.longitude);
	}
	
	function clearWatch() {
		if (watchID != null) {
			navigator.geolocation.clearWatch(watchID);
			watchID = null;
		}
	}
	
	function onError(error) {
		alert('code: '    + error.code    + '\n' +
		'message: ' + error.message + '\n');
	}
	
	var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0,desiredAccuracy: 0};
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
};