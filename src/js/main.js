"use strict";

const searchInput = document.querySelector(".js_searchInput");
const serachButton = document.querySelector(".js_seachButton");
const animeList = document.querySelector(".js_animeList");
//DATOS

const oneAnime = {
  title: "Naruto",
  image: "https://cdn.myanimelist.net/images/anime/1141/142503.jpg",
  alt: "Naruto",
};

//FUNCIONES
function renderOneAnime(oneAnime) {
  //renderizamos desde JS el html
  const html = `<li>
      <img 
      src=${oneAnime.image}
      alt=${oneAnime.alt}
      />
      <p> ${oneAnime.title} </p>
    </li>`;

  animeList.innerHTML += html;
}
renderOneAnime(oneAnime);
