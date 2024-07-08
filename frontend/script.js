const APILINK= `${environment.APILink}`;
const APIKEY=`${environment.APIKey}`;
const SEARCHAPI =`${environment.APISearch}`;

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');
 


returnMovies(APILINK);

function returnMovies(url) {
    fetch(url, {
    method: 'GET',
    headers: {
        'X-API-KEY': APIKEY,
        'Content-Type': 'application/json',
    },
})
.then(res=>res.json())
    .then(function(data){
        let films;
        if (data.items) {
            films = data.items;
        }else{
            films =data.films 
        }
        films.forEach(element => {
            let name;
            let id;
            if (element.nameRu){
                name =element.nameRu;
            }else{
                if (element.nameOriginal) {
                    name=element.nameOriginal;
                }else{
                    name=element.nameEn;
                }
            }
            if (element.kinopoiskId){
                id = element.kinopoiskId;
            }else{
                id = element.filmId
            }
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');
            // ? here is query parametr
            title.innerHTML=`${name}<br><a href="movie.html?id=${id}&title=${name}">Отзывы</a>`;
            //IMG_PATH+element.poster_path
            image.src=element.posterUrl;
            image.addEventListener('click', function() {
                window.location=`movie.html?id=${id}&title=${name}`;
              });

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
            equalHeights('card');
        });
    });
}

//same size function for cards 
function equalHeights(className) {
    var findClass = document.getElementsByClassName(className);
    var tallest = 0; 
  // Loop over matching divs
  for(i = 0; i < findClass.length; i++)
  {
    var ele = findClass[i];
    var eleHeight = ele.offsetHeight;
    tallest = (eleHeight>tallest ? eleHeight : tallest); /* look up ternary operator if you dont know what this is */
  }
  for(i = 0; i < findClass.length; i++)
  {
    findClass[i].style.height = tallest + "px";
  }
}


//search movie
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    main.innerHTML ='';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI+searchItem+'&page=1');
        search.value ='';
    }
});
