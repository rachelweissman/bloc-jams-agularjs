
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
    
});
