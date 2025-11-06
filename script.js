const apiKey = "d2f23cc2f09bb217e31713f59d37676d";
const imageBase = "https://image.tmdb.org/t/p/w200";
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");

// Define movie categories (TMDB genre IDs)
const categories = [
  { name: "Trending", id: "trending" }, // Special case
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

// Display all categories
async function displayCategories
