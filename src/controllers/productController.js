import Product from "../models/Product.js";
import { getPagination } from "../utils/pagination.js";

export const getProducts = async (req, res, next) => {
  try {
    const {
      page,
      limit,
      search,
      minPrice,
      maxPrice,
      inStock,
      sort,
      order,
      startDate,
      endDate
    } = req.validated;

    const filters = {};

    if (search) {
      filters.name = { $regex: search, $options: "i" };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filters.price = {};
      if (minPrice !== undefined) filters.price.$gte = minPrice;
      if (maxPrice !== undefined) filters.price.$lte = maxPrice;
    }

    if (inStock === "true") {
      filters.stock = { $gt: 0 };
    }

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }

    const skip = (page - 1) * limit;

    const [products, totalItems] = await Promise.all([
      Product.find(filters)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filters)
    ]);

    res.json({
      data: products,
      meta: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNextPage: skip + products.length < totalItems,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};



export const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageURL, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    const newProduct = new Product({
      name,
      price,
      description: description || "",
      imageURL: imageURL || "",
      stock,
    });
    console.log(newProduct);

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, imageURL, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageURL, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log("eliminado")
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    res.status(500).json({ error: "Error del servidor" });
  }
};
