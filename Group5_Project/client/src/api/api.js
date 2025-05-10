const BASE_USER_URL = 'http://localhost:5000/api/user';
const BASE_POST_URL = 'http://localhost:5000/api/post';

// Helper for JSON POST requests
async function postRequest(endpoint, body, baseUrl = BASE_USER_URL) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'An error occurred');
    return data;
  } catch (err) {
    throw err;
  }
}

// Helper for PUT requests
async function putRequest(endpoint, body) {
  try {
    const response = await fetch(`${BASE_USER_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'An error occurred');
    return data;
  } catch (err) {
    throw err;
  }
}

//Get Username
export async function getUserProfile() {
  try {
    const response = await fetch(`${BASE_USER_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // If using JWT
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  } catch (err) {
    throw err;
  }
}


// Helper for DELETE requests
async function deleteRequest(endpoint, body) {
  try {
    const response = await fetch(`${BASE_USER_URL}${endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'An error occurred');
    return data;
  } catch (err) {
    throw err;
  }
}

// Exported User API Functions
export async function loginUser(credentials) {
  return await postRequest('/login', credentials);
}

export async function signupUser(userInfo) {
  return await postRequest('/signup', userInfo);
}

export async function changePassword(passwordInfo) {
  return await putRequest('/update-password', passwordInfo);
}

export async function deleteAccount(email) {
  return await deleteRequest('/delete-account', { email });
}

// Exported Post API Functions
export async function createPost(formData) {
  try {
    const response = await fetch(`${BASE_POST_URL}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.text(); // server sends plain text ("Post created")
    if (!response.ok) throw new Error(data || 'Error creating post');
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_POST_URL}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error fetching posts');
    return data;
  } catch (err) {
    throw err;
  }
}
