var express = require('express');
var app = express();

app.get('/test1', function(req, res){
  res.jsonp(test1);
});

app.listen(8000);


var test1 = {"sSLRequired(https)":true,"defaultPageSize":20,"dateFormat":"MM/dd/yyyy","hideMyStuff":false,"defaultLast":true,"defaultTextFilterContains":false,"defaultWorkspace":0,"username":"","headerContent":"","allowCreate":"Developer,Admin,User","password":"      ","allowEdit":"Developer,Admin,User","isMultiLanguages":false,"domain":"","allowDelete":"Developer,Admin,User","serverURL":"","path":"","allowRead":"Developer,Admin,User","viewsOwner":"","denyCreate":"","denyEdit":"","denyDelete":"","denyRead":"","secureLevel":"RegisteredUsers","defaultGuestRole":"","generalCss":"","pushAppsAPISecretToken":"      ","workspace":{"id":0,"name":"Public","homePage":10034,"pages":[{"id":10034,"name":"Home","partType":"content","partId":"0"},{"id":10106,"name":"test1","partType":"table","partId":"test1"},{"id":10072,"name":"test","partType":"table","partId":"test"},{"id":10035,"name":"Dashboard","partType":"dashboard","partId":null,"pages":[{"id":10036,"name":"New Page","partType":"content","partId":"1"},{"id":10037,"name":"My Website","partType":"content","partId":"2"}]}]}};
