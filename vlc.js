class VLCPlayer {
  constructor(options) {
    this.target = options.target;
    this.url = options.url;
    this.autoplay = options.autoplay || false;
    this.controls = options.controls || false;

    this.player = null;
    this.currentTime = 0;
    this.duration = 0;
    this.isPlaying = false;
  }

  init() {
    this.createPlayer();
    this.addControls();
    this.attachEventListeners();
  }

  createPlayer() {
    this.player = document.createElement('video');
    this.player.src = this.url;
    this.player.autoplay = this.autoplay;
    this.player.controls = this.controls;

    const container = document.getElementById(this.target);
    container.innerHTML = ''; // Clear the container before adding the new player
    container.appendChild(this.player);
  }

  addControls() {
    if (this.controls) {
      const controlsContainer = document.createElement('div');
      controlsContainer.classList.add('vlc-controls');

      const playPauseButton = document.createElement('button');
      playPauseButton.textContent = 'Play/Pause';
      playPauseButton.addEventListener('click', () => this.togglePlayPause());

      const timeDisplay = document.createElement('div');
      timeDisplay.classList.add('time-display');

      controlsContainer.appendChild(playPauseButton);
      controlsContainer.appendChild(timeDisplay);

      const container = document.getElementById(this.target);
      container.appendChild(controlsContainer);
    }
  }

  attachEventListeners() {
    this.player.addEventListener('timeupdate', () => {
      this.currentTime = this.player.currentTime;
      this.duration = this.player.duration;
      this.updateTimeDisplay();
    });

    this.player.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.player.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  updateTimeDisplay() {
    const container = document.querySelector(`#${this.target} .vlc-controls .time-display`);
    container.textContent = `${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}`;
  }

  formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function changeChannel(channelUrl) {
  // Show interstitial ad before changing the channel
  showInterstitialAd().then(() => {
    var vlcPlayer = new VLCPlayer({
      target: 'vlcPlayer',
      url: channelUrl,
      autoplay: true,
      controls: true
    });
    vlcPlayer.init();
  }).catch(error => {
    console.error('Error showing interstitial ad:', error);
  });
}

function showInterstitialAd() {
  return new Promise((resolve, reject) => {
    // This is a placeholder function. Replace it with the actual function call to show an interstitial ad
    // provided by your ad network. Ensure to resolve the promise once the ad has been displayed or closed.
    console.log("Showing interstitial ad...");

    // Example: resolve the promise after a timeout to simulate ad display
    setTimeout(() => {
      console.log("Interstitial ad shown");
      resolve();
    }, 1000); // Simulate a 3-second ad display
  });
}
