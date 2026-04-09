import { config } from "dotenv";
import app from "./app.js"
import {connectDB, getDB} from "./src/config/db.js";

config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  getDB() // Ensure DB is initialized before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
