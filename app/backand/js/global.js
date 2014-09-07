var backandGlobal = {
    url: "https://www.backand.com:8080",// 
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
