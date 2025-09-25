
let modalBackdrop = document.getElementById('modalBackdrop')
let openModalBtn = document.getElementById('openModalBtn')
let githubUsername = document.getElementById('githubUsername')
let errorMsg = document.querySelector('.errorMsg')
let submitBtn = document.getElementById('submitBtn')
let closeModalBtn = document.getElementById('closeModalBtn')
let name = document.getElementById('name')
let Username = document.getElementById('Username')
let bio = document.getElementById('bio')
let followers = document.getElementById('followers')
let repos = document.getElementById('repos')
let gists = document.getElementById('gists')
let githubProfilePic = document.getElementById('githubProfilePic')

openModalBtn.addEventListener('click', function () {
    modalBackdrop.classList.add('open')

    closeModalBtn.addEventListener("click", () => {
        modalBackdrop.classList.remove('open')
        errorMsg.classList.add('hidden')
    })
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let GetUsername = githubUsername.value;
    if (!GetUsername) {
        errorMsg.classList.remove('hidden')

    } else {
        errorMsg.classList.add('hidden')
        submitBtn.textContent = 'Loading...'
        console.log(GetUsername);

        async function fetchData() {
            try {
                let response = await fetch(`https://api.github.com/users/${GetUsername}`);
                console.log(response);
                
                if (!response) {
                    throw new Error("error: `${response.status}`");
                }
                let data = await response.json();
                name.innerHTML = `${data.name || 'Name not found'}`
                Username.innerHTML = `@${data.login || 'Username not found'}`
                bio.innerHTML = `${data.bio || 'bio not found'}`
                followers.innerHTML = `${data.followers || 'followers not found'}`
                repos.innerHTML = `${data.public_repos || 'repos not found'}`
                gists.innerHTML = `${data.public_gists === 0 ? 0 : (data.public_gists) || 'Gists not found'}`
                profileImage.src = data.avatar_url 

                modalBackdrop.classList.remove('open');

            } catch (error) {
                console.error('Error fetching data:', error);
                // name.innerHTML = `<div class="error">⚠️ Error fetching data</div>`;
               }

            finally {
                submitBtn.textContent = "Update Card";
            }
        }

        fetchData();    
    }
})


