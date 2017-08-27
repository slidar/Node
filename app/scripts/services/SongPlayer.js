(function() {
    function SongPlayer() {
         var SongPlayer = {};

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */

        SongPlayer.currentSong = null;

         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */

         SongPlayer.play = function(song) {
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  currentBuzzObject.play();
                  song.playing = true;
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
            }
        }
    };

         return SongPlayer;
    };

    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
    };

      SongPlayer.play = function(song) {
        currentBuzzObject.play();
        song.playing = false;
      };


    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
