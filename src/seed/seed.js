import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedUsers } from "./users.seed.js";
import { seedProducts } from "./products.seed.js";
import { seedOrders } from "./orders.seed.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    });

    console.log("Seeding database...");

    await seedUsers();
    await seedProducts();
    await seedOrders();

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
