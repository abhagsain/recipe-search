import Search from '../model/Search'
const recipe = new Search('pizza');
import {
    elements,
    showLoader,
    removeLoader
} from '../view/elements'
import * as searchView from '../view/searchView'
// Create a Global state object which will store different states
var state = {};

const search = async () => {
    // Get the query from the user
    const query = searchView.getUserInput();
    if (query.length > 0) {

        // Add the state to the global state object
        state.search = new Search(query);
        // Prepare UI for results
        elements.searchInput.value = '';

        // Clear UI first 
        searchView.clearHTML();

        // Show the loading icon 
        showLoader(elements.showRecipeDiv);
        // Get the data
        await state.search.getData();

        removeLoader();
        // Search the recipes
        searchView.renderHTML(state.search.result);
    }
    // Render data to UI
}
elements.search.addEventListener('submit', function (e) {
    e.preventDefault();
    search();
});