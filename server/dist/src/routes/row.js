"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const row_1 = __importDefault(require("../controllers/row"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/:gridId/create", row_1.default.createRow);
router.put("/:rowId/update", row_1.default.updateRow);
exports.default = router;
