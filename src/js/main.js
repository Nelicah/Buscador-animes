"use strict";

const searchInput = document.querySelector(".js_searchInput");
const searchButton = document.querySelector(".js_searchButton");
const animeList = document.querySelector(".js_animeList");
const resultTitle = document.querySelector(".js_resultTitle");
const favSection = document.querySelector(".js_favSection");
const resetButton = document.querySelector(".js_resetButton");

// añadiendo texto al h2 de la búsqueda
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
  const oneAnimePositionFromFavs = favouritesAnimes.findIndex(
    (oneAnimeFav) => oneAnimeFav.mal_id === oneAnime.mal_id
  );

  if (
    oneAnime.images.jpg.image_url ===
    "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
  ) {
    const html = `<li class="li-anime js_liAnime" data-hook=${oneAnime.mal_id}>
      <img class="anime-picture" 
      src="https://placehold.co/210x300/ffffff/555555?text=TV"
      alt="${oneAnime.title}"
      />
      <p class="p1"> - ${oneAnime.title_english} </p>
      <p class="p2"> - ${oneAnime.title} </p>
    </li>`;
    return html;
  } else if (oneAnimePositionFromFavs === -1) {
    const html = `<li class="li-anime js_liAnime" data-hook=${oneAnime.mal_id}>
      <img class="anime-picture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p class="p1"> - ${oneAnime.title_english} </p>
      <p class="p2"> - ${oneAnime.title} </p>
    </li>`;
    return html;
  } else {
    const html = `<li class="li-anime js_liAnime favourites" data-hook=${oneAnime.mal_id}>
      <img class="anime-picture" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p class="p1"> - ${oneAnime.title_english} </p>
      <p class="p2"> - ${oneAnime.title} </p>
    </li>`;
    return html;
  }
}

function renderAllAnimes() {
  let html = "";

  for (const oneAnime of allAnimes) {
    html += renderOneAnime(oneAnime);
  }

  animeList.innerHTML = html;
}

function renderOneAnimeFav(oneAnime) {
  //para icono "x"
  const html = `<li class="li-anime2 js_liAnime" data-hook=${oneAnime.mal_id}>
      <img class="anime-picture2" 
      src=${oneAnime.images.jpg.image_url}
      alt="${oneAnime.title}"
      />
      <p class="p2-fav"> - ${oneAnime.title} </p>
      <img class="delete js_deleteImg" data-hook=${oneAnime.mal_id} src="./images/marca-de-la-cruz.png" alt="cruz para eliminar favorito" />
    </li>`;
  return html;
}

function renderAllFavsAnimes(oneAnime) {
  let html = "";

  for (oneAnime of favouritesAnimes) {
    html += renderOneAnimeFav(oneAnime);
  }

  ulFavs.innerHTML = html;

  addDeleteListeners();
}

//comienzo función de búsqueda
function handleClickSearchButton(ev) {
  ev.preventDefault();
  const anime = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${anime}`)
    .then((response) => response.json())
    .then((data) => {
      allAnimes = data.data;
      renderAllAnimes();

      const liAnime = document.querySelectorAll(".js_liAnime");

      liAnime.forEach((liItems) => {
        liItems.addEventListener("click", (ev) => {
          const liClicked = ev.currentTarget;
          liClicked.classList.toggle("favourites");

          const id_hook = liClicked.dataset.hook;
          const oneAnimePositionFromFavs = favouritesAnimes.findIndex(
            (oneAnime) => oneAnime.mal_id === parseInt(id_hook)
          );

          //evitamos duplicidad
          if (oneAnimePositionFromFavs === -1) {
            const clickedAnime = allAnimes.find(
              (oneAnime) => oneAnime.mal_id === parseInt(id_hook)
            );
            favouritesAnimes.push(clickedAnime);
            localStorage.setItem(
              "favourites",
              JSON.stringify(favouritesAnimes)
            );

            const htmlOneAnime = renderOneAnimeFav(clickedAnime);
            ulFavs.innerHTML += htmlOneAnime;
            addDeleteListeners(); //para que funcione eliminar favs desde la X
          } else {
            favouritesAnimes.splice(oneAnimePositionFromFavs, 1);
            renderAllFavsAnimes();
          }
        });
      });
    });
}
//fin función búsqueda

function handleClickResetButton() {
  favouritesAnimes = [];
  searchInput.value = "";
  localStorage.removeItem("favourites");
  renderAllAnimes();
  location.reload(); // recarga la página
}

//EVENTOS
searchButton.addEventListener("click", handleClickSearchButton);
resetButton.addEventListener("click", handleClickResetButton);

//CUANDO CARGA LA PÁGINA
const favsFromLS = JSON.parse(localStorage.getItem("favourites"));
if (favsFromLS !== null) {
  favouritesAnimes = favsFromLS;
  renderAllFavsAnimes();
}

function addDeleteListeners() {
  const allDeleteImg = document.querySelectorAll(".js_deleteImg");
  allDeleteImg.forEach((deleteItem) => {
    deleteItem.addEventListener("click", (ev) => {
      const deleteClicked = ev.currentTarget;
      const idDelete_hook = deleteClicked.dataset.hook;
      const animeForDelete = favouritesAnimes.findIndex(
        (oneAnimeFav) => oneAnimeFav.mal_id === parseInt(idDelete_hook)
      );
      if (animeForDelete !== -1) {
        favouritesAnimes.splice(animeForDelete, 1);
        //actualizamos el LS
        localStorage.setItem("favourites", JSON.stringify(favouritesAnimes));
        renderAllFavsAnimes();
        addDeleteListeners();
      }
    });
  });
}
