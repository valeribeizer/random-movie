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
      "https://api.themoviedb.org/3/movie/" +
        Math.floor(Math.random() * 687996 + 11) +
        "?api_key=" +
        process.env.REACT_APP_API_KEY
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
      <button className="btn" onClick={gotMovie}>
        GET A MOVIE!
      </button>
      {clicked ? (
        <div className="card" style={{ width: "25rem" }}>
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
            <p className="card-text">{movie.overview ? movie.overview : ""}</p>
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
                <p className="list-group-item twos">DURATION:</p>
              </div>
              <div>
                <li className="list-group-item two">
                  {movie.runtime ? movie.runtime + " min" : "-"}
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
      ) : (
        <h3>Click the button!</h3>
      )}
    </div>
  );
}

export default Randomiser;
