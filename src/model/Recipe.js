import axios from 'axios';
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
            this.source = response.data.recipe.source_url;
            this.title = response.data.recipe.title;
            this.image = response.data.recipe.image_url;
        } catch (err) {
            alert(err + 'Recipe.js');
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

    changeUnits() {
        const longUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const shortUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(ingredient => {
            // Change UNITS to be same
            let el = ingredient.toLowerCase();
            longUnits.forEach((e, index) => {
                el = el.replace(e, shortUnits[index]);
            });
            el = el.replace(/ \([\s\S]*?\)/g, '');
            // console.log("​Recipe -> changeUnits -> el", el)
            // Now We have to extract Count i.e how many cups etc and Unit type from the String
            const arr = el.split(' '); // Split the string into array
            // Find the position of units in the array from shortUnits array
            const index = arr.findIndex(el2 => shortUnits.includes(el2));
            let finalObj;
            // Index contains the index of Unit (oz, tbsp tsp etc)
            if (index > -1) {
                // Unit is present somewhere in between
                // [1, 1/2, oz, of, spinach]
                const c = arr.slice(0, index);
                let count;
                if (c.length === 1) {
                    count = eval(arr[0].replace('-', '+'));
                } else {
                    count = eval(arr.slice(0, index).join('+'));
                }
                finalObj = {
                    count,
                    unit: arr[index],
                    ingredient: arr.slice(index + 1).join(' ')
                }
            } else if (parseInt(arr[0], 10)) { // First index mainly contains the unit count
                // If it does then
                finalObj = {
                    count: parseInt(arr[0]),
                    unit: '',
                    ingredient: arr.slice(1).join(' ')
                }
            } else if (index === -1) {
                finalObj = {
                    count: 1,
                    unit: '',
                    ingredient: el
                }
            }
            finalObj.count = Number(finalObj.count).toFixed(2);
            console.log("​Recipe -> changeUnits -> finalObj.count ", finalObj.count)
            return finalObj;
        });

        this.ingredients = newIngredients;
    }
}