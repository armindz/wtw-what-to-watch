let movie;

let apiUrl = "https://api.themoviedb.org/3/";
let type;
let apiKey = "?api_key=8c1a9592c5e5592b4ae3683c1656a158";
let genreName = null;
let imagePathPrefix = "https://www.themoviedb.org/t/p/w500";

// mechanism for getting most popular movies & display at index.html
function getTop10Movies() {
    const NUMBER_OF_TOP_MOVIES = 7;
    type = "movie/popular";
    // let page = "&page_1";

    let url = apiUrl + type + apiKey;
    console.log(url);
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
                    " <a onclick='previewItem(" + obj.results[i].id + ")' href='#' class='text-decoration-none text-dark'>" +
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
                    " <a onclick='previewItem(" + obj.results[i].id + ")' href='#' class='text-decoration-none text-dark'>" +
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
// mechanism for listing movie genres in movie.html sidebar
function listMovieGenres() {

    type = "genre/movie/list";
    let url = apiUrl + type + apiKey;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(obj) {

        let listGenres = document.getElementById("listGenre");

        for (let i = 0; i < obj.genres.length; i++) {
            let listGenresItem = document.createElement("A");
            listGenresItem.setAttribute("class", "list-group-item");
            listGenresItem.setAttribute("name", obj.genres[i].id);
            listGenresItem.setAttribute("onclick", "displayMovieByGenre(" + obj.genres[i].id + ")");
            listGenresItem.innerText = obj.genres[i].name;
            listGenres.appendChild(listGenresItem);

        }
    }).catch(function(error) {
        console.error("Cannot fetch movie genres");
        console.error(error);
    })
}

// get list of genres & return as list
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

// getting name by forwarding genre id
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

