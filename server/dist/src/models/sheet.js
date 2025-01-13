"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SheetSchema = new mongoose_1.Schema({
    title: {
        default: "Untitled Spreadsheet",
        type: String,
    },
    grids: {
        ref: "Grid",
        type: [mongoose_1.Types.ObjectId],
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastOpenedAt: {
        type: Date,
        default: () => new Date().toISOString(),
    },
}, { timestamps: true });
const Sheet = (0, mongoose_1.model)("Sheet", SheetSchema);
exports.default = Sheet;
