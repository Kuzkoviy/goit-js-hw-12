import{a as y,S as P,i as n}from"./assets/vendor-b0d10f48.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const w="24251933-9d29857377778e751e7f0d7a1",x="https://pixabay.com/api/",g=15;y.defaults.baseURL=x;const L=async(o,e=1)=>(await y.get("",{params:{key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:e}})).data,v=o=>o.map(({webformatURL:e,largeImageURL:s,tags:r,likes:t,views:i,comments:c,downloads:S})=>`
            <li class="item-list gallery__item">
        <a href="${s}" class="item-list-link">
            <img class="item-list-img"  height="152"
            width="300" src="${e}" alt="${r}">
        </a>
        <div class='markup-info'>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Likes</h3>
                    <p class="item-list-text">${t}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Views</h3>
                    <p class="item-list-text">${i}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Comments</h3>
                    <p class="item-list-text">${c}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Downloads</h3>
                <p class="item-list-text">${S}</p>
            </div>
            </div>
            </li>
            `).join(""),E=document.querySelector(".js-search-form"),f=document.querySelector(".js-gallery"),d=document.querySelector(".s-submit-btn"),a=document.querySelector(".js-loader"),m=document.querySelector(".js-load-more-btn");let u="",h=1,p=0,l=0;const b=new P("ul.list a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),q=async o=>{o.preventDefault(),f.innerHTML="",h=1,m.classList.add("is-hidden");const e=o.currentTarget;if(u=e.elements.searchKeyword.value.trim(),u===""){n.error({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"}),e.reset();return}try{d.classList.remove("is-disabled"),a.classList.remove("is-hidden");const{hits:s,totalHits:r}=await L(u,h);if(l=l+s.length,r===0){d.classList.add("is-disabled"),n.error({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"}),e.reset(),a.classList.add("is-hidden");return}f.insertAdjacentHTML("beforeend",v(s)),b.refresh(),a.classList.add("is-hidden"),d.classList.add("is-disabled"),p=Math.ceil(r/g),p>1&&m.classList.remove("is-hidden"),r<=15&&n.info({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3})}catch(s){d.classList.add("is-disabled"),a.classList.add("is-hidden"),n.error({message:"Search params is not valid!",position:"topRight"}),e.reset(),console.log("🚀 ~ onSearchFormSubmit ~ error:",s);return}console.log(l),e.reset()};E.addEventListener("submit",q);const M=()=>{const s=document.querySelector(".gallery__item:last-child").getBoundingClientRect().height*2;window.scrollBy({top:s,left:0,behavior:"smooth"})},R=async o=>{try{m.classList.add("is-hidden"),a.classList.remove("is-hidden"),h+=1;const{hits:e,totalHits:s}=await L(u,h);l=l+e.length,f.insertAdjacentHTML("beforeend",v(e)),b.refresh(),M(),a.classList.add("is-hidden"),p=Math.ceil(s/g),h<p&&m.classList.remove("is-hidden"),console.log(l),l===s&&n.info({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3})}catch{d.classList.remove("is-disabled"),a.classList.add("is-hidden"),n.error({message:"Search params is not valid!",position:"topRight"});return}};m.addEventListener("click",R);
//# sourceMappingURL=commonHelpers.js.map
