var backandGlobal = {
    url: "https://api.backand.com:8099",
    defaultApp: null,
};



function onready($scope) {
    angular.element(document).ready(function () {
        backand.security.authentication.addLoginEvent();
        document.dispatchEvent(backand.security.authentication.onlogin);
    });
}