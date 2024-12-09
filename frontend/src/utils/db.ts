import { MongoClient } from "mongodb";

const dbUrl = process.env.MONGODB_URI;

let connectDB: any;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(dbUrl as any).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(dbUrl as any).connect();
}

export { connectDB };
