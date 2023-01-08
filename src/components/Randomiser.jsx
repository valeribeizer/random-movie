import React, { useState } from "react";

function Randomiser() {
  const [movie, setMovie] = useState();
  const [clicked, setClicked] = useState(false);

  function gotMovie() {
    
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        Math.floor(Math.random() * 996 + 11) +
        "?api_key=5a88be73171f672ab2c0bcbb2fc8fe22#"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setClicked(true);
        console.log(data);
      });
  }


  return (
    <div class="col-md-12" align="center">
      <button class="btn" onClick={gotMovie}>
        Randomise!
      </button>
      {clicked ? (
        <div class="card" style={{ width: "25rem" }}>
          <img
            src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
            class="card-img-top"
            alt="..."
          ></img>
          <div class="card-body">
            <h5 class="card-title">{movie.title}</h5>
            <p class="card-text">{movie.overview}</p>
          </div>
          <ul class="list-group list-group-flush">
            <div class="grid-container">
              <div>
                <p class="list-group-item ones">RELEASE DATE:</p>
              </div>
              <div>
                <li class="list-group-item one">{movie.release_date}</li>
              </div>
            </div>

            <div class="grid-container">
              <div>
                <p class="list-group-item twos">DURATION:</p>
              </div>
              <div>
                <li class="list-group-item two">{movie.runtime + " min"}</li>
              </div>
            </div>

            <div class="grid-container">
              <div>
                <p class="list-group-item threes">RATING:</p>
              </div>
              <div>
                <li class="list-group-item three">{movie.vote_average}</li>
              </div>
            </div>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Randomiser;
