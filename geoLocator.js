var resultObject = null;

function httpGet(theUrl)
{

  
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
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
 /* var url = tabs[0].url;
  var res = url.split("://");
  var domainName = res[1];
  var res2 = domainName.split("/");
  var domainName2 = res2[0];*/
  var url = new URL(tabs[0].url);
  var hostname = url.hostname;
  	document.getElementById("domen").innerHTML=hostname;
	if(url.hostname == "newtab" || url.protocol == "chrome:")
		hostname="";
	
	var response = httpGet("http://freegeoip.net/json/" + hostname);
	
	var obj = JSON.parse(response);
	resultObject = obj;

	
  	document.getElementById("response").innerHTML=` IP adresa:  ${ obj.ip } <br> Drzava: ${obj.country_name} <br> Region:  ${obj.region_name} <br> Grad: ${obj.city} <br> Vremenska zona: ${obj.time_zone}`;



});


