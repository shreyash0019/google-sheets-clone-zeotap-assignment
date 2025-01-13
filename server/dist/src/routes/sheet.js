"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sheet_1 = __importDefault(require("../controllers/sheet"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/create", sheet_1.default.createSheet);
router.get("/:sheetId/detail", sheet_1.default.getSheetById);
router.get("/list", sheet_1.default.getSheetList);
router.put("/:sheetId/update", sheet_1.default.updateSheetById);
router.delete("/:sheetId/remove", sheet_1.default.removeSheetById);
exports.default = router;
