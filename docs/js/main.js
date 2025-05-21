const h=document.querySelector(".js_searchInput"),I=document.querySelector(".js_searchButton"),L=document.querySelector(".js_animeList"),y=document.querySelector(".js_resultTitle"),g=document.querySelector(".js_favSection"),C=document.querySelector(".js_resetButton"),T=document.createTextNode("Resultados");y.appendChild(T);const _=document.createElement("h2"),F=document.createTextNode("Series Favoritas"),r=document.createElement("ul");_.appendChild(F);g.appendChild(_);g.appendChild(r);let o=[],l=[];function q(e){const t=l.findIndex(i=>i.mal_id===e.mal_id);return e.images.jpg.image_url==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"?`<li class="li-anime js_liAnime" data-hook=${e.mal_id}>
      <img class="anime-picture" 
      src="https://placehold.co/210x300/ffffff/555555?text=TV"
      alt="${e.title}"
      />
      <p class="p1"> - ${e.title_english} </p>
      <p class="p2"> - ${e.title} </p>
    </li>`:t===-1?`<li class="li-anime js_liAnime" data-hook=${e.mal_id}>
      <img class="anime-picture" 
      src=${e.images.jpg.image_url}
      alt="${e.title}"
      />
      <p class="p1"> - ${e.title_english} </p>
      <p class="p2"> - ${e.title} </p>
    </li>`:`<li class="li-anime js_liAnime favourites" data-hook=${e.mal_id}>
      <img class="anime-picture" 
      src=${e.images.jpg.image_url}
      alt="${e.title}"
      />
      <p class="p1"> - ${e.title_english} </p>
      <p class="p2"> - ${e.title} </p>
    </li>`}function v(){let e="";for(const t of o)e+=q(t);L.innerHTML=e}function k(e){return`<li class="li-anime2 js_liAnime" data-hook=${e.mal_id}>
      <img class="anime-picture2" 
      src=${e.images.jpg.image_url}
      alt="${e.title}"
      />
      <p class="p2-fav"> - ${e.title} </p>
      <img class="delete js_deleteImg" data-hook=${e.mal_id} src="./images/marca-de-la-cruz.png" alt="cruz para eliminar favorito" />
    </li>`}function d(e){let t="";for(e of l)t+=k(e);r.innerHTML=t,m()}function E(e){e.preventDefault();const t=h.value;fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(i=>i.json()).then(i=>{o=i.data,v(),document.querySelectorAll(".js_liAnime").forEach(c=>{c.addEventListener("click",s=>{const a=s.currentTarget;a.classList.toggle("favourites");const u=a.dataset.hook,p=l.findIndex(n=>n.mal_id===parseInt(u));if(p===-1){const n=o.find(j=>j.mal_id===parseInt(u));l.push(n),localStorage.setItem("favourites",JSON.stringify(l));const $=k(n);r.innerHTML+=$,m()}else l.splice(p,1),d()})})})}function x(){l=[],h.value="",localStorage.removeItem("favourites"),v(),location.reload()}I.addEventListener("click",E);C.addEventListener("click",x);const f=JSON.parse(localStorage.getItem("favourites"));f!==null&&(l=f,d());function m(){document.querySelectorAll(".js_deleteImg").forEach(t=>{t.addEventListener("click",i=>{const c=i.currentTarget.dataset.hook,s=l.findIndex(a=>a.mal_id===parseInt(c));s!==-1&&(l.splice(s,1),localStorage.setItem("favourites",JSON.stringify(l)),d(),m())})})}
//# sourceMappingURL=main.js.map
