var backandGlobal = {
    url: "http://localhost:40002/",//"http://localhost:4109/backapi", //"http://api.backand.info:8099",// "http://localhost:4109/backapi", //
    defaultApp: null,
};

//load the backand banner
$(document).ready(function () {
    angular.element(document).ready(function () {
        backand.security.authentication.addLoginEvent();
        document.dispatchEvent(backand.security.authentication.onlogin);
    });
});


var zfill = function (num, len) { return (Array(len).join("0") + num).slice(-len); }
