import Search from "../model/Search";
// import Recipe from '../model/Recipe'
import * as recipeView from '../view/recipeView';
import {
  elements,
  showLoader,
  removeLoader
} from "../view/elements";
import * as searchView from "../view/searchView";
import Recipe from "../model/Recipe";
// Create a Global state object which will store different states
var state = {};
var x; //?

const search = async () => {
  // Get the query from the user
  const query = searchView.getUserInput();
  if (query.length > 0) {
    // Add the state to the global state object
    state.search = new Search(query);
    // Prepare UI for results
    elements.searchInput.value = "";

    // Clear UI first
    searchView.clearHTML();
    try {

      // Show the loading icon
      showLoader(elements.showRecipeDiv);
      // Get the data
      await state.search.getData();
      // Removes the loading animation
      removeLoader();

      // Render data to UI  
      if (state.search) {
        searchView.renderHTML(state.search.result);
      } else {
        alert(err + 'Index.js');
      }
    } catch (err) {
      console.log("​Index.js -> catch -> err", err)
    }
  }
};
elements.search.addEventListener("submit", function (e) {
  e.preventDefault();
  search();
});

elements.buttonPage.addEventListener('click', (e) => {
  const button = e.target.closest('.btn-inline');
  if (button) {
    const whichPage = parseInt(button.dataset.goto, 10);
    searchView.clearHTML();
    searchView.renderHTML(state.search.result, whichPage);
  }
});


const controlRecipe = async () => {
  // Get the hash from the URL 
  const hash = window.location.hash.replace('#', '');
  // If the Hash exists then 
  // HASH === Recipe ID
  // console.log("​controlRecipe -> hash", hash)
  if (hash) {
    state.recipe = new Recipe(hash);
    try {
      elements.recipeView.innerHTML = '';
      showLoader(elements.recipeView);
      await state.recipe.getRecipeData();
      state.recipe.calculateTime();
      state.recipe.calculateServings();
      state.recipe.changeUnits();
      recipeView.recipeView(state.recipe); //Render the recipe on the UI
      removeLoader();

    } catch (err) {
      alert(err + 'Index.js');
    }
  }
  //  Get the data from the API corresponding to the ID
  // Otherwise do nothing
}

['hashchange', 'load'].forEach(type => window.addEventListener(type, controlRecipe));