import Product from "../models/Product.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageURL } = req.body;

    // Validación básica
    if (!name || !price) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    const newProduct = new Product({
      name,
      price,
      description: description || "",
      imageURL: imageURL || ""
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({ error: "Error del servidor" });
  }
};
