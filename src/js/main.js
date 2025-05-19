"use strict";

const searchInput = document.querySelector(".js_searchInput");
const serachButton = document.querySelector(".js_seachButton");
const animeList = document.querySelector(".js_animeList");
//DATOS

const allAnimes = [
  {
    title: "Naruto",
    image: "https://cdn.myanimelist.net/images/anime/1141/142503.jpg",
    alt: "Naruto",
  },
  {
    title: "un anime",
    image: "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",
    alt: "un anime",
  },
];

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html de un anime
  const html = `<li>
      <img 
      src=${oneAnime.image}
      alt=${oneAnime.alt}
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

//Cuando carga la página
renderAllAnimes();
