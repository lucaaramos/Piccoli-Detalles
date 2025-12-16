import Orders from "../models/Orders.js";
import Product from "../models/Product.js";

export const createOrder = async (req,res) => {
    try {
        const userId = req.user.id
        const {items} = req.body

        if (!items || items.length === 0){
            return res.status(400).json({error: "Empty order"})
        }

        let total = 0
        const orderItems = [];
        
        for (const item of items) {
            const product = await Product.findById(item.productId)

            if(!product) {
                return res.status(404).json({error: "Product not found"})
            }

            total += product.price * item.quantity

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }
        
        const order = new Orders({
            user: userId,
            items: orderItems,
            total,
        })

        const saveOrder = await order.save();

        res.status(201).json({
            message: "Order created successfully",
            order: saveOrder
        })
        
    } catch(error){
        console.error("Error creating order: ", error.message);
        res.status(500).json({error: "Server Error"})
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