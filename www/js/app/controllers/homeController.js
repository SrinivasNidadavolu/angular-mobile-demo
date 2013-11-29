/*
* HomeController.js
*/
app.controller('HomeController', function($scope, $rootScope, ConfigFactory){
	ConfigFactory.title = 'Angular boilerplate';
	ConfigFactory.hasHeader = true;
	ConfigFactory.hasFooter = true;

	$scope.emitToast = function(){
		$rootScope.$emit('makeToast', [{title:'This is an emmited toast', type:'success'}]);
	}
});