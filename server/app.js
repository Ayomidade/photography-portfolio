import express, { json, urlencoded } from "express";
import cors from "cors";
import photo_router from "./src/routes/photos.route.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/photos", photo_router);

// ── Health check ──
app.get("/api/health", (req, res) => {
  return res.status(200).json({ status: "ok", message: "Server is running" });
});

// ── 404 handler ──
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
