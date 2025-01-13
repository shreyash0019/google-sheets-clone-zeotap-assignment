"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const sheet_1 = __importDefault(require("./sheet"));
const grid_1 = __importDefault(require("./grid"));
const row_1 = __importDefault(require("./row"));
const column_1 = __importDefault(require("./column"));
const cell_1 = __importDefault(require("./cell"));
const router = (0, express_1.Router)();
router.use("/api/user", user_1.default);
router.use("/api/sheet", sheet_1.default);
router.use("/api/grid", grid_1.default);
router.use("/api/row", row_1.default);
router.use("/api/column", column_1.default);
router.use("/api/cell", cell_1.default);
router.get("/api/health-check", (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "Service is running smoothly",
            version: "1.0.0",
        },
    });
});
exports.default = router;
