
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
         controller: 'Collection.landing',
         templateUrl: '/templates/landing.html'
     });
    
});
