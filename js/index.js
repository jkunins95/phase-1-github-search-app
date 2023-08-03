// ## Deliverables

// You are going to build a JavaScript application which searches GitHub for users
// by name and displays the results on the screen. Clicking on a specific user will
// show all the repositories for that user.

// 1. The `index.html` file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the [User Search Endpoint](#user-search-endpoint).

// 2. Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

// 3. Clicking on one of these users should send a request to the [User Repos Endpoint](#user-repos-endpoint) and return data about all the repositories for that user.

// 4. Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.

document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("#github-form");
    form.addEventListener("submit", searchUser);

    function searchUser(e) {
        e.preventDefault();
        let searchValue = document.getElementById("search").value;
        fetch(`https://api.github.com/search/users?q=${searchValue}`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(users) {
            const userList = document.querySelector("#user-list");
            userList.innerHTML = ""; // clears existing user data

            users.items.forEach(user => {
                let userName = document.createElement("h2");
                    userName.id = "username"
                    userName.textContent = user.login
                let avatar = document.createElement("img");
                    avatar.src = user.avatar_url
                let link = document.createElement("link");
                    link.href = user.html_url
                    link.textContent = "View Profile"

            const userContainer = document.createElement("li");
            userContainer.append(userName, avatar, link);

            userList.append(userContainer)
            });
        });

        document.getElementById("user-list").addEventListener("click", findRepos)

        function findRepos() {
            fetch(`https://api.github.com/users/${searchValue}/repos`)
            .then(function(resp) {
                return resp.json()
            })
            .then(function(data) {
                const reposList = document.querySelector("#repos-list")

                data.forEach(repo => {
                    let repoName = document.createElement("h3");
                        repoName.textContent = repo.name
                    let repoLink = document.createElement("r");
                        repoLink.href = repo.html_url
                        repoLink.textContent = "View Repo"

                        const repoContainer = document.createElement("li");

                        repoContainer.append(repoName, repoLink);
                        reposList.append(repoContainer)
                });
            });
        }

    }
});
