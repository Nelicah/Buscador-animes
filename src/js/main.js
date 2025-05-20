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

// creando las "x" para eliminar favoritos
const xImg = document.createElement("img");
xImg.src = "./images/marca-de-la-cruz.png";
xImg.alt = "cruz para eliminar favorito";

//DATOS
let allAnimes = [];
let favouritesAnimes = [];

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html de un anime
  const html = `<li class="liAnime js-liAnime" data-hook=${oneAnime.mal_id}>
      <img class="animePicture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p> - ${oneAnime.title_english} </p>
      <p> - ${oneAnime.title} </p>
    </li>`;
  return html;
}

function renderAllAnimes() {
  //renderizamos todos los animes que tengamos
  let html = "";

  for (const oneAnime of allAnimes) {
    html += renderOneAnime(oneAnime);
  }

  animeList.innerHTML = html;
}

function renderAllFavsAnimes(oneAnime) {
  //para renderizar los favs del LS
  let html = "";

  for (oneAnime of favouritesAnimes) {
    html += renderOneAnime(oneAnime);
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

          liClicked.classList.toggle("favourites");

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

            //añadir objeto al array de favoritos + al LS
            favouritesAnimes.push(clickedAnime);
            localStorage.setItem(
              "favourites",
              JSON.stringify(favouritesAnimes)
            );

            //generamos otro li a partir de esos datos y así renderizarlo en el html
            const htmlOneAnime = renderOneAnime(clickedAnime);

            //ponemos el li en  la lista de favoritos
            ulFavs.innerHTML += htmlOneAnime;

            //añadir la "x" para eliminar
            let htmlOneAnimeChild = ulFavs.lastElementChild;
            htmlOneAnimeChild.appendChild(xImg);
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
