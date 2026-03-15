import Mongoose from "mongoose";

export function connectMongo() {
  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;
  db.on("error", (err) => {
    console.log(`database not connected: ${err}`);
  });
  db.on("disconnected", () => {
    console.log("database disconnected");
  });
  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}