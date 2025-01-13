"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GridSchema = new mongoose_1.Schema({
    sheetId: {
        required: true,
        index: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    title: {
        default: "Sheet 1",
        type: String,
    },
    color: {
        default: "transparent",
        type: String,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const Grid = (0, mongoose_1.model)("Grid", GridSchema);
exports.default = Grid;
