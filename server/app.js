import express, { json, urlencoded } from "express";
import cors from "cors";
import { MongoStore } from "connect-mongo";
import session from "express-session";

import photo_router from "./src/routes/photos.route.js";
import collection_route from "./src/routes/collection.route.js";
import post_route from "./src/routes/post.route.js";
import adminRoute from "./src/routes/admin.route.js";
import contact_route from "./src/routes/contact.route.js";
import upload_router from "./src/routes/upload.route.js";

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      dbName: "photography_portfolio",
      collectionName: "sessions",
      ttl: 60 * 60 * 24, // session expires after 24 hours (seconds)
      autoRemove: "native", // MongoDB TTL index handles cleanup automatically
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours (milliseconds)
    },
  }),
);

app.use("/api/admin", adminRoute);
app.use("/api/photos", photo_router);
app.use("/api/collections", collection_route);
app.use("/api/posts", post_route);
app.use("/api/contact", contact_route);
app.use("/api/upload", upload_router);

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
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
