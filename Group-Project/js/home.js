// Display post i'm not sure what is going on but it's not working
function displayPostFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('PostTitle');
    const content = urlParams.get('PostContent');

    if (title || content) {
        const postContainer = document.createElement('div');
        postContainer.className = 'post-placeholder';
        postContainer.innerHTML = `
            <p><strong>Title:</strong> ${title || 'Untitled'}</p>
            <p><strong>Content:</strong> ${content || 'No content provided.'}</p>
        `;
        document.querySelector('.feed').appendChild(postContainer);
    }
}

// Search filter
function setupSearchBar() {
    const searchInput = document.querySelector('.trending .search-box input');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('.post-placeholder');

        posts.forEach(post => {
            const text = post.textContent.toLowerCase();
            post.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayPostFromQueryParams();
    setupSearchBar();
});
