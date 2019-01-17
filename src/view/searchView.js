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

    // Pagination 
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


    /*
        recipeView -> recipe 
        Recipe {id: "47032", ingredients: Array(13), publisher: "The Pioneer Woman", source: "http://thepioneerwoman.com/cooking/2011/04/16-minute-meal-shrimp-scampi/", title: "Shrimp Scampi", …}
        id: "47032"
        image: "http://static.food2fork.com/scampibf5a.jpg"
        ingredients: Array(13)
        0: {count: 4, unit: "tbsp", ingredient: "butter"}
        1: {count: 2, unit: "tbsp", ingredient: "olive oil"}
        2: {count: 1, unit: "", ingredient: "whole medium onion, finely diced"}
        3: {count: 4, unit: "", ingredient: "cloves garlic cloves, minced or pressed"}
        4: {count: 1, unit: "pound", ingredient: "large shrimp, peeled and deveined"}
        5: {count: 0.5, unit: "cup", ingredient: "white wine"}
        6: {count: 2, unit: "", ingredient: "whole lemons"}
        7: {count: 4, unit: "", ingredient: "dashes hot sauce"}
        8: {count: 1, unit: "", ingredient: "salt and freshly ground black pepper, to taste"}
        9: {count: 8, unit: "", ingredient: "oz, weight angel hair pasta"}
        10: {count: 1, unit: "", ingredient: "chopped fresh basil to taste"}
        11: {count: 1, unit: "", ingredient: "chopped fresh parsley, to taste"}
        12: {count: 0.5, unit: "cup", ingredient: "grated parmesan cheese"}
        length: 13
        __proto__: Array(0)
        publisher: "The Pioneer Woman"
        servings: 4
        source: "http://thepioneerwoman.com/cooking/2011/04/16-minute-meal-shrimp-scampi/"
        title: "Shrimp Scampi"
        totalTime: 75
        __proto__: Object
    */