const apiKey = "d2f23cc2f09bb217e31713f59d37676d";
const imageBase = "https://image.tmdb.org/t/p/w200";
const movieList = document.getElementById("movie-list");

// Fetch trending movies
async function fetchMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
  const data = await res.json();
  displayMovies(data.results);
}

// Display movies
function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster_path ? imageBase + movie.poster_path : 'https://via.placeholder.com/150x225?text=No+Image'}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;
    movieList.appendChild(card);
  });
}

// Initial load
fetchMovies();
