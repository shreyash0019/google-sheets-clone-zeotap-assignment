"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RowSchema = new mongoose_1.Schema({
    gridId: {
        required: true,
        index: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    rowId: {
        required: true,
        type: Number,
    },
    height: {
        required: true,
        type: Number,
    },
}, { timestamps: true });
const Row = (0, mongoose_1.model)("Row", RowSchema);
exports.default = Row;
