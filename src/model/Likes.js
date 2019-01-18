export class Likes {
    constructor() {
        this.likes = [];
    }

    addLikeItem(id, title, image, publisher) {
        const item = {
            id,
            title,
            image,
            publisher
        };
        this.likes.push(item);
        // Stores the data into the local storage so that that it stays there even when the page reloads
        this.persistData();
        return item;
    }

    deleteLikedItem(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        // Stores the data into the local storage so that that it stays there even when the page reloads
        this.persistData();
    }

    isLiked(id) {
        // if the value isn't -1 then that means the item is liked by the user
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getTotalLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readData() {
        const data = JSON.parse(localStorage.getItem('likes'));
        if (data) {
            this.likes = data;
        }
    }
}