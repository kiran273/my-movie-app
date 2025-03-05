import React, { useState, useEffect } from "react";


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingShowtimes, setLoadingShowtimes] = useState({});
  const [showtimes, setShowtimes] = useState({});
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieRating, setNewMovieRating] = useState("");
  const [newMovieDuration, setNewMovieDuration] = useState("");

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const loadMovies = () => {
    setLoadingMovies(true);
    const sampleMovies = [
      {
        id: 1,
        title: "Captain America: Brave New World",
        rating: "UA16+",
        duration: "1h 58m",
      },
      {
        id: 2,
        title: "Mere Husband Ki Biwi",
        rating: "UA13+",
        duration: "2h 23m",
      },
      { id: 3, title: "Thandel", rating: "UA13+", duration: "2h 32m" },
      { id: 4, title: "Chhaava", rating: "UA16+", duration: "2h 41m" },
    ];
    setMovies(sampleMovies);
    setLoadingMovies(false);
  };

  const loadShowtimes = (movieId) => {
    setLoadingShowtimes((prev) => ({ ...prev, [movieId]: true }));
    setTimeout(() => {
      setShowtimes((prev) => ({
        ...prev,
        [movieId]: ["10:00 AM", "2:00 PM", "6:00 PM"],
      }));
      setLoadingShowtimes((prev) => ({ ...prev, [movieId]: false }));
    }, 1000);
  };

  const clearMovies = () => {
    setMovies([]);
    setShowtimes({});
    localStorage.removeItem("movies");
  };

  const addMovie = (e) => {
    e.preventDefault();
    if (!newMovieTitle || !newMovieRating || !newMovieDuration) return;

    const newMovie = {
      id: Date.now(),
      title: newMovieTitle,
      rating: newMovieRating,
      duration: newMovieDuration,
    };
    setMovies([...movies, newMovie]);
    setNewMovieTitle("");
    setNewMovieRating("");
    setNewMovieDuration("");
  };

  const deleteMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 className="text-center">My Movie List</h1>
      <button onClick={loadMovies} disabled={loadingMovies}>
        {loadingMovies ? "Loading..." : "Load Sample Movies"}
      </button>
      <button onClick={clearMovies} style={{ marginLeft: "10px" }}>
        Clear List
      </button>
      {movies.length === 0 && <p>No movies yet. Add some!</p>}
      {movies.length > 0 && (
        <ul style={{ listStyle: "none" }}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h2>{movie.title}</h2>
              <p>Rating: {movie.rating}</p>
              <p>Duration: {movie.duration}</p>
              <button
                onClick={() => loadShowtimes(movie.id)}
                disabled={loadingShowtimes[movie.id]}
                style={{ marginRight: "10px" }}
              >
                Show Times
              </button>
              <button
                onClick={() => deleteMovie(movie.id)}
                style={{ backgroundColor: "#ff4444", color: "#fff" }}
              >
                Delete
              </button>
              {showtimes[movie.id] && (
                <ul style={{ marginTop: "10px" }}>
                  {showtimes[movie.id].map((time, index) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      <h2>Add a New Movie</h2>
      <form onSubmit={addMovie} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Rating (e.g., PG-13)"
          value={newMovieRating}
          onChange={(e) => setNewMovieRating(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 2h 23m)"
          value={newMovieDuration}
          onChange={(e) => setNewMovieDuration(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieList;
