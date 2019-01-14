import axios from 'axios';
export default class Search {
    constructor(userQuery) {
        this.userQuery = userQuery;
    }
    async getData() {
        try {
            const URL = `https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${this.userQuery}`;
            const content = await axios(URL);
            this.result = content.data.recipes;
        } catch (err) {
            console.log(`There's an error ${err}`);
        }
    }
}