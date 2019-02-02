import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (

      <footer className="footer album fixed-bottom mt-auto py-2">

        <div className="container-fluid text-center">

          <section id="buttons">
            <button className="btn icon" id="previous" onClick={this.props.handlePrevClick}>
              <span className="icon-prev" />
            </button>
            <button id="play-pause" className="btn icon" onClick={this.props.handleSongClick}>
              <span className={this.props.isPlaying ? "icon-pause" : "icon-play"} />
            </button>
            <button id="next" className="btn icon" onClick={this.props.handleNextClick}>
              <span className="icon-next" />
            </button>
          </section>

        </div>


        <div className="container-fluid">
          <div className="row">
            <div className="col-1"><p className="text-light float-right">{this.props.formatSecondsToMinutes(this.props.currentTime)}</p></div>
            <div className="col-8">
              <input
                type="range"
                className="range-track-time w-100"
                value={this.props.currentTime / this.props.duration || 0}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleTimeChange}
              />
            </div>
            <div className="col-1"><p className="text-light">{this.props.formatSecondsToMinutes(this.props.duration)}</p></div>
            <div className="col-2">

              <div className="row">
                <div className="col-9">
                  <input
                    type="range"
                    className="range-volume"
                    value={this.props.currentVolume || 0}
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={this.props.handleVolumeChange}
                  />
                </div>


                <div className="text-light  float-right col-3">{this.props.currentVolume * 100}%</div>
              </div>


            </div>
          </div>
        </div>
      </footer>

    );
  }
}

export default PlayerBar;



// <section id="time-control">




  
// <div className="current-time">
//   {this.props.formatSecondsToMinutes(this.props.currentTime)}
// </div>
// <input
//   type="range"
//   className="seek-bar"
//   value={this.props.currentTime / this.props.duration || 0}
//   max="1"
//   min="0"
//   step="0.01"
//   onChange={this.props.handleTimeChange}
// />
// <div className="total-time">
//   Song Duration: {this.props.formatSecondsToMinutes(this.props.duration)}
// </div>
// </section>
// <section id="volume-control">
// <div className="icon ion-volume-low" />
// <div className="current-volume">
//   Volume: {this.props.currentVolume * 100}%
// </div>
// <input
//   type="range"
//   className="seek-bar"
//   value={this.props.currentVolume || 0}
//   min="0"
//   max="1"
//   step="0.1"
//   onChange={this.props.handleVolumeChange}
// />
// <div className="icon ion-volume-high" />
// </section>

