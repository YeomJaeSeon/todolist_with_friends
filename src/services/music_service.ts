const Music = new Audio('/music/raining.mp3');
Music.volume = 0.7;
Music.loop = true;

export function musicPlay() {
  playSound(Music);
}

export function musicStop() {
  stopSound(Music);
}
function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound: HTMLAudioElement) {
  sound.pause();
}
