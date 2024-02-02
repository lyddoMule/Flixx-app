// const Swiper = require( 'swiper');

// const button = document.getElementById('btn-search')
// const inputSearch= document.getElementById('search-term')
const global= {
    currentPage: window.location.pathname,
    search:{
        term: '',
        type: '',
        page: 1,
        totalPages: 1
    },
    api:{
        apiKey: '653550611524bb609fd554459e37dbde',
        apiUrl: 'https://api.themoviedb.org/3/'
    
    }
}
// const btn = document.getElementsById('btn-search')

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

    displayOverLayBackground('movie', movie.backdrop_path)

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

    displayOverLayBackground('show', movie.backdrop_path)

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
            <p class="text-muted">Release Date: ${movie.first_air_date}</p>
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

function displayOverLayBackground(type, backgroundPath){
    const overlay = document.createElement('div') 
    overlay.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlay.style.backgroundPosition = 'center'
    overlay.style.backgroundSize = 'cover'
    overlay.style.backgroundRepeat = 'no-repeat'
    overlay.style.height = '185vh'
    overlay.style.position = 'absolute'
    overlay.style.width = '100vw'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.opacity = '0.1'
    overlay.style.zIndex = '-1' 


    if (type ==='movie'){
        document.querySelector('#movie-details').appendChild(overlay)
    }else{
        document.querySelector('#show-details').appendChild(overlay)
    }
}

async function searchMovies() {
    const queryString= window.location.search
    const urlParams= new URLSearchParams(queryString)
       global.search.type= urlParams.get('type');
       global.search.term= urlParams.get('search-term') 

       if(global.search.term!=='' && global.search.term!==null){
            const {results, total_pages ,page, total_results} = await searchAPIData()
            console.log(results);
            global.search.page=page;
            global.search.totalPages=total_pages;
            global.search.totalResults=total_results;


            if(results.length===0){
                showAlert('No Results Found')
            }else{
                displaySearch(results, total_pages, total_results);

            }
       }else{
        showAlert('please enter search term')
           }
} 
function showAlert(message, className='error'){
    const alertEl= document.createElement('div')
    alertEl.classList.add('alert',className)
    alertEl.appendChild(document.createTextNode(message))
    document.querySelector('#alert').appendChild(alertEl)
    setTimeout(()=> alertEl.remove(), 3000)
}

function displaySearch(results) {

    document.querySelector('#search-results').innerHTML=''
    document.querySelector('#search-results-heading').innerHTML=''
    document.querySelector('#pagination').innerHTML=''

 
    

    results.forEach((result)=>{
         const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML=`
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${result.poster_path?
                `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type==='movie'? result.title:result.name}"
                />`:
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${global.search.type==='movie'? result.title:result.name}"
                />`
        }
            </a>
            <div class="card-body">
                <h5 class="card-title">${global.search.type==='movie'? result.title : result.name}</h5>
                <p class="card-text">
                <small class="text-muted">Released: ${global.search.type==='movie'?result.release_date: result.first_air_date}</small>
                </p>
            </div>`
       document.querySelector('#search-results').appendChild(div)
 })
    const heading = document.createElement('heading')
    heading.innerHTML=`<h2> ${results.length} OF ${global.search.totalResults} Search Results for "${global.search.term}"</h2>`;
    document.querySelector('#search-results-heading').appendChild(heading)

 displayPagination();

}
function displayPagination() {
    const pagDiv= document.createElement('div')
    pagDiv.classList.add('pagination');
   pagDiv.innerHTML=`
   <button class="btn btn-primary" id="prev">Prev</button>
   <button class="btn btn-primary" id="next">Next</button>
   <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
   
   `
    document.querySelector('#pagination').appendChild(pagDiv)

    if (global.search.page===1){
        document.getElementById("prev").disabled = true;
    }
    if (global.search.page===global.search.totalPages){
        document.getElementById("next").disabled = true;
    }
    document.querySelector('#next').addEventListener('click', async ()=>{
        global.search.page++;
        const {results, totalPages} =await searchAPIData()
        displaySearch(results)
    })
    document.querySelector('#prev').addEventListener('click', async ()=>{
        global.search.page--;
        const {results, totalPages} =await searchAPIData()
        displaySearch(results)
    })

}

async function displaySwipers() {
    const {results}= await fetchAPIData('movie/now_playing')
    results.forEach((movie)=>{
        const div= document.createElement('div')
        div.classList.add('swiper-slide')
        div.innerHTML=`
            <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"   alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
        </h4>`       
        document.querySelector('.swiper-wrapper').appendChild(div)
    })
    initSwiper()
}



function initSwiper() {
    const swiper= new Swiper('.swiper',{
        slidesPerView: 1,
        loop: true,
        freeMode: true,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints:{
            500:{
                slidesPerView: 3,
            },
            700:{
                slidesPerView: 4,
            },
            1200:{
                slidesPerView: 5,
            },
        },
    });
}

  

// Fetch data from tmdb
async function fetchAPIData(endpoint) {
    const API_KEY= global.api.apiKey ;
    const API_URL= global.api.apiUrl

    showSpinner();
    const response= await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json();

    hideSpinner()

    return data;

}

async function searchAPIData() {
    const API_KEY= global.api.apiKey ;
    const API_URL= global.api.apiUrl

    showSpinner();
    const response= await fetch(
        `${API_URL}search/${global.search.type}?api_key=${API_KEY}&
    language=en-US&query=${global.search.term}&page=${global.search.page}`)
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
            displaySwipers();
            displayPopularMovies();
            // initSwiper();

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
            searchMovies();
            break;
                                                    
        default:
            break;
    }
    highlight();

}


 
document.addEventListener('DOMContentLoaded',init )
// document.addEventListener('DOMContentLoaded',displaySwipers )
// button.addEventListener('submit', searchMovies)
// inputSearch.addEventListener
