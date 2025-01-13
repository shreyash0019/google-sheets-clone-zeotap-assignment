"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = __importDefault(require("../models/column"));
const grid_1 = __importDefault(require("../models/grid"));
const utils_1 = require("../utils");
const createColumn = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Gird not exist", status: 400 });
    }
    req.body.gridId = gridId;
    let row = yield column_1.default.create(req.body);
    res.status(200).send({
        data: {
            columnId: row._id,
        },
        message: "Column has been created successfully",
    });
}));
const updateColumn = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { columnId } = req.params;
    let row = yield column_1.default.findById(columnId);
    if (!row) {
        throw new utils_1.CustomError({ message: "Column not exist", status: 400 });
    }
    yield column_1.default.findByIdAndUpdate(columnId, { $set: req.body });
    res.status(200).send({ message: "Column has been updated successfully" });
}));
const ColumnController = { createColumn, updateColumn };
exports.default = ColumnController;
