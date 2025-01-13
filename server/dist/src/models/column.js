"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ColumnSchema = new mongoose_1.Schema({
    gridId: {
        required: true,
        index: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    columnId: {
        required: true,
        type: Number,
    },
    width: {
        required: true,
        type: Number,
    },
}, { timestamps: true });
const Column = (0, mongoose_1.model)("Column", ColumnSchema);
exports.default = Column;
