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

<<<<<<< Updated upstream
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
=======
//Assignment 4
blocJamsModule.controller("AlbumController", [
  "$log",
  "$scope",
  function($log, $scope) {
    $log.debug("I am the AlbumController! Yipee! :)");
    $scope.albumPicasso = [ name, label, year, albumArtUrl, songs];
    $scope.name = "The Colors";
    $scope.label = "Cubism";
    $scope.year = "1881";
    $scope.albumArtUrl = "assets/images/album_covers/02.png";
    $scope.songs = [
                { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
                { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
                { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
                { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
                { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
      ];
    }
  ]);

    //$scope.albumPicasso = [ name: 'The Colors', label: 'Cubism', year: '1881', albumArtUrl: 'assets/images/album_covers/02.png',
    //songs: [
      //          { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
        //        { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
          //      { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
            //    { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
              //  { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
      //]
    //];


blocJamsModule.controller("LandingController", [
    "$log",
    "$scope",
    function($log, $scope){
        $log.debug("LandingController!!!");
        $scope.title = "Turn the music up!";
    }
]);


blocJamsModule.controller("CollectionController", [
    "$log",
    "$scope",
    function($log, $scope) {
      $log.debug("CollectionController");
        $scope.allAlbums = [
            albumPicasso, albumMarconi, tameImpala
            ];
            $scope.albumPicasso = [ name, artist, label, year, albumArtUrl, songs];
              $scope.albumPicasso.name = "The Colors";
              $scope.albumPicasso.artist = "Picasso";
              $scope.albumPicasso.label = "Cubism";
              $scope.albumPicasso.year = "1881";
              $scope.albumPicasso.albumArtUrl = "assets/images/album_covers/02.png";
              $scope.albumPicasso.songs = [
                        { name: 'Blue', length: '4:26', audioUrl: 'assets/music/blue' },
                        { name: 'Green', length: '3:14', audioUrl: 'assets/music/green' },
                        { name: 'Red', length: '5:01', audioUrl: 'assets/music/red' },
                        { name: 'Pink', length: '3:21', audioUrl: 'assets/music/pink' },
                        { name: 'Magenta', length: '2:15', audioUrl: 'assets/music/magenta' }
              ];
            $scope.albumMarconi = [ name, artist, label, year, albumArtUrl, songs];
              $scope.albumMarconi.name = "The Telephone";
              $scope.albumMarconi.artist = "Guglielmo Marconi";
              $scope.albumMarconi.label = "EM";
              $scope.albumMarconi.year = "1909";
              $scope.albumMarconi.albumArtUrl = "assets/images/album_covers/20.png";
              $scope.albumMarconi.songs = [
                { name: 'Hello, Operator?', length: '1:01' },
                { name: 'Ring, ring, ring', length: '5:01' },
                { name: 'Fits in your pocket', length: '3:21'},
                { name: 'Can you hear me now?', length: '3:14' },
                { name: 'Wrong phone number', length: '2:15'}
              ];
          $scope.tameImpala = [ name, artist, label, year, albumArtUrl, songs];
            $scope.tameImpala.name = "Currents";
            $scope.tameImpala.artist = "Tame Impala";
            $scope.tameImpala.label = "Modular";
            $scope.tameImpala.year = "2015";
            $scope.tameImpala.albumArtUrl = "assets/images/album_covers/22.png";
            $scope.tameImpala.songs = [
              { name: 'Let It Happen', length: '7:46' },
              { name: 'Nangs', length: '1:47' },
              { name: 'The Moment', length: '4:15'},
              { name: 'Yes I\'m Changing', length: '4:30' },
              { name: 'Eventually', length: '5:19'}
            ];
        }
    ]);

//Assignment 5
var songPlayer = angular.module('songPlayer', []);

songPlayer.service('MusicPlayer', function() {
    return {
        pause: function() {
            this.playing = false;
            currentSoundFile.pause();
        }
    }
});
>>>>>>> Stashed changes
