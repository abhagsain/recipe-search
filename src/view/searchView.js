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
    console.log("​render -> recipe", recipe.recipe_id)
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
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

const createButton = (page, type) => // page -> on which page are we?
    // type = next or prev
    `  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;
const renderButton = (page, totalResults, resultsPerPage) => {
    // Find the number of pages by dividing 
    // Total results by result per page
    let button;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    if (page === 1 && totalPages > 1) {
        // We're on the first page  
        button = createButton(page, 'next');
    } else if (page < totalPages && totalPages > 1) {
        button = `${createButton(page, 'prev')}
                ${createButton(page, 'next')}`;
        //  We're in the middle somewhere
    } else if (page === totalPages) {
        // We're at  the last page.
        button = createButton(page, 'prev');
    }
    if (totalPages > 1)
        elements.buttonPage.insertAdjacentHTML('afterbegin', button);
}
export const renderHTML = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(render);

    renderButton(page, recipes.length, resultsPerPage);
}

export const clearHTML = () => {
    elements.showRecipe.innerHTML = '';
    elements.buttonPage.innerHTML = '';
}