(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc Active song object from list of songs
        * @type {Object}

        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

           SongPlayer.currentSong = song;
         };

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */

         SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  } else {
                    SongPlayer.pause(song);
                  }
            }
        };

        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */

            SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
        };

          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          };

            SongPlayer.previous = function() {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex--;

                if (currentSongIndex < 0) {
                    currentBuzzObject.pause();
                    SongPlayer.currentSong.playing = null;
                } else {
                      var song = currentAlbum.songs[currentSongIndex];
                      setSong(song);
                      playSong(song);
                    }
            };

            SongPlayer.next = function(song) {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;

              if (currentSongIndex === currentAlbum.songs.length) {
                currentBuzzObject.pause();
                SongPlayer.currentSong.playing = null;
              } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
              }
            };

            SongPlayer.stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
            };

            SongPlayer.volume = 80;

            SongPlayer.setVolume = function (volume) {
              if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
              }

              SongPlayer.volume = volume;
            };

            /**
            * @function setCurrentTime
            * @desc Set current time (in seconds) of currently playing song
            * @param {Number} time
            */
            SongPlayer.setCurrentTime = function(time) {
                if (currentBuzzObject) {
                    currentBuzzObject.setTime(time);
                }
            };

            return SongPlayer;


    };




    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
