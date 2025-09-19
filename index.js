let userInput = document.querySelector(".search-box input");
let infoBox = document.querySelector(".info-box");

userInput.addEventListener("keyup", (e) => {
  if (userInput.value !== "" && e.key === "Enter") {
    getData(userInput.value);
  }
});

let getData = (username) => {
  let url = `https://api.github.com/users/${username}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Not Found") {
        infoBox.innerHTML = `<p>User not found.</p>`;
        return;
      }

      const dateData = data.created_at.slice(0, 10);
      const location = data.location || "No location";
      const twitter = data.twitter_username || "No X";
      const website = data.blog || "No Website";
      const company = data.company || "No Company";
      const bio = data.bio || "This profile has no bio";

      infoBox.innerHTML = `
        <div class="img-box">
          <img src="${data.avatar_url}" alt="${data.login}" />
        </div>
        <div class="details">
          <h3 class="name">${data.name || "No Name"}</h3>
          <h3 class="username">@${data.login}</h3>
          <span class="join-date">Joined: ${dateData}</span>
        </div>
        <p class="bio">${bio}</p>
        <div class="user-profile">
          <div class="repo">
            <h2>${data.public_repos}</h2>
            <span>Repos</span>
          </div>
          <div class="follower">
            <h2>${data.followers}</h2>
            <span>Followers</span>
          </div>
          <div class="following">
            <h2>${data.following}</h2>
            <span>Following</span>
          </div>
        </div>
        <div class="user-other-details">
          <p><i class="fa-solid fa-building"></i> ${company}</p>
          <p><i class="fa-solid fa-location-dot"></i> ${location}</p>
          <p><i class="fa-solid fa-link"></i> <a href="${website}" target="_blank">${website}</a></p>
          <p><i class="fa-brands fa-x-twitter"></i> ${twitter}</p>
        </div>
      `;
    })
    .catch((error) => {
      infoBox.innerHTML = `<p>Error fetching data.</p>`;
      console.error(error);
    });
};

// Optional: Load a default user
getData("github");