import axios from 'axios';
export default class Search {
    constructor(userQuery) {
        this.userQuery = userQuery;
    }
    async getData() {
        try {
            const URL = `https://www.food2fork.com/api/search?key=${process.env.API_KEY}&q=${this.userQuery}`;
            const content = await axios(URL);
            if (content.data.error === "limit") {
                console.log("Limit exceeded");
                return;
            } else {
                console.log("​Search -> getData -> content", content)

                this.result = content.data.recipes;
            }
        } catch (err) {
            if (content.data.error === "limit") {
                console.log("Limit exceeded");
            }
            console.log(`There's an error ${err}`);
        }
    }
}