export const elements = {
    search: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    showRecipe: document.querySelector('.results__list'),
    showRecipeDiv: document.querySelector('.results'),
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
    loader.parentNode.removeChild(loader);
}