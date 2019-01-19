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
                throw 'API Limit Exceeded only 50 calls are allowed in one day'
            } else {
                this.result = content.data.recipes;
            }
        } catch (err) {
            throw err;
        }
    }
}