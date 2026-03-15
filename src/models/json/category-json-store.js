import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const categoryJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },

  async addCategory(category) {
    await db.read();
    category._id = crypto.randomUUID();
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    let cat = db.data.categories.find((c) => c._id === id);
    if (cat) {
      cat.placemarks = await placemarkJsonStore.getPlacemarksByCategoryId(cat._id);
    } else {
      cat = null;
    }
    return cat;
  },

  async getUserCategories(userid) {
    await db.read();
    return db.data.categories.filter((cat) => cat.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((c) => c._id === id);
    if (index !== -1) db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },
};