import {
    elements
} from '../view/elements';
import {
    truncateTitle
} from '../view/searchView';
export const renderLikedItem = (item) => {
    // Send the like item take out 
    // We need image url and title of the item
    console.log('renderLikedItem -> called');
    console.log(item);
    const markup = `
    <li>
    <a class="likes__link" href="#${item.id}"
    data-likeid="${item.id}">
        <figure class="likes__fig">
            <img src="${item.image}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${truncateTitle(item.title)}</h4>
            <p class="likes__author">${item.publisher}</p>
        </div>
    </a>
</li>   
    `;
    elements.likeList.insertAdjacentHTML('beforeend', markup);
}

export const showHideIcon = (totalLikes) => {
    elements.likeIcon.style.visibility = totalLikes >= 1 ? 'visible' : 'hidden';
}

export const removeLikedItem = (id) => {
    // remove the element from the UI using ID
    // const item = document.querySelector(`[data-likeid="${id}"]`);
    const item = document.querySelector(`[href*="${id}"]`);

    console.log("​removeLikedItem -> item", item)

    item.parentElement.removeChild(item);
}

export const toggleLikeButton = (Like) => {
    const string = Like ? 'icon-heart' : 'icon-heart-outlined';
    // img/icons.svg#
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${string}`);
}