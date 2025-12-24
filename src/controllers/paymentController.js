import mercadopago from "mercadopago";
import Order from "../models/Orders.js";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export const createPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ error: "Order is not payable" });
    }

    const preference = {
      items: order.items.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        currency_id: "ARS",
        unit_price: item.price,
      })),
      external_reference: order._id.toString(),
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment-success`,
        failure: `${process.env.FRONTEND_URL}/payment-failure`,
        pending: `${process.env.FRONTEND_URL}/payment-pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.BACKEND_URL}/api/webhooks/mercadopago`,
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      init_point: response.body.init_point,
    });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).json({ error: "Payment error" });
  }
};
