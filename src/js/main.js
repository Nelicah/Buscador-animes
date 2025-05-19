"use strict";

const searchInput = document.querySelector(".js_searchInput");
const searchButton = document.querySelector(".js_searchButton");
const animeList = document.querySelector(".js_animeList");
//DATOS
let allAnimes = [];

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html de un anime
  const html = `<li>
      <img 
      src=${oneAnime.images.jpg.image_url}
      alt=${oneAnime.title}
      />
      <p> ${oneAnime.title} </p>
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
      console.log(data);
      allAnimes = data.data;
      renderAllAnimes();
    });
}
searchButton.addEventListener("click", handleClickSearchButton);
//EVENTOS

//Cuando carga la página
