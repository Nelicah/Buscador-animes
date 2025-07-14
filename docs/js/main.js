const r=document.querySelector(".js_searchInput"),j=document.querySelector(".js_searchButton"),S=document.querySelector(".js_animeList"),I=document.querySelector(".js_resultTitle"),h=document.querySelector(".js_favSection"),L=document.querySelector(".js_resetButton"),y=document.createTextNode("Resultados");I.appendChild(y);const f=document.createElement("h2"),C=document.createTextNode("Series Favoritas"),o=document.createElement("ul");f.appendChild(C);h.appendChild(f);h.appendChild(o);let d=[],i=[];function T(t){const e=i.findIndex(l=>l.mal_id===t.mal_id);return t.title_english===null?`<li class="li-anime js_liAnime" data-hook=${t.mal_id}>
      <img class="anime-picture" 
      src=${t.images.jpg.image_url}
      alt="${t.title}"
      />
      <p class="p1"> - ${t.title} </p>
      <p class="p2"> - ${t.title} </p>
    </li>`:t.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?`<li class="li-anime js_liAnime" data-hook=${t.mal_id}>
      <img class="anime-picture" 
      src="https://placehold.co/210x300/ffffff/555555?text=TV"
      alt="${t.title}"
      />
      <p class="p1"> - ${t.title_english} </p>
      <p class="p2"> - ${t.title} </p>
    </li>`:e===-1?`<li class="li-anime js_liAnime" data-hook=${t.mal_id}>
      <img class="anime-picture" 
      src=${t.images.jpg.image_url}
      alt="${t.title}"
      />
      <p class="p1"> - ${t.title_english} </p>
      <p class="p2"> - ${t.title} </p>
    </li>`:`<li class="li-anime js_liAnime favourites" data-hook=${t.mal_id}>
      <img class="anime-picture" 
      src=${t.images.jpg.image_url}
      alt="${t.title}"
      />
      <p class="p1"> - ${t.title_english} </p>
      <p class="p2"> - ${t.title} </p>
    </li>`}function g(){let t="";for(const e of d)t+=T(e);S.innerHTML=t}function _(t){return`<li class="li-anime2 js_liAnime" data-hook=${t.mal_id}>
      <img class="anime-picture2" 
      src=${t.images.jpg.image_url}
      alt="${t.title}"
      />
      <p class="p2-fav"> - ${t.title} </p>
      <img class="delete js_deleteImg" data-hook=${t.mal_id} src="./images/marca-de-la-cruz.png" alt="cruz para eliminar favorito" />
    </li>`}function m(t){let e="";for(t of i)e+=_(t);o.innerHTML=e,u()}function E(t){return fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(e=>e.json()).then(e=>e.data)}function F(){document.querySelectorAll(".js_liAnime").forEach(e=>{e.addEventListener("click",l=>{const n=l.currentTarget;n.classList.toggle("favourites");const c=n.dataset.hook,a=i.findIndex(s=>s.mal_id===parseInt(c));if(a===-1){const s=d.find(k=>k.mal_id===parseInt(c));i.push(s),localStorage.setItem("favourites",JSON.stringify(i));const $=_(s);o.innerHTML+=$,u()}else i.splice(a,1),m()})})}function v(t){t.preventDefault();const e=r.value.trim();E(e).then(l=>{d=l,g(),F()})}function q(){i=[],r.value="",localStorage.removeItem("favourites"),g(),location.reload()}j.addEventListener("click",v);L.addEventListener("click",q);r.addEventListener("keydown",t=>{t.key==="Enter"&&v(t)});const p=JSON.parse(localStorage.getItem("favourites"));p!==null&&(i=p,m());function u(){document.querySelectorAll(".js_deleteImg").forEach(e=>{e.addEventListener("click",l=>{const c=l.currentTarget.dataset.hook,a=i.findIndex(s=>s.mal_id===parseInt(c));a!==-1&&(i.splice(a,1),localStorage.setItem("favourites",JSON.stringify(i)),m(),u())})})}
//# sourceMappingURL=main.js.map
