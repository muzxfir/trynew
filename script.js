const apiKey = "YOUR_TMDB_API_KEY";
const imageBase = "https://image.tmdb.org/t/p/w200";
const movieRow = document.querySelector(".movie-row");
const searchInput = document.getElementById("search");

// Fetch trending movies
async function fetchMovies(query = "") {
  let url = query 
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

// Display movies in the row
function displayMovies(movies) {
  movieRow.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster_path ? imageBase + movie.poster_path : 'https://via.placeholder.com/150x225?text=No+Image'}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;
    movieRow.appendChild(card);
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  fetchMovies(query);
});

// Initial load
fetchMovies();
