import {
    elements
} from '../view/elements';
export const showMessage = (message) => {
    const errorMarkup = `
    <h3 style="text-align: center; color: coral; margin: auto;  padding:3px; font-size:29px;"
    id="error">${message}</h3>`;
    elements.recipeView.innerHTML = '';
    elements.recipeView.insertAdjacentHTML('afterbegin', errorMarkup);
}