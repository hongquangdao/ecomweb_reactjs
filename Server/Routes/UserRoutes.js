import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/authMiddleware.js";
import User from "../Models/UserModel.js";
import generateToken from "../Util/generateToken.js";

const userRouter = express.Router();

//LOGIN
userRouter.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            })
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
);

//PROFILE
userRouter.get(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        // res.json("profile")
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                password: user.password,
            })
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

// REGISTER
userRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("Email người dùng đã tồn tại")
        };

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // password: user.password,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                token: generateToken(user._id),
            });
        } else {
            res.status(404);
            throw new Error("Thông tin người dùng chưa chính xác")
        }
    })
);

//UPDATE PROFILE
userRouter.put(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
            })
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    })
);

// GET ALL USER ADMIN
userRouter.get("/", protect, admin, asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users)
}))

export default userRouter;