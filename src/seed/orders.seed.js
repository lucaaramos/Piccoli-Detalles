import Order from "../models/Orders.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const seedOrders = async () => {
  const user = await User.findOne({ role: "user" });
  const products = await Product.find();

  if (!user || products.length === 0) {
    console.log(" Orders seed skipped (missing users or products)");
    return;
  }

  const items = [
    {
      product: products[0]._id,
      name: products[0].name,
      price: products[0].price,
      quantity: 2,
    },
  ];

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await Order.deleteMany();

  await Order.create({
    user: user._id,
    items,
    total,
    status: "pending",
    paymentMethod: "mock",
  });

  console.log("Orders seeded");
};
