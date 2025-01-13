"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CellSchema = new mongoose_1.Schema({
    gridId: {
        required: true,
        index: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    rowId: {
        required: true,
        type: Number,
    },
    columnId: {
        required: true,
        type: Number,
    },
    background: {
        default: "#ffffff",
        type: String,
    },
    textAlign: {
        default: "left",
        type: String,
    },
    text: {
        default: "",
        type: String,
    },
    content: {
        default: [],
        type: Array,
    },
}, { timestamps: true });
const Cell = (0, mongoose_1.model)("Cell", CellSchema);
exports.default = Cell;
