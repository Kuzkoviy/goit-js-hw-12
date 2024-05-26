import{a as g,S as P,i as l}from"./assets/vendor-b0d10f48.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const E="24251933-9d29857377778e751e7f0d7a1",w="https://pixabay.com/api/",f=15;g.defaults.baseURL=w;const y=async(o,e=1)=>(await g.get("",{params:{key:E,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:f,page:e}})).data,L=o=>o.map(({webformatURL:e,largeImageURL:s,tags:r,likes:t,views:i,comments:c,downloads:S})=>`
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
            `).join(""),x=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),d=document.querySelector(".s-submit-btn"),a=document.querySelector(".js-loader"),n=document.querySelector(".js-load-more-btn");let h="",m=1,u=0;const v=new P("ul.list a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),q=async o=>{o.preventDefault(),p.innerHTML="",m=1,n.classList.add("is-hidden");const e=o.currentTarget;if(h=e.elements.searchKeyword.value.trim(),h===""){l.error({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"}),e.reset();return}try{d.classList.remove("is-disabled"),a.classList.remove("is-hidden");const{hits:s,totalHits:r}=await y(h,m);if(r===0){d.classList.add("is-disabled"),l.error({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"}),e.reset(),a.classList.add("is-hidden");return}p.insertAdjacentHTML("beforeend",L(s)),v.refresh(),a.classList.add("is-hidden"),d.classList.add("is-disabled"),u=Math.ceil(r/f),u>1&&n.classList.remove("is-hidden"),r<=15&&l.info({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3})}catch(s){d.classList.add("is-disabled"),a.classList.add("is-hidden"),l.error({message:"Search params is not valid!",position:"topRight"}),e.reset(),console.log("🚀 ~ onSearchFormSubmit ~ error:",s);return}e.reset()};x.addEventListener("submit",q);const M=()=>{const s=document.querySelector(".gallery__item:last-child").getBoundingClientRect().height*2;window.scrollBy({top:s,left:0,behavior:"smooth"})},b=async o=>{try{n.classList.add("is-hidden"),a.classList.remove("is-hidden"),m+=1;const{hits:e,totalHits:s}=await y(h,m);p.insertAdjacentHTML("beforeend",L(e)),v.refresh(),M(),a.classList.add("is-hidden"),u=Math.ceil(s/f),m<u?n.classList.remove("is-hidden"):n.removeEventListener("click",b),s<=15&&l.info({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3})}catch{d.classList.remove("is-disabled"),a.classList.add("is-hidden"),l.error({message:"Search params is not valid!",position:"topRight"});return}};n.addEventListener("click",b);
//# sourceMappingURL=commonHelpers.js.map
