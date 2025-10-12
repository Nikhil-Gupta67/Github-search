async function searchUser() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert('Please enter a GitHub username.');
    return;
  }

  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('User not found');

    const data = await response.json();

    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || 'No Name';
    document.getElementById('handle').textContent = `@${data.login}`;
    document.getElementById('date').textContent = `Created: ${new Date(data.created_at).toISOString().split('T')[0]}`;
    document.getElementById('bio').textContent = data.bio || 'No bio available.';
    document.getElementById('repos').innerHTML = `${data.public_repos}<br /><span>Repos</span>`;
    document.getElementById('followers').innerHTML = `${data.followers}<br /><span>Followers</span>`;
    document.getElementById('following').innerHTML = `${data.following}<br /><span>Following</span>`;
    document.getElementById('company').textContent = `Company: ${data.company || 'N/A'}`;
    document.getElementById('location').textContent = `📍 Location: ${data.location || 'N/A'}`;
    document.getElementById('link').href = data.html_url;
    document.getElementById('link').textContent = data.html_url;
  } catch (error) {
    alert('GitHub user not found!');
    console.error(error);
  }
}