import express from "express";
import cors from "cors";
import productRoutes from "./routes/index.js";

export const app = express();

app.use(cors());
app.use(express.json());

// Rutas base
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("🩶 Bienvenido a la API de Piccoli Detalles 🕯️");
});