// display movies by genre (triggered when genre section is clicked)
function displayMovieByGenre(genreId) {
    document.getElementById("movie-container").innerHTML = "";
    type = "movie/";
    const ITEMS_PER_PAGE = 20;
    for (let i = 2; i < 1000; i++) {

        let url = apiUrl + type + i + apiKey;

        fetch(url).then(response => {


            if (response.status == 200) {
                console.log(response);
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        }).then(function(obj) {



            let genre = obj.genres[0].name;
            let img = imagePathPrefix + obj.poster_path;
            let year = obj.release_date.substring(0, 4);
            if (obj.genres[0].id == genreId) {
                document.getElementById("movie-container").innerHTML += "<div class=' card mx-auto my-4 ' style='max-width: 18rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:16.5rem; max-height:300px;' src='" + img + "' alt='Card image cap'>" +
                    "  <div class='card-body'>" +
                    "<h5 class='card-title'>" + obj.title + "</h5>" +
                    " <a href='#' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                    " <a href='#' class='card-link text-muted text-decoration-none'>(" + year + ")</a>" +
                    "<a href='#' onclick='previewItem(" + obj.id + ")' class='btn btn-primary btn-warning my-4 d-block'>View details</a>" +
                    "</div>  </div>"
            }




        }).catch(function(error) {
            console.log("ERROR");
            console.log(error);
        })
    }

}

// redirect to item.html & forward item id
function previewItem(itemId) {
    localStorage.setItem("item-id", itemId);
    window.location.href = "./item.html";
}

// dynamically display item info at item.html based on it's ID
function displayItem(itemId) {
    type = "movie/";
    let url = apiUrl + type + itemId + apiKey;

    fetch(url).then(response => response.json()).then(function(obj) {


        // image at item.html
        let itemImg = document.createElement("img");
        itemImg.setAttribute("src", imagePathPrefix + obj.poster_path);
        document.getElementById("item-image").appendChild(itemImg);

        // item name at item.html
        let itemName = document.createElement("H3");
        itemName.setAttribute("class", "col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 text-start");
        itemName.setAttribute("id", "item-name");
        itemName.innerText = obj.title;
        document.getElementById("item-name-year").appendChild(itemName);

        // item year at item.html
        let itemYear = document.createElement("H3");
        itemYear.setAttribute("class", "col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 text-start");
        itemYear.setAttribute("id", "item-year");
        itemYear.innerText = "(" + obj.release_date.substring(0, 4) + ")";
        document.getElementById("item-name-year").appendChild(itemYear);

        // item genre at item.html
        let itemGenre = document.createElement("P");
        itemGenre.setAttribute("class", "col-2 border");
        itemGenre.innerText = obj.genres[0].name;
        document.getElementById("genre-row").appendChild(itemGenre);

        // item details at item.html
        let itemDetails = document.createElement("P");
        itemDetails.setAttribute("id", "item-details");
        itemDetails.innerText = obj.overview;
        document.getElementById("item-details-row").appendChild(itemDetails);


        // production company at item.html
        let prodCompany = document.createElement("P");
        prodCompany.setAttribute("class", "col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5 col-3");
        prodCompany.setAttribute("id", "prod-company");
        prodCompany.innerText = "Prod. company: " + obj.production_companies[0].name;
        document.getElementById("prod-info-row").appendChild(prodCompany);

        // production country at item.html
        let prodCountry = document.createElement("P");
        prodCountry.setAttribute("class", "col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-3");
        prodCountry.setAttribute("id", "prod-country");
        prodCountry.innerText = "Prod. country: " + obj.production_countries[0].name;
        document.getElementById("prod-info-row").appendChild(prodCountry);


        // item release date at item.html
        let releaseDate = document.createElement("P");
        releaseDate.setAttribute("class", "col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5 col-3");
        releaseDate.setAttribute("id", "rel-date");
        releaseDate.innerText = "Release date: " + obj.release_date;
        document.getElementById("item-date-id-row").appendChild(releaseDate);

        // item id at item.html
        let itemId = document.createElement("P");
        itemId.setAttribute("class", "col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-3");
        itemId.setAttribute("id", "item-id");
        itemId.innerText = "ID: " + obj.id;
        document.getElementById("item-date-id-row").appendChild(itemId);

    })
}


function displaySimilarMovies(movieId) {

    type = "movie/" + movieId + "/similar";

    let url = apiUrl + type + apiKey;
    console.log(url);
    fetch(url).then(response => response.json()).then(function(obj) {
        const NUMBER_OF_SIMILAR_MOVIES = 4;
        for (let i = 0; i < NUMBER_OF_SIMILAR_MOVIES; i++) {
            let img = imagePathPrefix + obj.results[i].poster_path;
            let title = obj.results[i].title;
            let genre = obj.results[i].genre_ids[0];
            let year = obj.results[i].release_date.substring(0, 4);
            let id = obj.results[i].id;
            document.getElementById("similar-movies").innerHTML += "<div class=' card mx-auto my-4 text-center col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3' style='max-width: 18rem;'>" +
                "<img class='card-img-top mx-auto my-auto' style='max-width:16.5rem; max-height:300px;' src='" + img + "' alt='Card image cap'>" +
                "  <div class='card-body'>" +
                "<h5 maxlength = '30' class='card-title'>" + title + "</h5>" +
                " <a href='#' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                " <a href='#' class='card-link text-muted text-decoration-none'>(" + year + ")</a>" +
                "<a href='#' onclick='previewItem(" + id + ")' class='btn btn-primary btn-warning my-4 d-block'>View details</a>" +
                "</div>  </div>"
        }
    })

}
// display movies by year (triggered when year section is clicked)
function displayMovieByYear(releaseYear) {
    console.log(releaseYear);
    // clear movie container
    document.getElementById("movie-container").innerHTML = "";
    type = "movie/";
    const ITEMS_PER_PAGE = 20;
    for (let i = 2; i < 1000; i++) {

        let url = apiUrl + type + i + apiKey;
        console.log(url);
        fetch(url).then(response => {


            if (response.status == 200) {
                console.log(response);
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        }).then(function(obj) {



            let genre = obj.genres[0].name;
            let img = imagePathPrefix + obj.poster_path;
            let year = obj.release_date.substring(0, 4);
            console.log(year);
            if (releaseYear == year) {
                document.getElementById("movie-container").innerHTML += "<div class=' card mx-auto my-4 ' style='max-width: 18rem;'>" +
                    "<img class='card-img-top mx-auto my-auto' style='max-width:16.5rem; max-height:300px;' src='" + img + "' alt='Card image cap'>" +
                    "  <div class='card-body'>" +
                    "<h5 class='card-title'>" + obj.title + "</h5>" +
                    " <a href='#' class='card-link text-muted text-decoration-none'>" + genre + "</a>" +
                    " <a href='#' class='card-link text-muted text-decoration-none'>(" + year + ")</a>" +
                    "<a href='#' onclick='previewItem(" + obj.id + ")' class='btn btn-primary btn-warning my-4 d-block'>View details</a>" +
                    "</div>  </div>"
            }




        }).catch(function(error) {
            console.log("ERROR");
            console.log(error);
        })
    }

}


function listMovieYears(startYear, endYear) {

    for (let i = endYear; i >= startYear; i--) {
        let year = document.createElement("A");
        year.setAttribute("class", "list-group-item");
        year.setAttribute("onclick", "displayMovieByYear(" + i + ")");
        year.innerText = i;
        document.getElementById("listYear").appendChild(year);
    }

}