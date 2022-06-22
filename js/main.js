const elWrapper = document.querySelector(".wrapper");
const elSearchResult = document.querySelector(".rearch-result");
const elForm = document.querySelector(".form");
const elSearchInput = document.querySelector(".search-input");
const elReating = document.querySelector(".reating");
const elCategory = document.querySelector(".category-select");
const elBtn = document.querySelector(".button");
const elBokmarkedList = document.querySelector(".bookmark-list");
const elTemplate = document.querySelector(".template").content;
const elBookmarkTemplate = document.querySelector(".bookmarkid").content;



let slicedFilms = films.slice(0,20)





// render film
function renderFilms(filmArry, wrapper) {
    wrapper.innerHTML = null;
    let elFragment = document.createDocumentFragment()
    
    filmArry.forEach(film => {
        
        let templateDiv = elTemplate.cloneNode(true)
        
        templateDiv.querySelector(".card-img-top").src = film.poster
        templateDiv.querySelector(".card-title").textContent = film.title
        templateDiv.querySelector(".card-categories").textContent = film.genres
        templateDiv.querySelector(".bookmark-btn").dataset.filmId = film.id
        
        elFragment.appendChild(templateDiv)
        
    });
    wrapper.appendChild(elFragment)
    elSearchResult.textContent = filmArry.length
    
}

renderFilms(slicedFilms, elWrapper)



//generate genres
//--------------------------------------------------------------------------------------

function generategenres(arr) {
    
    let genreList = []
    
    
    
    arr.forEach( film=> {
        film.genres.forEach(genre => {
            if (!genreList.includes(genre)) {
                genreList.push(genre)
            }
        })
    });
    
    genreList.sort()
    
    let genreFragment = document.createDocumentFragment()
    
    genreList.forEach(genre => {
        let genreOption = document.createElement("option")
        
        genreOption.value = genre
        genreOption.textContent = genre
        
        genreFragment.appendChild(genreOption)
    })
    
    elCategory.appendChild(genreFragment)
}

generategenres(slicedFilms)

//----------------------------------------------------------------------------------------
// genre addeventlistener

elForm.addEventListener("submit" , function(evt) {
    evt.preventDefault()
    let selectvalue = elCategory.value;
    
    let selectedMovies = []
    
    slicedFilms.forEach(film => {
        if ( selectvalue === "All" || film.genres.includes(selectvalue)) {
            selectedMovies.push(film)
            
        }
    })
    
    
    renderFilms(selectedMovies, elWrapper)
})

//--------------------------------------------------------------------------------------------------------

// bookmark

let localBookmark = JSON.parse(window.localStorage.getItem("bookmarkFilms"))

let bookmarkFilms = localBookmark || []


elWrapper.addEventListener("click", function (evt) {
    
    
    let filmsId = evt.target.dataset.filmId
    
    if (filmsId) {
        let foundFilm = slicedFilms.find(film => film.id == filmsId)
        
        let doesInclute = bookmarkFilms.findIndex(inclute =>inclute.id == foundFilm.id)
        
        
        if (doesInclute === -1) {
            bookmarkFilms.push(foundFilm)
            window.localStorage.setItem("bookmarkFilms", JSON.stringify(bookmarkFilms))
            renderBokmark(bookmarkFilms,elBokmarkedList )
            
        }
    }
    
    
})


//--------------------------------------------------------------------------------

// render boomark

function renderBokmark(Bookmarkarry, wrapper) {
    wrapper.innerHTML= null
    
    let elFragment = document.createDocumentFragment()
    
    Bookmarkarry.forEach( bookmark => {
        
        let templateBookmark = elBookmarkTemplate.cloneNode(true)
        
        templateBookmark.querySelector(".boomark-title").textContent = bookmark.title
        templateBookmark.querySelector(".btn-remove").dataset.removeId = bookmark.id
        
        elFragment.appendChild(templateBookmark)
        
    })
    
    wrapper.appendChild(elFragment)
}

renderBokmark(bookmarkFilms,elBokmarkedList )

//-----------------------------------------------------------------------------------------

// remove bookmark 

elBokmarkedList.addEventListener("click", function(evt) {
    
    let removeFilmId = evt.target.dataset.removeId
    
    if (removeFilmId) {
        
        let indexOfFilms = bookmarkFilms.findIndex(film => film.id == removeFilmId)
        
        bookmarkFilms.splice(indexOfFilms, 1)
        window.localStorage.setItem("bookmarkFilms", JSON.stringify(bookmarkFilms))

        if (bookmarkFilms.length === 0) {
            window.localStorage.removeItem("bookmarkFilms")
        }
        renderBokmark(bookmarkFilms,elBokmarkedList )
        
    }
})

