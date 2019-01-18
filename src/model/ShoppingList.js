import uniqid from "uniqid";
export class Shopping {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  //   Delete item from the items array
  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    if (index) {
      this.items.splice(index, 1); // returns the removed item
    } else {
      console.log(`ShoppingList -> deleteItem -> Couldn't find item`);
    }
  }

  updateCount(id, newCount) {
    //   update the count value
    this.items.find(el => el.id === id).count = newCount;
  }
}