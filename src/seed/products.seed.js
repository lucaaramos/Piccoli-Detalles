import Product from "../models/Product.js";

export const seedProducts = async () => {
  const products = [
    {
      name: "Seeded Candle test",
      description: "Lavender scent",
      price: 5500,
      stock: 10,
    },
    {
      name: "Handmade Soap",
      description: "Natural ingredients",
      price: 3200,
      stock: 25,
    },
  ];

  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("Products seeded");
};
