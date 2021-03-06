const Music = new Audio('/music/asmr.mp3');
Music.volume = 0.3;
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
