import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    client = new MongoClient(uri as string);
    global._mongo = client.connect();
  }
  clientPromise = global._mongo;
} else {
  client = new MongoClient(uri as string);
  clientPromise = client.connect();
}

export default clientPromise;
