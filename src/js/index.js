import Search from "../model/Search";
// import Recipe from '../model/Recipe'
import * as recipeView from '../view/recipeView';
import {
  elements,
  showLoader,
  removeLoader
} from "../view/elements";
import {
  Shopping
} from '../model/ShoppingList';
import * as searchView from "../view/searchView";
import Recipe from "../model/Recipe";
import * as shoppingList from '../view/shoppingListView';
// Create a Global state object which will store different states
var state = {};
var x; //?

const showListItems = () => {
  // This method will be called when the add to shopping list item is clicked

  // Add selected item from state.recipe to the shoppingListView
  if (!state.shoppingList) {
    state.shoppingList = new Shopping();
  }
  // Loop over the selected items state.recipe and then add each ingredient to the shopping list
  state.recipe.ingredients.forEach(el => {
    const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
    shoppingList.renderItem(item);
  });


}

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
        console.log("​Index.js -> search -> catch -> err", err)
      
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
  if (hash && state.search) {
    console.log("State", state);
    state.recipe = new Recipe(hash);
    try {
      elements.recipeView.innerHTML = '';
      showLoader(elements.recipeView);
      await state.recipe.getRecipeData();
      state.recipe.calculateTime();
      state.recipe.calculateServings();
      state.recipe.changeUnits();
      if (state.recipe) searchView.changeSelectedItemColor(hash);
      console.log("​controlRecipe -> state.recipe", state.recipe)
      recipeView.recipeView(state.recipe); //Render the recipe on the UI
      removeLoader();

    } catch (err) {
      console.log(err);
      console.log("​Index.js -> controlRecipe -> catch -> err", err)

    }
  }
  //  Get the data from the API corresponding to the ID
  // Otherwise do nothing
}

['hashchange', 'load'].forEach(type => window.addEventListener(type, controlRecipe));
elements.recipeView.addEventListener('click', (e) => {
  if (e.target.matches('.btn_decrease, .btn_decrease *')) {
    // Decrease
    if (state.recipe.servings > 1) {
      console.log("​state.recipe.servings", state.recipe.servings)
      state.recipe.updateServings('dec');
      recipeView.updateIngredients(state.recipe);
    }


  } else if (e.target.matches('.btn_increase, .btn_increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
    // If this events gets fired that means the user has clicked
    showListItems();
  }
});