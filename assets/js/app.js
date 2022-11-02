let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let random = Math.floor(Math.random() * 10);
fetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=fb58e466f76f551b6dccea1367744840&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
    random +
    "&with_watch_monetization_types=flatrate"
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then((results) => {
    console.log(results);
  })
  .catch((response) => {
    console.log(response.status, response.statusText);
    response.json().then((json) => {
      console.log(json);
    });
  });

const itemList = (image, originalTitle, title, imdbScore) => {
  let theme = `<li class="md:w-1/6 sm:w-1/2 movie">
  <div class="poster">
    <p class="language">
      <span class="flag en"></span>
    </p>
    <a href="javascript:;">American Murderer</a>
    <img class="img-responsive" loading="lazy" width="170" height="251" src="https://image.tmdb.org/t/p/w342${image}" alt="">
    <div class="detail">
      <p><span class="original-name">${originalTitle}</span></p>
      <p><span class="turkish-name">${title}</span></p>
    </div>
    <div class="hover-box">
      <p class="top">2022 - 1080p</p>
      <div class="imdb-eclipse center" data-percent="48">
        <span class="imdb-rating">${parseFloat(imdbScore).toFixed(1)}</span>
        <span class="text">imdb puanı</span>
        <canvas height="124" width="124"></canvas>
      </div>
      <p class="bottom">Gerilim, Suç</p>
    </div>
  </div>
   </li>`;
  $(".movie-list ul").append(theme);
};

const movies = fetch(
  "https://api.themoviedb.org/3/discover/movie?api_key=fb58e466f76f551b6dccea1367744840&language=tr-TR&sort_by=popularity.desc&include_adult=false&include_video=false&page=" +
    random +
    "&with_watch_monetization_types=flatrate"
).then((res) => res.json());

const series = fetch(
  "https://api.themoviedb.org/3/discover/tv?api_key=fb58e466f76f551b6dccea1367744840&language=tr-TR&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0"
).then((res) => res.json());

Promise.all([movies, series]).then((values) => {
  const moviesResult = values[0].results;
  const seriesResult = values[1].results;
  for (const movie in moviesResult) {
    const movieDetail = moviesResult[movie]
    itemList(
      movieDetail.poster_path,
      movieDetail.original_title,
      movieDetail.title,
      movieDetail.vote_average
    );
  }
  for (const series in seriesResult) {
    const seriesDetail = seriesResult[series]
    itemList(
      seriesDetail.poster_path,
      seriesDetail.original_name,
      seriesDetail.title,
      seriesDetail.vote_average
    );
  }
});
