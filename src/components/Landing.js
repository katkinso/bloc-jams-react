import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (

  <div className="container-fluid landing h-100 main">
    <div className="float-right p-4"><img src="/assets/images/bloc-jams-logo.png" alt="bloc jams logo" /></div>
    <section className="jumbotron landing w-100">
      <div className="container">


        <h1 className="jumbotron-heading pb-3">Turn the music up!</h1>
        <h3>The world is full of music; why should you have to listen to music that someone else chose?</h3>
        <br />
        <p className="lead">
          <Link to='/library' className="btn btn-lg btn-secondary">Jam Library</Link>
        </p>
      </div>
    </section>


    <div className="container-fluid h-100">
      <div className="container h-100 landing-promo">
        <div className="row">
          <div className="col-md-4">
            <h3>Unlimited, streaming, ad-free</h3>
            <p className="landing-promo">No arbitrary limits. No distractions</p>
          </div>
          <div className="col-md-4">
            <h3>Mobile enabled</h3>
            <p className="landing-promo">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>

          </div>
          <div className="col-md-4">
            <h3>Learns your preferences</h3>
            <p className="landing-promo">Learns what you like and recommends similar music.</p>
          </div>
        </div>
      </div>
    </div>
  </div>


);

export default Landing;


