var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider){

	$routeProvider
		.when('/home', {
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.when('/tradings', {
			templateUrl: 'templates/page.html',
			controller: 'PageController'
		})
		.otherwise({
			redirectTo:'/home'
		});
});



app.controller('MainController', function($scope, $element, ConfigFactory){

    //TODO: change mainCtrlProps to a factory module to share among controllers
	$scope.config = ConfigFactory;

    $scope.contentStyles = function(){
        var contentH = $(window).height();
        var contentTop = 0;
        if($scope.config.hasFooter){
            contentH -= $element.find('#footer').outerHeight();
        }
        if($scope.config.hasHeader){
            var headerH = $element.find('#header').outerHeight();
            contentH -= headerH;
            contentTop = headerH;
        }
        return  'height:' + contentH + 'px; top:' + contentTop + 'px';
    };

	$scope.toggleSideNav = function(){
		$element.find('#wrapper').toggleClass('open');
	};
});


app.factory('ConfigFactory', function(){
	return {
		title : 'Angular boilerplate from factory',
		hasFooter: false,
		hasHeader:false
	}
});


app.controller('HomeController', function($scope, ConfigFactory){
	ConfigFactory.title = 'Angular boilerplate';
	ConfigFactory.hasHeader = true;
	ConfigFactory.hasFooter = true;
});
app.controller('PageController', function($scope, ConfigFactory, StoresModel){
	ConfigFactory.title = 'Angular boilerplate';
	ConfigFactory.hasHeader = true;
	ConfigFactory.hasFooter = false;

	$scope.stores = [];
	var storesSuccess = function(data, status){
		$scope.stores = data;
		console.log(status);
	};
	StoresModel.getStores().success(storesSuccess);
});

/*----------------
 DIRECTIVES:
 E is for element,
 A is attribute,
 C is for class,
 M is for comment.
 ---------------*/
app.directive('firstDirective', function(){
	return {
		restrict: "E",
		template: "<div>I am a directive i have been updated using grunt....</div>"
	};
});

app.directive('secondDirective', function(){
	return {
		restrict: "A",
		link: function(){
			console.log('I am second directive');
		}
	};
});

app.directive('enter', function(){
	return{
		link: function(scope, element, attrs){
			element.bind('mouseenter', function(){
				element.text(attrs.enter);
			});
		}
	};
});


/*----------------
 /*FILTERS:
 /*---------------*/
app.filter('upperCase', function(){
	return function(text){
		return text.toUpperCase();
	};
});

//TODO: check if there is a better/proper way to do this calls and return promises
app.factory('StoresModel', function($http){

	return {
		getStores :  function(){
			return $http.get('http://192.237.180.31/dhm/public/api/stores?branches=true&offers=true')
				.error(function(){
					alert('Algo salio mal por favor vuelve a intentarlo');
				});
		}
	};
});
app.service('ToastsService', function () {

	this.config = {
		parentElem : $('#toasts'),
		time :2000,
		queue: []
	};

	this.make = function (text, type) {

		if (config.parentElem.length <= 0) {
			$('body').append('<div id="toasts"></div>');
			config.parentElem = $('#toasts');
		}
		if (!text) text = 'No text provided';
		if (!type) type = ''; //success, warning, error
		theToast = $('<div class="toast ' + type + '">' + text + '</div>');
		theToast.on('click transitionend webkitTransitionEnd', function (e) {
			transitionendListener(e);
		}, false);
		appendToast(theToast);
	};
	this.appendToast = function (theToast) {
		parentElem.prepend(theToast);
		setTimeout(function () {
			theToast.addClass('shown');
		}, 10);
	};
	this.removeToast = function (e) {
		$(e.srcElement).removeClass('shown');
	};
	this.transitionendListener = function (e) {
		var isShown = $(e.srcElement).hasClass('shown');
		if (isShown) {
			setTimeout(function () {
				removeToast(e);
			}, time);
		} else {
			$(e.srcElement).remove();
		}
	};
});