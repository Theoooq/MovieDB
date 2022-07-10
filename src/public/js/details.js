let movie_id = location.pathname;

// fetching movie details
fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    const card = document.querySelector('.movie-card')

    title.innerHTML = movieName.innerHTML = data.title; 
    genres.innerHTML = `${data.release_date.split('-')[0]} ● `;
    for(let i = 0; i < data.genres.length; i++){
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }

    des.innerHTML = data.overview.substring(0, 500);

    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
    card.innerHTML +=`
    <div class="movies">
    <div class="movie-card">
        <div class="card-up">
            <img src="${img_url}${data.poster_path}" alt="" class="movie-img">
        </div>
    </div>
</div> 
    `;
}

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}


// fetching video clips



// fetch recommendations

fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    let container = document.querySelector('.recommendations-list');
    for(let i = 0; i < 16; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }
        container.innerHTML += `

        <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <div class="gradient"></div>
            <img src="${img_url}${data.results[i].poster_path}" alt="">
        </div>
        `;

        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
    }
})