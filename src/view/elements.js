export const elements = {
    search: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    showRecipe: document.querySelector('.results__list'),
    showRecipeDiv: document.querySelector('.results'),
    buttonPage: document.querySelector('.results__pages'),
    recipeView: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    addToCart: document.querySelector('.btn-small recipe__btn'),
    likeButton: document.querySelector('.recipe__love'),
    likeList: document.querySelector('.likes__list'),
    likeIcon: document.querySelector('.likes__field'),

}

const DOMStrings = {
    loader: 'loader'
}

export const showLoader = (parentElement) => {
    const markup = `
        <div class = "${DOMStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parentElement.insertAdjacentHTML('afterbegin', markup);
}

export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentNode.removeChild(loader);
    }
}