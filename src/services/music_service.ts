const Music2 = new Audio('/music/Flecks of Light - The Tower of Light.mp3');
Music2.volume = 0.1;
const Music3 = new Audio('/music/In the Temple Garden - Aaron Kenny.mp3');
Music3.volume = 0.1;
const Music4 = new Audio('/music/Seaside Piazza - Aaron Kenny.mp3');
Music4.volume = 0.1;
const Music5 = new Audio('/music/Night Snow - Asher Fulero.mp3');
Music5.volume = 0.1;
const Music6 = new Audio('/music/The Two Seasons - Dan Bodan.mp3');
Music6.volume = 0.1;
const Music7 = new Audio(
  '/music/No.7 Alone With My Thoughts - Esther Abrami.mp3'
);
Music7.volume = 0.1;
const Music8 = new Audio('/music/Lullaby - JVNA.mp3');
Music8.volume = 0.1;

const musics = [Music2, Music3, Music4, Music5, Music6, Music7, Music8];

let selectedMusic: HTMLAudioElement;

export function musicPlay() {
  const selectedNum = Math.floor(Math.random() * 7);
  selectedMusic = musics[selectedNum];
  console.log(selectedMusic);
  playSound(selectedMusic);
}

export function musicStop() {
  stopSound();
}
function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound() {
  musics.forEach((music) => {
    music.pause();
  });
}
