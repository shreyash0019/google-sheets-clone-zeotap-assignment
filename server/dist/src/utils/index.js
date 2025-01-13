"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomColor = exports.generateJwtToken = exports.asyncHandler = exports.CustomError = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonwebtoken_2 = require("jsonwebtoken");
const colors = [
    "#EF4770",
    "#6F6F6F",
    "#DCB604",
    "#199393",
    "#029ACD",
    "#11C1DA",
    "#3B8FFC",
    "#18C6A0",
    "#B387FF",
    "#F75334",
];
class CustomError extends Error {
    constructor({ message, status }) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
const asyncHandler = (cb) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cb(req, res, next);
        }
        catch (error) {
            let status = (error === null || error === void 0 ? void 0 : error.status) || (error instanceof jsonwebtoken_1.JsonWebTokenError ? 401 : 500);
            let message = (error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error";
            res.status(status).send({ message });
            console.log("🚀 ~ file: asyncHandler.ts:19 ~ error:", error);
        }
    });
};
exports.asyncHandler = asyncHandler;
const generateJwtToken = (payload) => {
    return (0, jsonwebtoken_2.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
exports.generateJwtToken = generateJwtToken;
const generateRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};
exports.generateRandomColor = generateRandomColor;
