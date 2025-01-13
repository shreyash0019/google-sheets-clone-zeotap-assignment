"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grid_1 = __importDefault(require("../controllers/grid"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.get("/:gridId/detail", grid_1.default.getGridById);
router.get("/:gridId/search", grid_1.default.searchGrid);
router.post("/:sheetId/create", grid_1.default.createGrid);
router.post("/:gridId/duplicate", grid_1.default.duplicateGridById);
router.put("/:gridId/update", grid_1.default.updateGridById);
router.delete("/:gridId/remove", grid_1.default.removeGridById);
exports.default = router;
