(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
      this.songPlayer = SongPlayer;
      this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
