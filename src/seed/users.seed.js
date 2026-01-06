import User from "../models/User.js";

export const seedUsers = async () => {
  await User.deleteMany();

  await User.create({
    name: "Admin",
    last_name: "User",
    email: "admin@demo.com",
    password: "123456",
    role: "admin"
  });

  await User.create({
    name: "John",
    last_name: "Doe",
    email: "user@demo.com",
    password: "123456"
  });

  console.log("Users seeded");
};
