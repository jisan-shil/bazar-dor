import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

const g = globalThis as unknown as { _mongoClient?: MongoClient };
export const client =
  g._mongoClient ?? new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
if (process.env.NODE_ENV !== "production") g._mongoClient = client;

export const db = client.db("bazardor");