
var blocJamsModule = angular.module('blocJams', ['ui.router']);

blocJamsModule.config(function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });

    $stateProvider.state('album', {
         url: '/album',
         controller: 'AlbumController',
         templateUrl: '/templates/album.html'
     });

    $stateProvider.state('collection', {
         url: '/collection',
         controller: 'CollectionController',
         templateUrl: '/templates/collection.html'
     });

    $stateProvider.state('landing', {
         url: '/landing',
         controller: 'LandingController',
         templateUrl: '/templates/landing.html'
     });

});

blocJamsModule.controller("AlbumController", [
    "$log",
    function($log) {
        $log.debug("I am the AlbumController! Yipee!");
        $scope.albumScope = {
          songRow: [
          songNumber, songName, songLength
        ]
      }
    }
]);

blocJamsModule.controller("LandingController", [
    "$log",
    "$scope",
    function($log, $scope){
        $log.debug("LandingController!!!");
        $scope.title = "Turn the music up!";
    }
]);


blocJamsModule.controller("CollectionController", [
    "$scope",
    "$log",
    function($scope, $log) {
      $log.debug("CollectionController");
        $scope.allAlbums = [
            albumPicasso, albumMarconi, tameImpala
            ];
        $scope.allAlbumsSpecific = {
          albums: [
            {name:'The Colors', label: 'Cubism', year: '1881', albumArtUrl: 'assets/images/album_covers/02.png'
            songs: [
                        { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
                        { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
                        { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
                        { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
                        { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' },
          ]},
          {name: 'The Telephone', artist: 'Guglielmo Marconi', label: 'EM', year: '1909', albumArtUrl: 'assets/images/album_covers/20.png',
          songs: [
                  { name: 'Hello, Operator?', length: '1:01' },
                  { name: 'Ring, ring, ring', length: '5:01' },
                  { name: 'Fits in your pocket', length: '3:21'},
                  { name: 'Can you hear me now?', length: '3:14' },
                  { name: 'Wrong phone number', length: '2:15'}
              ]},
          {name: 'Currents', artist: 'Tame Impala', label: 'Modular', year: '2015', albumArtUrl: 'assets/images/album_covers/22.png',
          songs: [
                   { name: 'Let It Happen', length: '7:46' },
                   { name: 'Nangs', length: '1:47' },
                   { name: 'The Moment', length: '4:15'},
                   { name: 'Yes I\'m Changing', length: '4:30' },
                   { name: 'Eventually', length: '5:19'}
               ]}
            ]
        }
    }]);
//
//        $scope.albumsbad = [
//            albumPicasso: {
//         name: 'The Colors',
//        artist: 'Pablo Picasso',
//        label: 'Cubism',
//        year: '1881',
//        albumArtUrl: 'assets/images/album_covers/02.png',
//        songs: [
//            { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
//            { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
//            { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
//            { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
//            { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
//        ]
//    }
//            albumMarconi: {
//            name: 'The Telephone',
//     artist: 'Guglielmo Marconi',
//     label: 'EM',
//     year: '1909',
//     albumArtUrl: 'assets/images/album_covers/20.png',
//     songs: [
//         { name: 'Hello, Operator?', length: '1:01' },
//         { name: 'Ring, ring, ring', length: '5:01' },
//         { name: 'Fits in your pocket', length: '3:21'},
//         { name: 'Can you hear me now?', length: '3:14' },
//         { name: 'Wrong phone number', length: '2:15'}
//     ]
//    }
//    tameImpala: {
//        name: 'Currents',
//     artist: 'Tame Impala',
//     label: 'Modular',
//     year: '2015',
//     albumArtUrl: 'assets/images/album_covers/22.png',
//     songs: [
//         { name: 'Let It Happen', length: '7:46' },
//         { name: 'Nangs', length: '1:47' },
//         { name: 'The Moment', length: '4:15'},
//         { name: 'Yes I\'m Changing', length: '4:30' },
//         { name: 'Eventually', length: '5:19'}
//     ]
//    }
//    ]
//]);

//blocJamsModule.controller("Landing.controller", [
//    "$log",
//    function($log) {
//        $log.debug("debug");
//        $log.error("error");
//        $log.info("info");
//        console.log("Landing.controller");
//    }
//]);
