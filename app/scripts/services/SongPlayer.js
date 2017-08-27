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
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
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


    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
