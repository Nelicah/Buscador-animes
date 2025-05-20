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
favTitle.appendChild(favContent);
favSection.appendChild(favTitle);

//DATOS
let allAnimes = [];

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html de un anime
  const html = `<li class="liAnime js-liAnime" >
      <img class="animePicture"
      src=${oneAnime.images.jpg.image_url}
      alt=${oneAnime.title}
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
          console.log(ev.currentTarget);
        });
      });
    });
}

//EVENTOS
searchButton.addEventListener("click", handleClickSearchButton);
//Cuando carga la página
