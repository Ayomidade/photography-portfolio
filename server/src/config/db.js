import { config } from "dotenv";
import { MongoClient } from "mongodb";

config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined in .env");
}

const client = new MongoClient(mongoUrl);

let db;

// ── Connect DB ──
export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("photography_portfolio");

    console.log(`MongoDB connected: ${db.databaseName}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// ── Get DB (optional if needed elsewhere) ──
export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialised. Call connectDB first.");
  }
  return db;
};

// ── Export collections (THIS fixes your model) ──
const getCollection = (name) => {
  if (!db) {
    throw new Error("DB not connected");
  }
  return db.collection(name);
};

export const photos = () => getCollection("photos");
export const collections = () => getCollection("collections");
export const journals = () => getCollection("journals");
