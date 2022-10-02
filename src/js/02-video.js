import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveTime, 1000));

function saveTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

player.on('play', onPlay);

function onPlay(data) {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime && data.seconds !== currentTime) {
    player.setCurrentTime(currentTime);
  }
}
