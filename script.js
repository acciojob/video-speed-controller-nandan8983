const player = document.querySelector('.wrapper');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volume = player.querySelector('input[name="volume"]');
const playbackRate = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('.skip');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
	
  progressFilled.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleVolume() {
  video.volume = volume.value;
}

function handlePlaybackRate() {
  video.playbackRate = playbackRate.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('onchange', handleProgress);

volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handlePlaybackRate);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initialize values
video.volume = volume.value;
video.playbackRate = playbackRate.value;
updateButton();

const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
