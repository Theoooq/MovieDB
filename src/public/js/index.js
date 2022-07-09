const main = document.querySelector('.main');


//categorias
fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});


const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err =>  console.log(err));
}




const makeCategoryElement = (category, data) => {
    main.innerHTML += `

    

    <header class="main">
        <h1 class="category">${category.split("movies").join("").split("_").join(" ")}</h1>
        <div class="movies" id="${category}">
        </div>
    </header>
    `;
    movies(category, data)
}

let movie_id = location.pathname;

//lista dos filmes
fetch(`${movie_detail_http}${movie_id}?` + api_key)
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

const movies = (id, data) => {
    const moviesCards = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
 


        
        moviesCards.innerHTML+= `
        <header class="movie-card" onclick="location.href='/${item.id}'">
                <div class="card-up">
                    <img src="${img_url}${item.poster_path}" alt="${item.title}" class="movie-img">
                </div>
                <div class="movie-body">
                    <h4>${item.title}</h4>
    
                    <div class="movie-info">
                        <span class="year">${item.release_date.split("-").join("/")}</span>
                    </div>
                </div>
            </header>
        `;


    })

}
