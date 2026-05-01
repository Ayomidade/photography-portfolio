import { config } from "dotenv";
import app from "./app.js";
import { connectDB, getDB } from "./src/config/db.js";

config();

const PORT = process.env.PORT || 3000;

// Keep alive ping
const keepAlive = () => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (!url) return;

  setInterval(
    async () => {
      try {
        await fetch(`${url}/api/health`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Keep-alive ping failed:", error.message);
      }
    },
    14 * 60 * 1000,
  );
};

const startServer = async () => {
  await connectDB();
  getDB(); // Ensure DB is initialized before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (process.env.NODE_ENV === "production") {
      keepAlive();
    }
  });
};

startServer();
