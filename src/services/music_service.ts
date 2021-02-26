const Music1 = new Audio(
  '/music/Any Thing You Can Dream - The Whole Other.mp3'
);
const Music2 = new Audio('/music/Flecks of Light - The Tower of Light.mp3');

const Music3 = new Audio('/music/In the Temple Garden - Aaron Kenny.mp3');

const Music4 = new Audio('/music/Seaside Piazza - Aaron Kenny.mp3');

const Music5 = new Audio('/music/Night Snow - Asher Fulero.mp3');

const Music6 = new Audio('/music/The Two Seasons - Dan Bodan.mp3');

const Music7 = new Audio(
  '/music/No.7 Alone With My Thoughts - Esther Abrami.mp3'
);

const Music8 = new Audio('/music/Lullaby - JVNA.mp3');

export function music1Play() {
  playSound(Music1);
}

export function music1Stop() {
  stopSound(Music1);
}

export function music2Play() {
  playSound(Music2);
}

export function music2Stop() {
  stopSound(Music2);
}

export function music3Play() {
  playSound(Music3);
}

export function music3Stop() {
  stopSound(Music3);
}

export function music4Play() {
  playSound(Music4);
}

export function music4Stop() {
  stopSound(Music4);
}

export function music5Play() {
  playSound(Music5);
}

export function music5Stop() {
  stopSound(Music5);
}

export function music6Play() {
  playSound(Music6);
}

export function music6Stop() {
  stopSound(Music6);
}

export function music7Play() {
  playSound(Music7);
}

export function music7Stop() {
  stopSound(Music7);
}

export function music8Play() {
  playSound(Music8);
}

export function music8Stop() {
  stopSound(Music8);
}

function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound: HTMLAudioElement) {
  sound.pause();
}
