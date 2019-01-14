import {
    elements
} from './elements';
export const getUserInput = () => elements.searchInput.value;
const truncateTitle = (title, limit = 17) => {
    const finalTitle = [];
    if (title.length > 17) {
        title.split(' ').reduce((count, el) => {
            if (count + el.length <= limit) {
                finalTitle.push(el);
            }
            return count + el.length;
        }, 0);

        return finalTitle.join(' ');
    }
    return title;
}
const render = (recipe) => {
    const markup = `
    <li>
        <a class="results__link" href="#23456">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.publisher}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${truncateTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.showRecipe.insertAdjacentHTML('beforeend', markup);
}
export const renderHTML = (recipes) => {
    recipes.forEach(render);
}

export const clearHTML = () => {
    elements.showRecipe.innerHTML = '';
}