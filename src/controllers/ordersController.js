import Order from "../models/Orders.js";
import Orders from "../models/Orders.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Empty order" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid order item" });
      }

      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { new: true }
      );

      if (!product) {
        return res.status(400).json({
          error: "Product not found or insufficient stock",
        });
      }

      total += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const order = new Orders({
      user: userId,
      items: orderItems,
      total,
      status: "pending",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};


export const getMyOrders = async(req,res) => {
    const orders = await Orders.find({user: req.user.id});
    res.json(orders)
}

export const getAllOrders = async (req,res) => {
    const orders = await Orders.find().populate("user", "email");
    res.json(orders)
}

export const cancelOrder = async (req,res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({error: "Order not found"})
    }

    if (order.status !== "pending") {
        return res.status(404).json({error: "Cannot cancel this order"})
    }

    for (const item of order.items){
        const product = await Product.findById(item.product);
        if(product){
            product.stock += item.quantity
            await product.save()
        }
    }

    order.status = "cancelled"
    await order.save()

    res.json({message: "Order cancelled"})
}

export const payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Orders.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (
      order.user.toString() !== userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        error: "Only pending orders can be paid",
      });
    }

    order.status = "paid";
    order.paidAt = new Date();

    await order.save();

    res.json({
      message: "Order paid successfully",
      order,
    });
  } catch (error) {
    console.error("Error paying order:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
