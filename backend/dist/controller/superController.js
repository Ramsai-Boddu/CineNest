var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Movies from "../models/movieModel.js";
import User from "../models/userModel.js";
// CREATE USER
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                message: "All fields are required",
                status: false,
            });
        }
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                status: false,
            });
        }
        const newUser = yield User.create({ name, email });
        return res.status(201).json({
            message: "User created successfully",
            status: true,
            data: newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});
// GET USERS
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll();
        return res.status(200).json({
            message: "Users fetched successfully",
            status: true,
            data: users,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});
// GET MOVIES
export const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movies.findAll();
        return res.status(200).json({
            message: "Movies fetched successfully",
            status: true,
            data: movies.length > 0 ? movies : "No movies found",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
});
