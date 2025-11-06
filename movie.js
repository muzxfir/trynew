const apiKey = "d2f23cc2f09bb217e31713f59d37676d";
const imageBase = "https://image.tmdb.org/t/p/original";
const movieDetailsContainer = document.getElementById("movie-details");

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Fetch movie details from TMDB
async function fetchMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  const movie = await res.json();
  displayMovie(movie);
}

function displayMovie(movie) {
  movieDetailsContainer.innerHTML = `
    <h2>${movie.title} (${movie.release_date.split("-")[0]})</h2>
    <img src="${imageBase + movie.backdrop_path}" alt="${movie.title}" style="width:100%;max-width:800px;border-radius:10px;">
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(", ")}</p>
  `;
}

// Load movie details
if(movieId) {
  fetchMovieDetails(movieId);
}
