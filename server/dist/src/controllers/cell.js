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
const cell_1 = __importDefault(require("../models/cell"));
const grid_1 = __importDefault(require("../models/grid"));
const utils_1 = require("../utils");
const createCell = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    req.body.gridId = gridId;
    let cell = yield cell_1.default.create(req.body);
    res.status(200).send({ data: { cellId: cell._id }, message: "Success" });
}));
const updateCell = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cellId } = req.params;
    let cell = yield cell_1.default.findById(cellId);
    if (!cell) {
        throw new utils_1.CustomError({ message: "Cell not exist", status: 400 });
    }
    yield cell_1.default.findByIdAndUpdate(cellId, { $set: req.body });
    res.status(200).send({ message: "Cell has been updated successfully" });
}));
const duplicateCells = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { createCells, updateCells, cellId } = req.body;
    if (!cellId ||
        !Array.isArray(createCells) ||
        !Array.isArray(updateCells) ||
        (!createCells.length && !updateCells.length))
        return res.status(200).send({ data: { cells: [], message: "Success" } });
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    let cell = yield cell_1.default.findById(cellId, {
        _id: 0,
        __v: 0,
        rowId: 0,
        columnId: 0,
        updatedAt: 0,
        createdAt: 0,
    });
    if (!cell) {
        throw new utils_1.CustomError({ message: "Cell not exist", status: 400 });
    }
    let cellDetail = cell.toObject();
    let body = createCells.map(({ rowId, columnId }) => {
        return Object.assign(Object.assign({}, cellDetail), { rowId, columnId });
    });
    let cells = yield cell_1.default.create(body);
    yield cell_1.default.updateMany({ _id: { $in: updateCells } }, { $set: cell });
    cells = cells.concat(updateCells.map((cellId) => {
        return Object.assign(Object.assign({}, cellDetail), { _id: cellId });
    }));
    res.status(200).send({ data: { cells }, message: "Success" });
}));
const removeCell = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cellId } = req.params;
    let cell = yield cell_1.default.findById(cellId);
    if (!cell) {
        throw new utils_1.CustomError({ message: "Cell not exist", status: 400 });
    }
    yield cell_1.default.findByIdAndDelete(cellId);
    res.status(200).send({ message: "Cell has been deleted successfully" });
}));
const copyPasteCell = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cellId } = req.params;
    let columnId = +req.body.columnId;
    let rowId = +req.body.rowId;
    let copyCell = yield cell_1.default.findById(cellId, {
        background: 1,
        content: 1,
        gridId: 1,
        text: 1,
    });
    if (!copyCell) {
        throw new utils_1.CustomError({ message: "Cell not exist", status: 400 });
    }
    let cellData = copyCell.toObject();
    delete cellData._id;
    let pasteCell = yield cell_1.default.findOne({
        gridId: cellData.gridId,
        rowId,
        columnId,
    });
    if (pasteCell) {
        let cellId = pasteCell._id.toString();
        yield cell_1.default.findByIdAndUpdate(cellId, { $set: cellData });
        res.status(200).send({
            message: "Success",
            data: {
                cell: Object.assign(Object.assign({}, cellData), { _id: cellId, rowId, columnId }),
            },
        });
    }
    else {
        let cell = yield cell_1.default.create(Object.assign(Object.assign({}, cellData), { rowId,
            columnId }));
        res.status(200).send({ message: "Success", data: { cell } });
    }
}));
const insertColumn = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { columnId, direction } = req.body;
    columnId = +columnId;
    if (!columnId) {
        return res.status(400).send({ message: "ColumnId is required" });
    }
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    if (direction !== "left" && direction !== "right")
        return res.status(400).send({ message: "Invalid direction" });
    yield cell_1.default.updateMany({
        gridId,
        columnId: { [direction === "right" ? "$gt" : "$gte"]: columnId },
    }, { $inc: { columnId: 1 } });
    res
        .status(200)
        .send({ message: `Column has been inserted ${direction} successfully` });
}));
const insertRow = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { rowId, direction } = req.body;
    rowId = +rowId;
    if (!rowId) {
        return res.status(400).send({ message: "RowId is required" });
    }
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    if (direction !== "top" && direction !== "bottom")
        return res.status(400).send({ message: "Invalid direction" });
    yield cell_1.default.updateMany({
        gridId,
        rowId: { [direction === "bottom" ? "$gt" : "$gte"]: rowId },
    }, { $inc: { rowId: 1 } });
    res.status(200).send({ message: "Row has been inserted successfully" });
}));
const removeRow = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { rowId } = req.body;
    rowId = +rowId;
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    yield cell_1.default.deleteMany({ gridId, rowId });
    res.status(200).send({ message: "Row has been deleted successfully" });
}));
const removeColumn = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { columnId } = req.body;
    columnId = +columnId;
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    yield cell_1.default.deleteMany({ gridId, columnId });
    res.status(200).send({ message: "Column has been deleted successfully" });
}));
const CellController = {
    createCell,
    updateCell,
    removeCell,
    duplicateCells,
    copyPasteCell,
    insertColumn,
    insertRow,
    removeColumn,
    removeRow,
};
exports.default = CellController;
