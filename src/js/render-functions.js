



export const createMarkupItem = images => {
    
    return images.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => { return`
            <li class="item-list gallery__item">
        <a href="${largeImageURL}" class="item-list-link">
            <img class="item-list-img"  height="152"
            width="300" src="${webformatURL}" alt="${tags}">
        </a>
        <div class='markup-info'>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Likes</h3>
                    <p class="item-list-text">${likes}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Views</h3>
                    <p class="item-list-text">${views}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Comments</h3>
                    <p class="item-list-text">${comments}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Downloads</h3>
                <p class="item-list-text">${downloads}</p>
            </div>
            </div>
            </li>
            `
            }).join("");
        
        };