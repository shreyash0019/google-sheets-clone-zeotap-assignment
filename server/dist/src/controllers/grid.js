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
const mongoose_1 = require("mongoose");
const cell_1 = __importDefault(require("../models/cell"));
const column_1 = __importDefault(require("../models/column"));
const grid_1 = __importDefault(require("../models/grid"));
const row_1 = __importDefault(require("../models/row"));
const sheet_1 = __importDefault(require("../models/sheet"));
const utils_1 = require("../utils");
const createGrid = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sheetId } = req.params;
    let sheet = yield sheet_1.default.findById(sheetId);
    if (!sheet) {
        throw new utils_1.CustomError({ message: "Sheet not exist", status: 400 });
    }
    let grid = yield grid_1.default.create({
        sheetId,
        title: `Sheet ${sheet.grids.length + 1}`,
        createdBy: req.user._id,
    });
    yield sheet_1.default.findByIdAndUpdate(sheetId, { $push: { grids: grid._id } });
    res.status(200).send({
        data: {
            _id: grid._id,
            title: grid.title,
            sheetId: grid.sheetId,
            color: grid.color,
        },
        message: "Grid has been created successfully",
    });
}));
const getGridById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId, { title: 1, sheetId: 1, color: 1 });
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    let rows = yield row_1.default.find({ gridId }, { rowId: 1, height: 1 });
    let columns = yield column_1.default.find({ gridId }, { columnId: 1, width: 1 });
    let cells = yield cell_1.default.find({ gridId }, { createdAt: 0, updatedAt: 0, __v: 0 });
    res.status(200).send({
        data: {
            grid: {
                _id: grid._id,
                color: grid.color,
                title: grid.title,
                sheetId: grid.sheetId,
            },
            rows,
            columns,
            cells,
        },
        message: "Success",
    });
}));
const searchGrid = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let { q } = req.query;
    q = q === null || q === void 0 ? void 0 : q.toString().trim();
    if (!q || !q.length) {
        res.status(200).send({ data: { cells: [] }, message: "Success" });
        return;
    }
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    let cells = yield cell_1.default.aggregate([
        {
            $match: {
                gridId: new mongoose_1.Types.ObjectId(gridId),
                text: { $regex: q, $options: "i" },
            },
        },
        {
            $sort: {
                rowId: 1,
                columnId: 1,
            },
        },
        {
            $project: {
                _id: 1,
            },
        },
    ]);
    let cellIds = cells.map((cell) => cell._id);
    res.status(200).send({
        data: { cells: cellIds },
        message: "Success",
    });
}));
const removeGridById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId);
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    let sheet = yield sheet_1.default.findById(grid.sheetId);
    if (!sheet) {
        throw new utils_1.CustomError({ message: "Sheet not exist", status: 400 });
    }
    yield cell_1.default.deleteMany({ gridId });
    yield row_1.default.deleteMany({ gridId });
    yield column_1.default.deleteMany({ gridId });
    yield grid_1.default.findByIdAndDelete(gridId);
    let isRemoveSheet = sheet.grids.length === 1;
    if (isRemoveSheet) {
        yield sheet_1.default.findByIdAndDelete(grid.sheetId);
    }
    else {
        yield sheet_1.default.findByIdAndUpdate(grid.sheetId, { $pull: { grids: gridId } });
    }
    res.status(200).send({
        message: `${isRemoveSheet ? "Sheet" : "Grid"} has been deleted successfully`,
    });
}));
const updateGridById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId, { title: 1, sheetId: 1, color: 1 });
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    yield grid_1.default.findByIdAndUpdate(gridId, { $set: req.body });
    res.status(200).send({ message: "Grid has been updated successfully" });
}));
const duplicateGridById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { gridId } = req.params;
    let grid = yield grid_1.default.findById(gridId, { title: 1, sheetId: 1, color: 1 });
    if (!grid) {
        throw new utils_1.CustomError({ message: "Grid not exist", status: 400 });
    }
    let newGrid = yield grid_1.default.create({
        color: grid.color,
        sheetId: grid.sheetId,
        title: `Copy of ${grid.title}`,
        createdBy: req.user._id,
    });
    yield sheet_1.default.findByIdAndUpdate(grid.sheetId, {
        $push: { grids: newGrid._id },
    });
    let cells = yield cell_1.default.aggregate([
        {
            $match: { gridId: new mongoose_1.Types.ObjectId(gridId) },
        },
        {
            $project: {
                _id: 0,
                gridId: newGrid._id,
                rowId: 1,
                columnId: 1,
                text: 1,
                content: 1,
                background: 1,
            },
        },
    ]);
    let rows = yield row_1.default.aggregate([
        { $match: { gridId: new mongoose_1.Types.ObjectId(gridId) } },
        {
            $project: {
                _id: 0,
                gridId: newGrid._id,
                rowId: 1,
                height: 1,
            },
        },
    ]);
    let columns = yield column_1.default.aggregate([
        { $match: { gridId: new mongoose_1.Types.ObjectId(gridId) } },
        {
            $project: {
                _id: 0,
                gridId: newGrid._id,
                columnId: 1,
                width: 1,
            },
        },
    ]);
    if (cells.length) {
        yield cell_1.default.create(cells);
    }
    if (rows.length) {
        yield row_1.default.create(rows);
    }
    if (columns.length) {
        yield column_1.default.create(columns);
    }
    res.status(200).send({
        message: "Grid has been duplicated successfully",
        data: { grid: newGrid.toObject() },
    });
}));
const GridController = {
    createGrid,
    getGridById,
    searchGrid,
    removeGridById,
    updateGridById,
    duplicateGridById,
};
exports.default = GridController;
