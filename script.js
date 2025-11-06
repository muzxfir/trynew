const apiKey = "d2f23cc2f09bb217e31713f59d37676d";
const imageBase = "https://image.tmdb.org/t/p/original"; // Use larger images for hero
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");
const heroSection = document.getElementById("hero");

// Categories
const categories = [
  { name: "Trending", id: "trending" },
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Horror", id: 27 }
];

// Fetch movies by category
async function fetchMoviesByCategory(categoryId) {
  let url;
  if (categoryId === "trending") {
    url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

// Set Hero Banner
function setHero(movie) {
  if (!movie) return;
  heroSection.style.backgroundImage = `url(${imageBase + movie.backdrop_path})`;
}

// Display categories with movies
async function displayCategories() {
  categoriesContainer.innerHTML = "";
  for (const category of categories) {
    const movies = await fetchMoviesByCategory(category.id);
    
    // Set hero for trending category
    if (category.id === "trending" && movies.length > 0) {
      setHero(movies[0]);
    }

    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `<h2>${category.name}</h2><div class="movie-row"></div>`;
    const row = section.querySelector(".movie-row");

    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster_path ? imageBase + movie.poster_path : 'https://via.placeholder.com/150x225?text=No+Image'}" alt="${movie.title}">
        <div class="movie-info">
          ${movie.title} (${movie.vote_average.toFixed(1)})
        </div>
      `;
      row.appendChild(card);
    });

    categoriesContainer.appendChild(section);
  }
}

// Search functionality
searchInput.addEventListener("input", async (e) => {
  const query = e.target.value;
  if (!query) return displayCategories();

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  
  heroSection.style.backgroundImage = ""; // Clear hero when searching
  categoriesContainer.innerHTML = "<h2>Search Results</h2><div class='movie-row'></div>";
  const row = categoriesContainer.querySelector(".movie-row");

  data.results.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster_path ? imageBase + movie.poster_path : 'https://via.placeholder.com/150x225?text=No+Image'}" alt="${movie.title}">
      <div class="movie-info">
        ${movie.title} (${movie.vote_average.toFixed(1)})
      </div>
    `;
    row.appendChild(card);
  });
});

// Initial load
displayCategories();
