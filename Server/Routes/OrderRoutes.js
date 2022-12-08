import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/authMiddleware.js";
import Order from "../Models/OrderModel.js";

const orderRoutes = express.Router();

//CREATE ORDER
orderRoutes.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('Không có order')
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice
            })

            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    })
);

//ADMIN GET ALL ORDERS
orderRoutes.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({})
            .sort({ _id: -1 })
            .populate("user", "id name email")
        res.json(orders);
    })
);

//GET ORDER BY ID
orderRoutes.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "id name email ",
        );
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy Order")
        }
    })
);

//USER LOGIN ORDERS
orderRoutes.get(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(order);
    })
);

// ORDER IS PAID
orderRoutes.put(
    "/:id/pay",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
            const updateOrder = await order.save();
            res.json(updateOrder);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy Order");
        }
    })
);

// ORDER IS PAID
orderRoutes.put(
    "/:id/delivered",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            
            const updateOrder = await order.save();
            res.json(updateOrder);
        } else {
            res.status(404);
            throw new Error("Không tìm thấy Order");
        }
    })
);

export default orderRoutes