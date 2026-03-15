import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/placemark.json", 
    {
        users: [], 
        categories: [], 
        placemarks: [] 
    });