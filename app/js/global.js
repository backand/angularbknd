var backandGlobal = {
    url: "http://api.backand.info:8099",
    defaultApp: null,
};



function onready($scope) {
    angular.element(document).ready(function () {
        //$('body').append("<script src='" + backandGlobal.url + "/api/banner'><\/script>");        
        backand.security.authentication.addLoginEvent();
        document.dispatchEvent(backand.security.authentication.onlogin);
    });
}