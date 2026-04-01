var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import User from "../models/userModel.js";
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not found",
            });
        }
        // Plain password check (only for learning)
        if (user.password !== password) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials",
            });
        }
        // Remove password before sending response
        const _a = user.toJSON(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: userData,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
