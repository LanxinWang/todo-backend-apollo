import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo = null;

/**
 * Connect to the in-memory database.
 */
export const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = await mongo.getUri();
  const dbName = "test";

  const mongooseOpts = {
    dbName,
    useNewUrlParser: true,
    autoCreate: true,
  } as ConnectOptions;

  await mongoose.connect(uri, mongooseOpts).catch((e) => {
    console.log("error:", e.message);
  });
};

/**
 * Drop database, close the connection and stop mongo.
 */
export const closeDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close().catch((e) => {
      console.log("error:", e.message);
    });
    await mongo.stop();
  }
};

/**
 * Remove all the data for all db collections.
 */
export const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    if (mongo) {
      const collection = collections[key];
      await collection.deleteMany({}).catch((e) => {
        console.log("error:", e.message);
      });
    }
  }
};
