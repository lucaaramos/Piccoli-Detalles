import express from "express";
import cors from "cors";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/usersRoutes.js"
import orderRoutes from "./routes/ordersRoutes.js"

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", 
  productRoutes,
  userRoutes,
  orderRoutes
);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Piccoli Detalles");
});
