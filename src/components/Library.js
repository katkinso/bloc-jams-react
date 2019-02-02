import React, { Component } from "react";
import { Link } from "react-router-dom";
import albumData from "./../data/albums";
import Navigation from "./Navigation";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }


  render() {
    return (

      <div className="container-fluid main h-100">
        <div className="d-flex flex-row h-100 library-main">
          <div className="left-nav h-100"><Navigation /></div>
          <div className="flex-fill">


            <section className="jumbotron library w-100">
              <div className="container">
                <h1 className="jumbotron-heading">Your Jams</h1>
                <p className="lead">Find your jam. Here's today's latest selection.</p>
              </div>
            </section>


            <div className="container">
              <div className="row">

                {this.state.albums.map((album, index) => (

                  <div className="col-md-4" key={index}>
                    <div className="card mb-4 shadow-sm">
                      <Link to={`/album/${album.slug}`}>
                        <img src={album.albumCover} alt={album.title} className="w-100" />
                      </Link>

                      <div className="card-body">
                        <div className="card-text font-weight-bold">{album.title}</div>
                        <div className="card-text">{album.artist}</div>
                        <p className="card-text">{album.songs.length} songs</p>
                        <div className="d-flex justify-content-between align-items-center">

                          <div className="btn-group"><Link to={`/album/${album.slug}`}><button type="button" className="btn btn-sm btn-outline-secondary">View Album</button></Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
          
    
    );
  }
}

export default Library;

