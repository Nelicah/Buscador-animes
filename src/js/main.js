"use strict";

const searchInput = document.querySelector(".js_searchInput");
const searchButton = document.querySelector(".js_searchButton");
const animeList = document.querySelector(".js_animeList");
const resultTitle = document.querySelector(".js-resultTitle");
const favSection = document.querySelector(".js-favSection");

// añadiendo texto al h2
const resultContent = document.createTextNode("Resultados");
resultTitle.appendChild(resultContent);

// creando sección de los favoritos
const favTitle = document.createElement("h2");
const favContent = document.createTextNode("Series Favoritas");
const ulFavs = document.createElement("ul");
favTitle.appendChild(favContent);
favSection.appendChild(favTitle);
favSection.appendChild(ulFavs);

//DATOS
let allAnimes = [];
let favouritesAnimes = [];

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html de un anime
  //modificado para que aparezca "marcado" si está en fav

  const oneAnimePositionFromFavs = favouritesAnimes.findIndex(
    (oneAnimeFav) => oneAnimeFav.mal_id === oneAnime.mal_id
  );

  if (oneAnimePositionFromFavs === -1) {
    const html = `<li class="liAnime js-liAnime" data-hook=${oneAnime.mal_id}>
      <img class="animePicture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p> - ${oneAnime.title_english} </p>
      <p> - ${oneAnime.title} </p>
    </li>`;
    return html;
  } else {
    const html = `<li class="liAnime js-liAnime favourites" data-hook=${oneAnime.mal_id}>
      <img class="animePicture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p> - ${oneAnime.title_english} </p>
      <p> - ${oneAnime.title} </p>
    </li>`;
    return html;
  }
}

function renderAllAnimes() {
  //renderizamos todos los animes que tengamos
  let html = "";

  for (const oneAnime of allAnimes) {
    html += renderOneAnime(oneAnime);
  }

  animeList.innerHTML = html;
}

function renderOneAnimeFav(oneAnime) {
  //renderizamos desde JS el html de un anime fav para así poder guardarlo con la img "x"
  const html = `<li class="liAnime js-liAnime" data-hook=${oneAnime.mal_id}>
      <img class="animePicture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p> - ${oneAnime.title_english} </p>
      <p> - ${oneAnime.title} </p>
      <img class="delete" src="./images/marca-de-la-cruz.png" alt="cruz para eliminar favorito" />
    </li>`;
  return html;
}

function renderAllFavsAnimes(oneAnime) {
  //para renderizar los favs del LS
  let html = "";

  for (oneAnime of favouritesAnimes) {
    html += renderOneAnimeFav(oneAnime);
  }

  ulFavs.innerHTML = html;
}

function handleClickSearchButton(ev) {
  ev.preventDefault();
  const anime = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${anime}`)
    .then((response) => response.json())
    .then((data) => {
      allAnimes = data.data;
      renderAllAnimes();

      const liAnime = document.querySelectorAll(".js-liAnime");

      liAnime.forEach((liItems) => {
        liItems.addEventListener("click", (ev) => {
          const liClicked = ev.currentTarget;

          liClicked.classList.add("favourites");

          // obtenemos el objeto del "li" que hemos hecho click
          const id_hook = liClicked.dataset.hook;

          //averiguamos si es favorita
          const oneAnimePositionFromFavs = favouritesAnimes.findIndex(
            (oneAnime) => oneAnime.mal_id === parseInt(id_hook)
          );

          //añadimos a fav el anime sólo si no está en la lista (evitamos duplicidad)
          if (oneAnimePositionFromFavs === -1) {
            const clickedAnime = allAnimes.find(
              (oneAnime) => oneAnime.mal_id === parseInt(id_hook)
            );
            console.log(clickedAnime);

            //añadir objeto al array de favoritos + al LS
            favouritesAnimes.push(clickedAnime);
            localStorage.setItem(
              "favourites",
              JSON.stringify(favouritesAnimes)
            );

            //generamos otro li a partir de esos datos y así renderizarlo en el html
            const htmlOneAnime = renderOneAnimeFav(clickedAnime);

            //ponemos el li en  la lista de favoritos
            ulFavs.innerHTML += htmlOneAnime;
          } else {
            //Quitar de favoritos
            favouritesAnimes.splice(oneAnimePositionFromFavs, 1);
            renderAllFavsAnimes();
          }
        });
      });
    });
}

//EVENTOS
searchButton.addEventListener("click", handleClickSearchButton);

//Cuando carga la página
const favsFromLS = JSON.parse(localStorage.getItem("favourites"));
if (favsFromLS !== null) {
  favouritesAnimes = favsFromLS;
  renderAllFavsAnimes();
}
