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