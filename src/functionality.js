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
const MAX_PROJECTS = 3;
let projectText = document.getElementById("card-text");
let projectImg = document.getElementById("card-img");
let projectLink = document.getElementById("card-link");

let currentMedia = 0;
let MAX_MEDIA = 1;
let mediaArray = new Array();
let mediaContainer = document.getElementById("media-main");
let detailsLogo = document.getElementById("details-logo");
let mediaVideo = document.getElementById("media-video");

document.getElementById("details-link").addEventListener('click', function (e) {
    document.getElementById("details-page").className = "details-page active";
    fetch('https://raw.githubusercontent.com/Juanka12/PortfolioWeb/main/src/media.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if (element["projectId"] == projectIndex) {
                    mediaArray.push(element["link"]);
                }
            });
            mediaContainer.src = mediaArray[0];
            MAX_MEDIA = mediaArray.length-1;
        })
        .catch(error => console.log(error));
});
document.getElementById("details-close").addEventListener('click', function (e) {
    document.getElementById("details-page").className = "details-page";
    mediaArray = new Array();
    currentMedia = 0;
    mediaVideo.pause();
    mediaVideo.currentTime = 0;
    mediaVideo.className = "media-video hide";
    mediaContainer.className = "media-main";
});

AddButtonListeners();
UpdateCurrentProject();
AddMediaButtonListeners();

function AddButtonListeners() {
    document.querySelectorAll("div.card-button")[0].addEventListener('click', function () {
        projectIndex--;
        if (projectIndex < 0) {
            projectIndex = 0;
        }
        UpdateCurrentProject();
    });
    document.querySelectorAll("div.card-button")[1].addEventListener('click', function () {
        projectIndex++;
        if (projectIndex > MAX_PROJECTS) {
            projectIndex = MAX_PROJECTS;
        }
        UpdateCurrentProject();
    });
}

function UpdateCurrentProject() {
    fetch('https://raw.githubusercontent.com/Juanka12/PortfolioWeb/main/src/projects.json')
        .then(response => response.json())
        .then(data => {
            projectText.innerHTML = data[projectIndex]["text"];
            projectImg.src = data[projectIndex]["img"];
            projectImg.alt = data[projectIndex]["name"];
            projectLink.href = data[projectIndex]["link"];
            detailsLogo.src = data[projectIndex]["img"];
            detailsLogo.alt = data[projectIndex]["name"];
        })
        .catch(error => console.log(error));
}

function AddMediaButtonListeners() {
    document.querySelectorAll("div.media-button")[0].addEventListener('click', function () {
        currentMedia --;
        if (currentMedia < 0) {
            currentMedia = 0;
            return;
        }
        checkForVideo();
    });
    document.querySelectorAll("div.media-button")[1].addEventListener('click', function () {
        currentMedia ++;
        if (currentMedia > MAX_MEDIA) {
            currentMedia = MAX_MEDIA;
            return;
        }
        checkForVideo();
    });
}

function checkForVideo() {
    if (mediaArray[currentMedia].indexOf("download") !== -1) {
        mediaVideo.src = mediaArray[currentMedia];
        mediaVideo.className = "media-video";
        mediaContainer.className = "media-main hide"
    }else {
        mediaContainer.src = mediaArray[currentMedia];
        mediaVideo.className = "media-video hide";
        mediaContainer.className = "media-main";
    }
}