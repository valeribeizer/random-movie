import React, { useState } from "react";

function Randomiser() {
  const [movie, setMovie] = useState();
  const [stream, setStream] = useState([]);
  const [url, setUrl] = useState([]);
  const [clicked, setClicked] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };

  function gotMovie() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
        process.env.REACT_APP_API_KEY +
        "&language=en-US&adult=false&page=" +
        Math.floor(Math.random() * 500 + 1)
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomMovie = data.results[randomIndex];
        setMovie(randomMovie);
        setClicked(true);
        fetch(
          "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
            randomMovie.title,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            const streaming = response.results[0].locations.map(
              ({ display_name }) => display_name
            );
            const urls = response.results[0].locations.map(({ url }) => url);
            console.log(streaming);
            console.log(urls);
            setStream(streaming);
            setUrl(urls);
          })
          .catch((err) => console.error(err));
      });
  }

  return (
    <div className="col-md-12" align="center">
      <button className="btn btn-lg btn-outline" onClick={gotMovie}>
        GET A MOVIE
      </button>
      {clicked ? (
        <div className="card">
            {movie.poster_path ? (
              <img
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                className="card-img-top"
                alt="..."
              />
            ) : null}
            <div className="card-body">
              <h5 className="card-title">
                {movie.title ? movie.title : "Oopsis..🙊"}
              </h5>
              <p className="card-text">
                {movie.overview ? movie.overview : ""}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <div className="grid-container">
                <div>
                  <p className="list-group-item ones">RELEASE DATE:</p>
                </div>
                <div>
                  <li className="list-group-item one">
                    {movie.release_date ? movie.release_date : "-"}
                  </li>
                </div>
              </div>

              <div className="grid-container">
                <div>
                  <p className="list-group-item twos">POPULARITY:</p>
                </div>
                <div>
                  <li className="list-group-item two">
                    {movie.popularity
                      ? Math.floor(movie.popularity) + "%"
                      : "-"}
                  </li>
                </div>
              </div>

              <div className="grid-container">
                <div>
                  <p className="list-group-item threes">RATING:</p>
                </div>
                <div>
                  <li className="list-group-item three">
                    {movie.vote_average ? movie.vote_average : "-"}
                  </li>
                </div>
              </div>
              {stream
                ? stream.map((channel) => (
                    <li className="list-group-item four">
                      <a href={url.map((urly) => urly)}>{channel}</a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
      ) : null}
    </div>
  );
}

export default Randomiser;
