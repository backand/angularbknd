'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','testService2', function($scope , testService2) {
  	$scope.tset ="TEST";
  	$scope.init = function (){
  		console.log("init")
  		$scope.test ="TEST";
  		// console.log(testService);
  		testService2.queryjsonp({table:'test1'},function(data){
  			console.log(data);

  			$scope.pages = data.workspace.pages;


  		});
  	}

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
