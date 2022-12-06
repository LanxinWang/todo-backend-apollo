import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongo = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connectDatabase = async () => {
  const uri = await mongo.getUri();
  const dbName = "test";

  const mongooseOpts = {
    dbName,
    useNewUrlParser: true,
    autoCreate: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  } as ConnectOptions;

  await mongoose.connect(uri, mongooseOpts).catch((e) => {
    console.log("error:", e.message);
  });
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close().catch((e) => {
    console.log("error:", e.message);
  });
  await mongo.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}).catch((e) => {
      console.log("error:", e.message);
    });
  }
};
