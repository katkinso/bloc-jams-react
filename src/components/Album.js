import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";
import Navigation from "./Navigation";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hoveredSong: null,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.6
    };

    this.audioElement = document.createElement("audio"); //doesn't need to be attached to the DOM, but need to access in class methods 'this'
    this.audioElement.src = album.songs[0].audioSrc; //start on first song
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };

    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );

    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );

    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.removeEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatSecondsToMinutes(seconds) {
    if (isNaN(seconds)) return "-:--";

    seconds = Math.round(seconds);
    const mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    secs = secs < 10 ? secs.toString().padStart(2, "0") : secs;

    return `${mins}:${secs}`;
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handleSongMouseEnter(song) {
    this.setState({ hoveredSong: song });
  }

  handleSongMouseLeave() {
    this.setState({ hoveredSong: null });
  }

  setAudioControl(song) {
    if (this.state.isPlaying && song === this.state.currentSong) {
      return <span className="ion-pause" />;
    }

    if (this.state.hoveredSong === song) {
      return <span className="ion-play" />;
    }
  }

  // replays the first track if there is no previous track
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  //if it's at the end then it will start at the first song again
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex =
      currentIndex + 1 < this.state.album.songs.length ? currentIndex + 1 : 0;
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  render() {
    return (
      <div className="container-fluid main h-100">
        <div className="d-flex flex-row h-100">
          <div className="left-nav"><Navigation /></div>
          <div className="flex-fill py-5">

            <div class="container album">
              <div class="row">
                <div class="col">
                  <img
                    id="album-cover-art"
                    src={this.state.album.albumCover}
                    alt={this.state.album.title}
                    width="300px"
                  />
                </div>
                <div class="col-sm-8">

                  <h1>{this.state.album.title}</h1>
                  <h2>{this.state.album.artist}</h2>
                  <div className="text-light">{this.state.album.releaseInfo}</div>
                </div>

              </div>
              <br /> <br /> <br />
            </div>

            <div class="container">
              <div class="row">

                <table class="table table-dark table-hover song-list">
                  <tbody>
                    {this.state.album.songs.map((song, index) => {
                      return (
                        <tr
                          key={index + 1}
                          onClick={() => this.handleSongClick(song)}
                          onMouseEnter={() => this.handleSongMouseEnter(song)}
                          onMouseLeave={() => this.handleSongMouseLeave()}
                        >
                          <td>{this.setAudioControl(song) || index + 1}</td>
                          <td>{song.title}</td>
                          <td class="text-right">{this.formatSecondsToMinutes(song.duration)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>


              </div>
            </div>

            <div className="container">
              <div className="row">

                <PlayerBar
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  currentTime={this.state.currentTime}
                  duration={this.state.duration}
                  currentVolume={this.state.currentVolume}
                  formatSecondsToMinutes={seconds =>
                    this.formatSecondsToMinutes(seconds)
                  }
                  handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={() => this.handlePrevClick()}
                  handleNextClick={() => this.handleNextClick()}
                  handleTimeChange={e => this.handleTimeChange(e)}
                  handleVolumeChange={e => this.handleVolumeChange(e)}
                />

              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

export default Album;
