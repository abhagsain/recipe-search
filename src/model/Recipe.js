import axios from 'axios'
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipeData() {
        try {
            console.log('Recipe -> this.id', this.id);
            const response = await axios(`https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${this.id}`);
            this.ingredients = response.data.recipe.ingredients;
            this.publisher = response.data.recipe.publisher;
            // this.source = response.data.recipe.source_url;
            this.title = response.data.recipe.title;
            this.image = response.data.recipe.image_url;
        } catch (err) {
            alert(err);
        }
    }

    calculateTime() {
        // Assuming it takes 15 minutes to cook a recipe 
        // of 3 ingredients
        const ing = Math.ceil(this.ingredients.length / 3);
        const totalTime = ing * 15;
        this.totalTime = totalTime;
    }

    calculateServings() {
        this.servings = 4;
    }
}