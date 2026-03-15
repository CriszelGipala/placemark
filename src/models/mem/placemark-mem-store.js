import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    return placemarks.filter((p) => p.categoryid === id);
  },

  async getPlacemarkById(id) {
    let p = placemarks.find((pm) => pm._id === id);
    if (p === undefined) p = null;
    return p;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((p) => p._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    const p = placemarks.find((pm) => pm._id === placemark._id);
    p.name = updatedPlacemark.name;
    p.description = updatedPlacemark.description;
    p.latitude = updatedPlacemark.latitude;
    p.longitude = updatedPlacemark.longitude;
  },
};