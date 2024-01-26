const global= {
    currentPage: window.location.pathname,
}

async function displayPopularMovies(){
    const {results}= await fetchAPIData('movie/popular')
    console.log(results);

    results.forEach((movie)=>{
        const grid= document.querySelector('#popular-movies')
        const div= document.createElement('div');
       
        div.classList.add("card");
        // const a = document.createElement('a')
        // a.href={}
   
        div.innerHTML=`
            <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path?
            ` <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
            />`:`
            <img
                    src="{../images/no-image.jpg}"
                    class="card-img-top"
                    alt="Movie Title"
            />`
            }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>`;

            grid.appendChild(div)

  })

}

async function displayMovieDetails(){
    const movieID= window.location.search.split('=')[1 ];
    const movie= await fetchAPIData(`movie/${movieID}`)
    // const data= await results.json
    // console.log(results);

const div= document.createElement('div')
    div.classList.add('movie-details')

    div.innerHTML=`
        <div class="details-top">
            <div>

         ${movie.poster_path?  
             ` <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />`:`<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            />`}
            </div>
            <div>
            <h2>${movie.title}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres.map((genre)=>
                    `<li>${genre.name}</li>`).join(' ')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes </li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                    ${movie.production_companies.map((company)=>`${company.name}, `).join(' ')}
            </div>
       </div> `
   
        document.querySelector('#movie-details').appendChild(div)
}

async function displayPopularTVShows(){
    const {results}= await fetchAPIData('tv/popular')
    console.log(results);

    results.forEach((movie)=>{
        const div= document.createElement('div')
        const grid= document.querySelector('#popular-shows')
        div.classList.add('card')
        div.innerHTML=` 
            <a href="tv-details.html?id=${movie.id}">
            ${movie.poster_path?
                `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.name}"
                />`:
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.name}"
                />`
        }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.name}</h5>
                <p class="card-text">
                <small class="text-muted">Aired: ${movie.first_air_date}</small>
                </p>
            </div> `;
     grid.appendChild(div)
   })
}

async function displayTVShowDetails() {

    const movieID=window.location.search.split('=')[1];
    const movie= await fetchAPIData(`tv/${movieID}`)
    const div = document.createElement('div')
    div.classList.add('show-details')
    div.innerHTML=`
    <div class="details-top">
          <div>
          ${movie.poster_path?
            `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.name}"
            />`:
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.name}"
            />`
    }          </div>
          <div>
            <h2>${movie.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${
                movie.genres.map((genre)=>`
                    <li>${genre.name}</li>
                `).join('')
              }
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${movie.number_of_seasons}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${movie.last_air_date}
              Aired Show Episode
            </li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${movie.production_companies.map((company)=>`${company.name}  `

           )}
          </div>
        </div>
    `
    document.querySelector('#show-details').appendChild(div)
}

// Fetch data from tmdb
async function fetchAPIData(endpoint) {
    const API_KEY= '653550611524bb609fd554459e37dbde' ;
    const API_URL= 'https://api.themoviedb.org/3/'

    showSpinner();
    const response= await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json();

    hideSpinner()

    return data;

}
function addCommasToNumbers(number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}
function highlight(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if (link.getAttribute('href')===global.currentPage) {
            link.classList.add('active')
        }
    });
}
function init(){
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularTVShows();
            break;
        case '/movie-details.html':
            displayMovieDetails()
            break;
        case '/tv-details.html':
            displayTVShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
                                                    
        default:
            break;
    }
    highlight();

}


document.addEventListener('DOMContentLoaded',init)


