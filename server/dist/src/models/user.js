"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const UserSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    colorCode: {
        type: String,
        default: utils_1.generateRandomColor,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
