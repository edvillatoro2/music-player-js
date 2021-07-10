const musicContainer = document.querySelector('.music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const title = document.querySelector('.title');
const cover = document.getElementById('cover');

//song titles
const songs = ['Asem Da Ye So', 'Enam Obi So', 'Sesa Wosuban'];

//keep track of song
let songIndex = 0;

//initially load song details into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src= `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//play song
function playSong() {
  musicContainer.classList.add('play');
  playButton.querySelector('i.fas').classList.remove('fa-play');
  playButton.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playButton.querySelector('i.fas').classList.add('fa-play');
  playButton.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

//previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  };
  loadSong(songs[songIndex]);
  playSong();
}

//next song
function nextSong() {
  songIndex++;
  
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//show progress
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  //minutes
  let minutes = Math.floor(audio.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  //seconds
  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  //show minutes
  time.innerText = `${minutes}:${seconds}`;

  //show progress
  progress.style.width = `${progressPercent}%`;
}

//edit progress
function editProgress(e) {
  const width = this.clientWidth;
  const clickArea = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickArea / width) * duration;
}

//eventListener
playButton.addEventListener('click', ()=> {
  const playing = musicContainer.classList.contains('play');
  if(playing) {
    pauseSong();
  } else {
    playSong();
  }
})

//next/previous buttons
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

//show song progress
audio.addEventListener('timeupdate', updateProgress);

//edit progress
progressContainer.addEventListener('click', editProgress);

//song ends, move to next song
audio.addEventListener('ended', nextSong);