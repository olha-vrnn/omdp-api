const movieName = document.getElementById('movieName');
const searchBtn = document.getElementById('seachBtn');
let cardsBlock = document.getElementById('cardsBlock');

const modalWindow = document.querySelector('.modal-container');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalShortInfo = document.getElementById('modalShortInfo');
const modalPlot = document.getElementById('modalPlot');
const modalWritten = document.getElementById('modalWritten');
const modalDirected = document.getElementById('modalDirected');
const modalStarring = document.getElementById('modalStarring');
const modalBoxOffice = document.getElementById('modalBoxOffice');
const modalAwards = document.getElementById('modalAwards');
const modalRatings1 = document.getElementById('modalRatings1');
const modalRatings2 = document.getElementById('modalRatings2');
const modalRatings3 = document.getElementById('modalRatings3');

let cardContent = '';
let idMovie = '';

async function searchMovie() {
    cardsBlock.innerHTML = "";

    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=c286dd4c&s=` + movieName.value);
        let movie = await response.json();

        await movie.Search.forEach((movie, index) => {
            if (movie.Title.length > 50) {
                movie.Title = movie.Title.slice(0, 50);
            }
            cardContent = `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${movie.Poster}"
                        alt="${movie.Title}">
                </div>

                <div class="movie-box">
                    <div class="movie-title">
                        <h2>${movie.Title}</h2>
                    </div>

                    <div class="movie-info">
                        <p>${movie.Type}</p>
                        <p class="movie-year">${movie.Year}</p>
                    </div>

                    <button class="detail-btn green-btn" id="${movie.imdbID}">More details</button>
                </div>
            </div>`;
            cardsBlock.innerHTML += cardContent;
        });
    } catch (err) {
        if (movieName.value.length < 1) {
            alert(new Error("Введіть назву фільму у рядок пошуку."));
        } else {
            alert(new Error("За даною назвою нічого не знайдено. Спробуйте ще."));
        }
    }
};

async function getMovie() {

    let response = await fetch(`http://www.omdbapi.com/?apikey=c286dd4c&i=${idMovie}&plot=full`);
    let movie = await response.json();

    modalPoster.src = movie.Poster;
    modalTitle.innerHTML = movie.Title;
    modalShortInfo.innerHTML = `${movie.Rated}, ${movie.Year}, ${movie.Genre}`;
    modalPlot.innerHTML = movie.Plot;
    modalWritten.innerHTML = movie.Writer;
    modalDirected.innerHTML = movie.Director;
    modalStarring.innerHTML = movie.Actors;
    modalBoxOffice.innerHTML = movie.BoxOffice;
    modalAwards.innerHTML = movie.Awards;

    if (movie.Ratings[0]) {
        modalRatings1.innerHTML = `${movie.Ratings[0].Source} ${movie.Ratings[0].Value}`;
    } else {
        modalRatings1.innerHTML = "";
    }
    if (movie.Ratings[1]) {
        modalRatings2.innerHTML = `${movie.Ratings[1].Source} ${movie.Ratings[1].Value}`;
    } else {
        modalRatings2.innerHTML = "";
    }
    if (movie.Ratings[2]) {
        modalRatings3.innerHTML = `${movie.Ratings[2].Source} ${movie.Ratings[2].Value}`;
    } else {
        modalRatings3.innerHTML = "";
    }

    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function openModal(e) {

    if (e.target.localName != "button") {
        return;
    } else {
        idMovie = e.target.id;
        getMovie();
    }
};

searchBtn.addEventListener("click", searchMovie);
cardsBlock.addEventListener("click", openModal);
modalWindow.addEventListener("click", function(e) {
    let self = e.target.closest('.modal-block');
    if (!self) {
        modalWindow.style.display = 'none';
        document.body.style.overflow = 'scroll';
    }
});


