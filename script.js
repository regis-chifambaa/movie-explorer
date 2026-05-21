
const API_KEY = "YOUR_OMDB_API_KEY"
const BASE_URL = "https://www.omdbapi.com/";

// DOM REFERENCES
// Grab each HTML element once and store in a variable.
const searchInput     = document.getElementById("searchInput");
const searchBtn       = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");
const skeletonGrid    = document.getElementById("skeletonGrid");
const message         = document.getElementById("message");
const emptyState      = document.getElementById("emptyState");

// EVENT LISTENERS
searchBtn.addEventListener("click", searchMovies);

// When the user presses Enter inside the input, also run searchMovies()
// "keydown" fires as soon as the key is pressed (slightly faster than "keypress")
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchMovies();
});

// MAIN SEARCH FUNCTION
// This is the core of the app — it fetches data
// from the OMDb API and triggers the display.
async function searchMovies() {

    // Read and clean up whatever the user typed
    const query = searchInput.value.trim();

    // If the input is empty, do nothing (don't waste an API call)
    if (!query) {
        showMessage("Please enter a movie name to search.", false);
        return;
    }

    // --- START LOADING STATE ---
    showSkeleton(true);     // show pulsing placeholder cards
    clearMovies();          // remove any previous results
    hideEmptyState();       // hide the welcome message
    showMessage("", false); // clear any previous messages

    try {
        // Build the full API URL:
        // ?apikey=  → your key for authentication
        // &s=       → "s" means "search" — returns a list of matches
        // &type=movie → optional: filter to only movies (remove to include series too)
        const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

        // fetch() sends the request — "await" pauses here until the response arrives
        const res = await fetch(url);

        // .json() parses the raw response text into a JavaScript object
        const data = await res.json();

        // --- STOP LOADING STATE ---
        showSkeleton(false);

        // OMDb returns Response: "False" when nothing was found
        if (data.Response === "False") {
            showMessage(`No results found for "${query}". Try a different title.`, false);
            return;
        }

        // data.Search is the array of movie results (up to 10 per page)
        displayMovies(data.Search);

        // Show how many results were found (data.totalResults comes from the API)
        showMessage(`Found ${data.totalResults} result(s) for "${query}"`, false);

    } catch (error) {
        showSkeleton(false);
        showMessage("Network error — please check your connection.", true);
        console.error("Fetch error:", error);
    }
}

// DISPLAY MOVIES
// Takes an array of movie objects from the API
// and creates a card in the DOM for each one.
function displayMovies(movies) {

    // Clear any leftover cards from a previous search
    moviesContainer.innerHTML = "";

    // Loop through each movie in the results array
    movies.forEach((movie, index) => {

        // Create a new <div> element for this card
        const card = document.createElement("div");
        card.classList.add("movie-card");

        // CSS custom property --i controls the staggered animation delay.
        // Card 0 appears first, card 1 slightly after, etc.
        card.style.setProperty("--i", index);

        // POSTER IMAGE
        // OMDb sends "N/A" when there's no poster available.
        // We use a reliable SVG data-URI fallback instead of a broken image.
        const posterSrc = movie.Poster !== "N/A"
            ? movie.Poster
            : buildFallbackPoster(movie.Title);

        // TYPE BADGE
        // OMDb returns: "movie", "series", or "game"
        // We capitalize the first letter for display
        const typeLabel = movie.Type
            ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)
            : "Movie";

        // Build the card's inner HTML
        // Each section has a comment explaining what it renders
        card.innerHTML = `
            <!-- Movie poster image -->
            <img
                src="${posterSrc}"
                alt="${movie.Title} poster"
                loading="lazy"
                onerror="this.src='${buildFallbackPoster(movie.Title)}'"
            />

            <!-- Text info below the poster -->
            <div class="card-info">
                <!-- Movie title (clamped to 2 lines in CSS) -->
                <p class="movie-title">${movie.Title}</p>

                <!-- Year and type badge in one row -->
                <div class="card-meta">
                    <span class="movie-year">${movie.Year}</span>
                    <span class="movie-type">${typeLabel}</span>
                </div>
            </div>
        `;

        // Add the finished card to the grid in the HTML
        moviesContainer.appendChild(card);
    });
}

// FALLBACK POSTER
// When a movie has no poster image, we generate
// a simple SVG placeholder with the movie's title.
// This is more reliable than any external service.
function buildFallbackPoster(title) {
    // Get the first letter of the title for the placeholder graphic
    const letter = title ? title.charAt(0).toUpperCase() : "?";

    // Build an SVG string — it's just text, so we can embed it as a data URI
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="240" viewBox="0 0 200 240">
            <rect width="200" height="240" fill="#1e2d47"/>
            <text x="100" y="110" font-size="64" text-anchor="middle"
                  dominant-baseline="middle" fill="#f59e0b" font-family="sans-serif"
                  font-weight="bold">${letter}</text>
            <text x="100" y="160" font-size="11" text-anchor="middle"
                  fill="#64748b" font-family="sans-serif">No Poster</text>
        </svg>
    `.trim();

    // btoa() converts the SVG string to base64 so it can be used as an img src
    return "data:image/svg+xml;base64," + btoa(svg);
}
// HELPER FUNCTIONS
// Small utility functions used throughout the app.

// Shows or hides the pulsing skeleton loading cards
function showSkeleton(visible) {
    if (visible) {
        skeletonGrid.classList.remove("hidden");
    } else {
        skeletonGrid.classList.add("hidden");
    }
}

// Clears all movie cards from the grid
function clearMovies() {
    moviesContainer.innerHTML = "";
}

// Shows a status message below the search bar.
// isError = true makes it red; false makes it grey.
function showMessage(text, isError) {
    message.textContent = text;
    // Toggle the "error" CSS class based on the isError flag
    message.classList.toggle("error", isError);
}

// Hides the welcome/empty state shown on first load
function hideEmptyState() {
    emptyState.classList.add("hidden");
}
