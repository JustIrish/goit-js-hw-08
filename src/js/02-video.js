import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', saveTime);

function saveTime(data) {
  localStorage.setItem('videoplayer-current-time', data);
  console.log(data);
}

player.on('play', onPlay);

function onPlay(data) {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (data !== currentTime) {
    player.setCurrentTime(currentTime);
  }
}
