import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let categories = [];

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategory(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id) {
    let c = categories.find((cat) => cat._id === id);
    if (c) {
      c.placemarks = await placemarkMemStore.getPlacemarksByCategoryId(c._id);
    } else {
      c = null;
    }
    return c;
  },

  async getUserCategories(userid) {
    return categories.filter((cat) => cat.userid === userid);
  },

  async deleteCategoryById(id) {
    const index = categories.findIndex((cat) => cat._id === id);
    if (index !== -1) categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },
};