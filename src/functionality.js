document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener("scroll", function () {
    if (window.scrollY >= 400) {
        this.document.getElementById("button-up").className = "button-up";
    }else {
        this.document.getElementById("button-up").className = "button-up hide";
    }
});

let projectIndex = 0;
const MAX_PROJECTS = 1;
let projectText = document.getElementById("card-text");
let projectImg = document.getElementById("card-img");
let projectLink = document.getElementById("card-link");

AddButtonListeners();
UpdateCurrentProject();

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
        if (projectIndex > MAX_PROJECTS) {
            projectIndex = MAX_PROJECTS;
        }
        console.log(projectIndex);
        UpdateCurrentProject();
    });
}

function UpdateCurrentProject() {
    fetch('https://raw.githubusercontent.com/Juanka12/PortfolioWeb/main/src/projects.json')
        .then(response => response.json())
        .then(data => {
            projectText.innerHTML = data[projectIndex]["text"];
            projectImg.src = data[projectIndex]["img"];
            projectImg.alt = data[projectIndex]["text"];
            projectLink.href = data[projectIndex]["link"];
        })
        .catch(error => console.log(error));
}