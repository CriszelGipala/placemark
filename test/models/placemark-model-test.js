import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testCategories, divingSpots, whaleSharkPoint } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
  let divingCategory = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    divingCategory = await db.categoryStore.addCategory(divingSpots);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(divingCategory._id, testPlacemarks[i]);
    }
    EventEmitter.setMaxListeners(25);
  });

  test("create a placemark", async () => {
    const beaches = await db.categoryStore.addCategory(testCategories[0]);
    const placemark = await db.placemarkStore.addPlacemark(beaches._id, { ...whaleSharkPoint });
    assertSubset(whaleSharkPoint, placemark);
    assert.isDefined(placemark._id);
  });

  test("get placemarks by category", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(divingCategory._id);
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const beaches = await db.categoryStore.addCategory(testCategories[0]);
    const placemark = await db.placemarkStore.addPlacemark(beaches._id, { ...whaleSharkPoint });
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(whaleSharkPoint, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One Placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
  });
});