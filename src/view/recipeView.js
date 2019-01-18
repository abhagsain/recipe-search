import {
    elements
} from "../view/elements";
import {
    Fraction
} from "fractional";
const createIngredient = ingredient => `
<li class="recipe__item">
<svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
</svg>
<div class="recipe__count">${convertCount(ingredient.count)}</div>
<div class="recipe__ingredient">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.ingredient}
</div>
</li>
`;
const convertCount = count => {
    // 2.5 -> 2 1/2
    // 0.5 -> 1/2
    // Split the number to into arr;
    if (count) {
        const [int, dec] = count.toString().split(".").map(el => parseInt(el));
        if (!dec) return count;
        if (int === 0) {
            // int = 0 and count = 0.5
            const num = new Fraction(count);
            return `${num.numerator}/${num.denominator}`;
        } else {
            // 2.5, count - int = 0.5
            const num = new Fraction(count - int); // 0.5 === 1/2
            return `${int} ${num.numerator}/${num.denominator}`;
        }
    }
    return "1";
};
export const recipeView = (recipe, isLiked = false) => {
    const recipeMarkup = `
        <figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.totalTime
            }</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn_decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny   btn_increase">
                    <svg>   
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>
        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#${isLiked ? "icon-heart" : "icon-heart-outlined"}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ingredient => createIngredient(ingredient))
          .join("")}
        </ul>

        <button class="btn-small recipe__btn-add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${
              recipe.publisher
            }</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${
          recipe.source
        }" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    elements.recipeView.insertAdjacentHTML("afterbegin", recipeMarkup);
};

export const updateIngredients = (recipe) => {
    if (recipe) {
        document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
        const ingredientElements = Array.from(document.querySelectorAll(".recipe__count"));
        ingredientElements.forEach((el, i) => {
            el.textContent = convertCount(recipe.ingredients[i].count);
        })
    }
}