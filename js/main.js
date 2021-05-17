let movie;

let apiUrl = "https://api.themoviedb.org/3/";
let type;
let apiKey = "?api_key=8c1a9592c5e5592b4ae3683c1656a158";
let genreName = null;



function getTop10Movies() {
    const NUMBER_OF_TOP_MOVIES = 7;
    type = "movie/top_rated";
    let page = "&page_1";
    let imagePathPrefix = "https://www.themoviedb.org/t/p/w500";
    let url = apiUrl + type + apiKey + page;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(obj) {

        for (let i = 0; i <= NUMBER_OF_TOP_MOVIES; i++) {
            let title = obj.results[i].title;
            let genre = obj.results[i].genre_ids[0];
            let img = imagePathPrefix + obj.results[i].poster_path;
            let year = obj.results[i].release_date.substring(0, 4);
            console.log(obj.results);


            if (i <= NUMBER_OF_TOP_MOVIES / 2) {
                document.getElementById("topEightFirstPage").innerHTML += "<div class=' card mx-1 my-4 ' style='max-width: 12rem; max-height:22rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:10rem; max-height:12rem;' src='" + img + "' alt='Card image cap'>" +
                    "<div class='card-body'>" +
                    " <a href='#' class='text-decoration-none text-dark'>" +
                    "  <h5 class='card-title' id='title'>" + title + "</h5>" +
                    " </a>" +
                    "  <a href='#' id='genre' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                    " <a href='#' id='year' class='card-link text-muted text-decoration-none'>(" + year + ")</a>" +
                    " </div>" +
                    " </div>";
            } else {
                document.getElementById("topEightSecondPage").innerHTML += "<div class=' card mx-1 my-4 ' style='max-width: 12rem; max-height:22rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:10rem; max-height:12rem;' src='" + img + "' alt='Card image cap'>" +
                    "<div class='card-body'>" +
                    " <a href='#' class='text-decoration-none text-dark'>" +
                    "  <h5 class='card-title' id='title'>" + title + "</h5>" +
                    " </a>" +
                    "  <a href='#' id='genre' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                    " <a href='#' id='year' class='card-link text-muted text-decoration-none'>(" + year + ")</a>" +
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
    let genres = [];

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(obj) {

        for (let i = 0; i < obj.genres.length; i++) {
            genres.push(obj.genres[i]);
        }
        return genres;


    }).catch(function(error) {
        console.error("Something went wrong");
        console.error(error);
    })
    return genres;

}

async function getNameFromGenreId(genreId) {

    type = "genre/movie/list";
    let url = apiUrl + type + apiKey;


    fetch(url).then(response => response.json())
        .then(function(obj) {

            for (let i = 0; i < obj.genres.length; i++) {
                if (obj.genres[i].id === genreId) {
                    genreName = obj.genres[i].name;
                    return genreName;

                }

            }



        }).catch(function(error) {
            console.error("Something went wrong");
            console.error(error);
        })

}