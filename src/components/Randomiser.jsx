import React, { useState } from "react";

function Randomiser() {
  const [movie, setMovie] = useState();
  const [stream, setStream] = useState([]);
  const [clicked, setClicked] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "32f984dd07msh46792872b09b300p127fc4jsn5839010128a3",
      "X-RapidAPI-Host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };

  function gotMovie() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        Math.floor(Math.random() * 43999 + 11) +
        "?api_key=5a88be73171f672ab2c0bcbb2fc8fe22#"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setClicked(true);
        fetch(
          "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
            data.title,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            const streaming = response.results[0].locations.map(({ display_name }) => display_name);
            console.log(streaming);
            setStream(streaming);
          })
          .catch((err) => console.error(err));
      });
  }

  return (
    <div class="col-md-12" align="center">
      <button class="btn" onClick={gotMovie}>
        Randomise!
      </button>
      {clicked ? (
        <div class="card" style={{ width: "25rem" }}>
          {movie.poster_path ? (
            <img
              src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              class="card-img-top"
              alt="..."
            />
          ) : null}

          <div class="card-body">
            <h5 class="card-title">
              {movie.title ? movie.title : "Ooopsis..🙊"}
            </h5>
            <p class="card-text">{movie.overview ? movie.overview : ""}</p>
          </div>
          <ul class="list-group list-group-flush">
            <div class="grid-container">
              <div>
                <p class="list-group-item ones">RELEASE DATE:</p>
              </div>
              <div>
                <li class="list-group-item one">
                  {movie.release_date ? movie.release_date : "-"}
                </li>
              </div>
            </div>

            <div class="grid-container">
              <div>
                <p class="list-group-item twos">DURATION:</p>
              </div>
              <div>
                <li class="list-group-item two">
                  {movie.runtime ? movie.runtime + " min" : "-"}
                </li>
              </div>
            </div>

            <div class="grid-container">
              <div>
                <p class="list-group-item threes">RATING:</p>
              </div>
              <div>
                <li class="list-group-item three">
                  {movie.vote_average ? movie.vote_average : "-"}
                </li>
              </div>
            </div>


                <li class="list-group-item three">
                  {stream ? stream.map(channel => channel) : "-"}
                </li>

          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Randomiser;
