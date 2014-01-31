/*
* RecoverController.js
*/
app.controller('RecoverController', function($scope, $rootScope, $location, ConfigFactory){
	ConfigFactory.title = 'Recover your password';
	ConfigFactory.hasHeader = true;
	ConfigFactory.hasFooter = false;
	ConfigFactory.hasSideNavigation = false;

	$scope.mailsent = false;

	$scope.recoverSubmit = function(){
		$scope.mailsent = !$scope.mailsent;
	};
});