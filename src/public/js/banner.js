
// banner

  
let api = "api_key=9e3a2631a1eebff4fdadbb1d7b195d6e";


const base_url = "https://api.themoviedb.org/3";
// url
const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;
// img url 

// requests for movies data 
const requests = {
  fetchPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api}`,
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213&language=en-US`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28&language=en-US`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35&language=en-US`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27&language=en-US`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=35&language=en-US`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=27&language=en-US`,
};
// used to truncate the string 
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
// banner
fetch(requests.fetchPopular)
.then(res => res.json())
.then(data => {
  console.log(data.results);
  // every refresh the movie will be change
  const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
  console.log(setMovie);
  let bann = document.querySelector('.bann')
  bann.style.backgroundImage = "url(" + img_url + setMovie.backdrop_path + ")";
  bann.innerHTML+=`
  <header class="banner" onclick="location.href='/${setMovie.id}'">
  <div class="banner-content">
      <div class="banner-year">
          <i class="fa-solid fa-calendar-days"></i>
          <span class="year">${setMovie.release_date}</span>
      </div>

      </div>
    <h1 class="banner-title">${setMovie.title}</h1>
</header>
  `;

  

  }

)