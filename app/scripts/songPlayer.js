// songPlayer
var songPlayerModule = angular.module('blocJamsModule');

songPlayerModule.factory('MusicPlayer', function() {
  var currentAlbum = null;
  var currentlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;
  var currentSoundFile = null;
  var currentVolume = 80;

  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };

  return {
    setCurrentAlbum: function(album) {
      currentAlbum = album;
      for (i = 0; i < album.songs.length; i++) {
        var sound = new buzz.sound(album.songs[i].audioUrl, {
          formats: ['mp3'],
          preload: 'metadata'
        });
        var mySound = function(i, sound) {
          return function() {
            var length = sound.getDuration();
          }
        };
        sound.bind("loadedmetadata", mySound(i, sound));
      }
    },
    setSong: function(songNumber) {
      if (currentSoundFile) {
        currentSoundFile.stop();
        currentSoundFile.unbind("timeupdate");
      }
      currentlyPlayingSongNumber = songNumber;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      // currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
      //   formats: ['mp3'],
      //   preload: true
      // });
      this.setVolume(currentVolume);
    },
    setVolume: function(volume) {
      currentVolume = volume;
      if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
      }
    },
    setTime: function(seconds) {
      if (currentSoundFile) {
        currentSoundFile.setTime(seconds);
      }
    },
    togglePlayFromPlayerBar: function() {
      if (currentlyPlayingSongNumber === null) {
        return this.nextSong();
        return false;
      }
      if (currentSoundFile.isPaused()) {
        currentSoundFile.play();
        return false;
      } else if (currentSoundFile) {
        currentSoundFile.pause();
        return true;
      }
    },
    isPaused: function() {
      return currentSoundFile.isPaused();
    },
    getTime: function() {
      return currentSoundFile.getTime();
    },
    registerProgressListener: function(listener) {
      if (currentSoundFile === null) {
        return;
      }
      currentSoundFile.bind("timeupdate", listener);
    },
    getDuration: function() {
      return currentSoundFile.getDuration();
    },
    pause: function() {
      currentSoundFile.pause();
    },
    play: function() {
      currentSoundFile.play();
    },
    currentSongIndex: function() {
      if (currentSoundFile) {
        return trackIndex(currentAlbum, currentSongFromAlbum);
      }
      return null;
    },
    nextSong: function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex++;
      if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
      }
      this.setSong(currentSongIndex + 1);
      currentSoundFile.play();
    },
    previousSong: function() {
      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
      }
      this.setSong(currentSongIndex + 1);
      currentSoundFile.play();
    }
  };
});
