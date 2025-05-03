document.addEventListener('DOMContentLoaded', () => {

console.log("Inside profile.js");
fetch('http://localhost:3001/post_display')
.then(response => response.json())
.then(posts => {
  const container = document.getElementById('posts-container');
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-placeholder';
    postDiv.innerHTML = `
      <div class="title">${post.subject}</div>
      <div class="content">${post.content}</div>
    `;
    container.appendChild(postDiv);
  });
})
.catch(error => console.error('Error loading posts:', error));

// fetch('http://localhost:3001/username_display')
// .then(response => response.json())
// .then(data =>{
//     const container = document.getElementById('username-container');
//     const usernameDiv = document.createElement('div');
//     usernameDiv.innerHTML = `
//     <h2>${data.username}</h2>
//     `;
//     container.appendChild(usernameDiv);

// })
// .catch(error => console.error('Error loading username:', error));
fetch('/username_display', {
    method: 'GET',
    credentials: 'include' // ⬅️ this makes sure the session cookie is sent
  })
  .then(res => res.json())
  .then(data => {
    if (data.username) {
        const container = document.getElementById('username-container');
        const usernameDiv = document.createElement('div');
        usernameDiv.innerHTML = `<h2>${data.username}</h2>`;
        container.appendChild(usernameDiv);// or wherever you want
    }
  })
  .catch(err => {
    console.error('Failed to load username:', err);
  });
});