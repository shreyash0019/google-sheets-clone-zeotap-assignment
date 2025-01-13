"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const column_1 = __importDefault(require("../controllers/column"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/:gridId/create", column_1.default.createColumn);
router.put("/:columnId/update", column_1.default.updateColumn);
exports.default = router;
