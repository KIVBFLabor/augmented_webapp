window.onload=function(){
	var watchID = null;
	// Dies ist die Toleranz für die Koordinaten
	var tol1 = 0.0001;
	var tol2 = tol1*2;
	var tol3 = tol2*2;
	// Dieses Array enthält Personen mit Namen, Längen- und Breitengraden
	var locations = new Array(
		{name:"Sascha & Raphael", lat:48.0270174, lon:7.8093796},
		{name:"Stefan", lat:48.0270459, lon:7.8095432},
		{name:"Johannes", lat:49.0076881, lon:8.3448834}
	);
	
	function getDistance(lat, lon, latloc, lonloc){
		var latdif = lat-latloc;
		if(latdif<0){
			latdif = -latdif;
		}
		var londif = lon-lonloc;
		if(londif<0){
			londif = -londif;
		}
		var distance = Math.sqrt((Math.pow(latdif, 2)+Math.pow(londif, 2)));
		return distance;
	}
	
	function getClosest(lat, lon){
		var closest;
		var lodist = null;
		for(var i = 0; i < locations.length; i++){
			var latloc = locations[i].lat;
			var lonloc = locations[i].lon;
			
			var dist = getDistance(lat,lon,latloc,lonloc);
			if(dist < lodist || lodist === null){
				closest = i;
				lodist = dist;
			}
		}
		return closest;
	}

	function checklocation(lat, lon){
		var closest = getClosest(lat, lon);
		// Das Array von Personen/Orten wird durchlaufen
		// Die Toleranzen werden zu jedem Wert hinzugefügt
		var latloc = locations[closest].lat;
		var lonloc = locations[closest].lon;
		// Die Werte werden mit der aktuellen Position verglichen
		if((latloc-tol1)<lat && lat<(latloc+tol1) && (lonloc-tol1)<lon && lon<(lonloc+tol1)){
			document.getElementById("text").style.color = "##3ea341";
			document.getElementById("text").innerHTML = locations[closest].name+"!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
		}else if((latloc-tol2)<lat && lat<(latloc+tol2) && (lonloc-tol2)<lon && lon<(lonloc+tol2)){
			document.getElementById("text").style.color = "#FECD1B";
			document.getElementById("text").innerHTML = locations[closest].name+"!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
		}else if((latloc-tol3)<lat && lat<(latloc+tol3) && (lonloc-tol3)<lon && lon<(lonloc+tol3)){
			document.getElementById("text").style.color = "#C54623";
			document.getElementById("text").innerHTML = locations[closest].name+"!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
		}else{
			document.getElementById("text").style.color = "#58585A";
			document.getElementById("text").innerHTML = "Es ist niemand in der Nähe, den ich kenne!<br>Breitengrade: "+lat+"<br>Längengrade: "+lon;
		}
		/*for(var i = 0; i < locations.length; i++){
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
		}*/
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
		alert("code: "    + error.code    + "\n" +
		"message: " + error.message + "\n");
	}
	
	var options = {enableHighAccuracy: true,timeout: 0,maximumAge: Infinity};
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
};