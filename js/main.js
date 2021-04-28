let movie;

let apiUrl = "https://api.themoviedb.org/3/";
let type;
let apiKey = "?api_key=8c1a9592c5e5592b4ae3683c1656a158";



function getTop10Movies() {
    const NUMBER_OF_TOP_MOVIES = 7;
    type = "movie/top_rated";
    let page = "&page_1";
    let url = apiUrl + type + apiKey + page;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(obj) {

        for (let i = 0; i <= NUMBER_OF_TOP_MOVIES; i++) {
            let title = obj.results[i].title;
            let genre = obj.results[i].genre_ids[0];


            if (i <= NUMBER_OF_TOP_MOVIES / 2) {
                document.getElementById("topEightFirstPage").innerHTML += "<div class=' card mx-1 my-4 ' style='max-width: 12rem; max-height:22rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:10rem; max-height:12rem;' src='img/intothestorm.jpg' alt='Card image cap'>" +
                    "<div class='card-body'>" +
                    " <a href='#' class='text-decoration-none text-dark'>" +
                    "  <h5 class='card-title' id='title'>" + title + "</h5>" +
                    " </a>" +
                    "  <a href='#' id='genre' class='card-link text-muted text-decoration-none'>Genre</a>" +
                    " <a href='#' id='year' class='card-link text-muted text-decoration-none'>(2020)</a>" +
                    " </div>" +
                    " </div>";
            } else {
                document.getElementById("topEightSecondPage").innerHTML += "<div class=' card mx-1 my-4 ' style='max-width: 12rem; max-height:22rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:10rem; max-height:12rem;' src='img/intothestorm.jpg' alt='Card image cap'>" +
                    "<div class='card-body'>" +
                    " <a href='#' class='text-decoration-none text-dark'>" +
                    "  <h5 class='card-title' id='title'>" + title + "</h5>" +
                    " </a>" +
                    "  <a href='#' id='genre' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                    " <a href='#' id='year' class='card-link text-muted text-decoration-none'>(2020)</a>" +
                    " </div>" +
                    " </div>";

            }
        }


    }).catch(function(error) {
        console.error("Something went wrong");
        console.error(error);
    })

}

function getListOfGenres() {

    type = "genre/movie/list";
    let url = apiUrl + type + apiKey;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(obj) {
        let genres = [];
        for (let i = 0; i < obj.genres.length; i++) {
            genres.push(obj.genres[i]);
        }

        return genres;


    }).catch(function(error) {
        console.error("Something went wrong");
        console.error(error);
    })


}