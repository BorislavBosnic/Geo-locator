var resultObject = null;

function httpGet(theUrl)
{

  
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function myMap() {
	
var myLatlng = new google.maps.LatLng(resultObject.latitude, resultObject.longitude);
	
var mapOptions = {
    center: new google.maps.LatLng(resultObject.latitude, resultObject.longitude),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});

marker.setMap(map);

}

chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
  var url = tabs[0].url;
  var res = url.split("://");
  var domainName = res[1];
  var res2 = domainName.split("/");
  var domainName2 = res2[0];
  	document.getElementById("domen").innerHTML=domainName2;
	if(domainName2 == "newtab")
		domainName2="";
	
	var response = httpGet("http://freegeoip.net/json/" + domainName2);
	
	var obj = JSON.parse(response);
	resultObject = obj;

	
  	document.getElementById("response").innerHTML="IP adresa: " + obj.ip + '<br>' +  "Drzava: " + obj.country_name +  '<br>' + "Region: "+ obj.region_name + '<br> '+ "Grad: " + obj.city + '<br>' + "Vremenska zona: " + obj.time_zone;



});


