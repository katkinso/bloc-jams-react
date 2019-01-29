import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";

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
      hoveredSong: null
    };

    this.audioElement = document.createElement("audio"); //doesn't need to be attached to the DOM, but need to access in class methods 'this'
    this.audioElement.src = album.songs[0].audioSrc; //start on first song
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

  // player bar to switch to the previous song when the user clicks on the "previous" button
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

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img
            id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
          />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
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
                  <td>{song.duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
        />
      </section>
    );
  }
}

export default Album;
