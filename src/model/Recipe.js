import axios from "axios";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipeData() {
    try {
      console.log("Recipe -> this.id", this.id);
      const response = await axios(
        `https://www.food2fork.com/api/get?key=${process.env.API_KEY}&rId=${
          this.id
        }`
      );
      if (response.data.error.toString() !== 'limit') {

        this.ingredients = response.data.recipe.ingredients;
        this.publisher = response.data.recipe.publisher;
        this.source = response.data.recipe.source_url;
        this.title = response.data.recipe.title;
        this.image = response.data.recipe.image_url;
      } else {
        throw 'API limit reached! Only 50 calls are allowed in one day';
      }
    } catch (err) {
      throw err;
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
    const longUnits = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const shortUnits = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];
    const newIngredients = this.ingredients.map(ingredient => {
      // Change UNITS to be same
      let el = ingredient.toLowerCase();
      longUnits.forEach((e, index) => {
        el = el.replace(e, shortUnits[index]);
      });
      el = el.replace(/[()]/g, "");
      // // // console.log("​Recipe -> changeUnits -> el", el)
      // Now We have to extract Count i.e how many cups etc and Unit type from the String
      const arr = el.split(" "); // Split the string into array
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
          count = eval(arr[0].replace("-", "+"));
        } else if (parseInt(c[0], 10)) {
          count = eval(parseInt(c[0], 10));
        } else if (parseInt(c[1], 10)) {
          count = eval(parseInt(c[1], 10));
        } else {
          count = eval(arr.slice(0, index).join("+"));
        }
        finalObj = {
          count,
          unit: arr[index],
          ingredient: arr.slice(index + 1).join(" ")
        };
      } else if (parseInt(arr[0], 10)) {
        // First index mainly contains the unit count
        // If it does then
        finalObj = {
          count: parseInt(arr[0]),
          unit: "",
          ingredient: arr.slice(1).join(" ")
        };
      } else if (index === -1) {
        finalObj = {
          count: 1,
          unit: "",
          ingredient: el
        };
      }
      if (finalObj.count.toString().length > 3) {
        finalObj.count = parseFloat(finalObj.count.toString().slice(0, 3));
      }
      return finalObj;
    });

    this.ingredients = newIngredients;
  }

  // type === 'dec' or 'inc'
  updateServings(type) {
    const servings = type === "dec" ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(ingredient => {
      ingredient.count *= servings / this.servings;
    });
    this.servings = servings;
  }
}