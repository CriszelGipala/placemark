import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    await db.read();
    placemark._id = crypto.randomUUID();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    await db.read();
    return db.data.placemarks.filter((p) => p.categoryid === id);
  },

  async getPlacemarkById(id) {
    await db.read();
    let p = db.data.placemarks.find((pm) => pm._id === id);
    if (p === undefined) p = null;
    return p;
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((p) => p._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    const p = db.data.placemarks.find((pm) => pm._id === placemark._id);
    p.name = updatedPlacemark.name;
    p.description = updatedPlacemark.description;
    p.latitude = updatedPlacemark.latitude;
    p.longitude = updatedPlacemark.longitude;
    await db.write();
  },
};