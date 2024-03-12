// Function to toggle sidebar visibility
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}
// Function to display bookmarks
function displayBookmarks() {
    const bookmarkTable = document.getElementById('bookmarkTable');
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = '';
    // Retrieve bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    // Display each bookmark in the table
    bookmarks.forEach((bookmark, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.title}</td>
            <td><button onclick="deleteBookmark(${index})">Delete</button></td> <!-- Added delete button -->
        `;
        bookmarkList.appendChild(tr);
    });
}

// Function to delete a bookmark
function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1); // Remove the bookmark at the specified index
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Update local storage
    displayBookmarks(); // Refresh the bookmark list
}


// Call displayBookmarks when the page loads
displayBookmarks();

// Function to close the sidebar
function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
}

// Function to search for movie details
function searchMovie() {
    const searchInput = document.getElementById('searchInput').value;
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovieDetails(data);
                document.getElementById('bookButton').style.display = 'block'; // Show bookmark button
            } else {
                alert('Movie not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to display movie details on the web page
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Awards:</strong> ${movie.Awards}</p>
        <img src="${movie.Poster}" alt="${movie.Title} Poster">
    `;
}

// Function to add movie to bookmarks
function addToBookmarks() {
    const title = document.getElementById('searchInput').value;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push({ title });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // Toggle star color
    const star = document.getElementById('starIcon');
    star.style.color = (star.style.color === 'black') ? 'white' : 'black';
    
    alert(`Added "${title}" to bookmarks!`);
}
