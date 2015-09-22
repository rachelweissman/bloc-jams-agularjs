// blocJamsModule is the identifier assigned to the module and is used throughout the rest of the code to reference the module.
// blocJams is the name of the module and is the link between the application's HTML and the module.
// The empty array, passed as the second argument, injects dependencies into an application. This example has no dependencies
// The module method's second argument is the list of external modules that blocJams depends on
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
