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
import {
  Likes
} from '../model/Likes';
import * as likeView from '../view/likesView';
// Create a Global state object which will store different states
var state = {};
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
elements.shoppingList.addEventListener('click', (e) => {
  // Our items lies in the ul so we need to find out which element was cliced using event delegation
  // get the cliced item ID
  let ID = e.target.closest('.shopping__item');
  if (ID) {

    ID = ID.dataset.itemid;
  }
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // If the click has happened on the cross then delete item from the 
    // state.shoppingList
    state.shoppingList.deleteItem(ID);
    // from the UI
    shoppingList.deleteItem(ID);
  } else if (e.target.matches('.shopping__count_value')) {
    // Whenever user click on the up and down arrow to update the count method we parrallely need to update the state.count value

    // Read the value fr  om the UI
    const value = parseFloat(e.target.value);
    if (value) {
      // Update the state.shoppingList.count
      state.shoppingList.updateCount(ID, value);

    }
  }

})

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

const likeControl = () => {

  console.log("​likeControl -> likeControl -> Called");
  if (!state.likes) {
    // Likes object
    state.likes = new Likes();
  }
  // Get the selected item from the state.recipe
  const pickedItem = state.recipe;
  if (!state.likes.isLiked(pickedItem.id)) {
    // if the current shown item is not yet liked then like it 
    const item = state.likes.addLikeItem(pickedItem.id, pickedItem.title, pickedItem.image, pickedItem.publisher);
    likeView.toggleLikeButton(true);
    likeView.showHideIcon(state.likes.getTotalLikes());
    // Render the added item to the UI
    likeView.renderLikedItem(item);

  } else {
    // If the is already like then user might want to unlike it 
    // So remove it from the state.like
    state.likes.deleteLikedItem(pickedItem.id);
    likeView.toggleLikeButton(false);
    likeView.removeLikedItem(pickedItem.id);
    likeView.showHideIcon(state.likes.getTotalLikes());
  }
}

window.addEventListener('load', () => {
  // Load data from local storage and add that into the state.likes object
  state.likes = new Likes(); //Create an empty object
  state.likes.readData();
  likeView.showHideIcon(state.likes.getTotalLikes());
  state.likes.likes.forEach(like => {
    // Render each like into the UI
    likeView.renderLikedItem(like);
  });
  // elements.likeList
  console.log("​elements.likeList", elements.likeList)
  const nodes = Array.from(document.querySelectorAll('.likes__link'));
  console.log(nodes);
  if (nodes) {
    console.log("​nodes", nodes)
    nodes.forEach(el => {
      console.log('el -> ', el);
      el.classList.remove('results__link--active');
    });
  }
})

const controlRecipe = async () => {
  // Get the hash from the URL 

  const hash = window.location.hash.replace('#', '');
  // If the Hash exists then 
  // HASH === Recipe ID
  // console.log("​controlRecipe -> hash", hash)
  if (hash) {
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
      if (state.likes) {
        recipeView.recipeView(state.recipe, state.likes.isLiked(hash)); //Render the recipe on the UI
      } else {
        recipeView.recipeView(state.recipe);
      }
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
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // If the user has clicked on the like button 
    // then 
    likeControl();
  }
});