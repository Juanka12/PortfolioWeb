document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let projectIndex = 0;
const MAX_PROJECTS = 2;

AddButtonListeners();

function AddButtonListeners() {
    document.querySelectorAll("div.card-button")[0].addEventListener('click', function () {
        projectIndex--;
        if (projectIndex < 0) {
            projectIndex = 0;
        }
        console.log(projectIndex);
        UpdateCurrentProject();
    });
    document.querySelectorAll("div.card-button")[1].addEventListener('click', function () {
        projectIndex++;
        if (projectIndex > 2) {
            projectIndex = 2;
        }
        console.log(projectIndex);
        UpdateCurrentProject();
    });
}

function UpdateCurrentProject() {
    fetch('https://raw.githubusercontent.com/Juanka12/ReactRestaurant/main/app/src/data/shopItems.json')
        .then(response => response.json())
        .then(data => console.log(data[0]["name"]))
        .catch(error => console.log(error));
}