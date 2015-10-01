
var blocJamsModule = angular.module('blocJams', ['ui.router']);

blocJamsModule.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
    $stateProvider.state('album', {
         url: '/album',
         controller: 'Album.controller',
         templateUrl: '/templates/album.html'
     });
    
    $stateProvider.state('collection', {
         url: '/collection',
         controller: 'Collection.controller',
         templateUrl: '/templates/collection.html'
     });
    
    $stateProvider.state('landing', {
         url: '/landing',
         controller: 'Landing.controller',
         templateUrl: '/templates/landing.html'
     });
    
});

blocJamsModule.controller("Landing.controller", [
    "$log",
    function($log) {
        $log.debug("debug");
        $log.error("error");
        $log.info("info");
        console.log("Landing.controller");
    }
]);