// Function to toggle sidebar visibility
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}

// Function to close the sidebar
function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
}

const watchlistForm = document.getElementById('watchlistForm');
const watchlistTable = document.getElementById('watchlistTable');
const watchlistBody = document.getElementById('watchlistBody');

// Function to add a movie to the watchlist
function addMovie(day, movie) {
    const row = `
        <tr>
            <td>${day}</td>
            <td>${movie}</td>
            <td>
                <button onclick="deleteMovie(this)">Delete</button>
            </td>
        </tr>
    `;
    watchlistBody.innerHTML += row;
}

// Event listener for form submission
watchlistForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const day = document.getElementById('day').value;
    const movie = document.getElementById('movie').value;
    addMovie(day, movie);
    // Reset the form
    watchlistForm.reset();
});

// Function to delete a movie from the watchlist
function deleteMovie(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
