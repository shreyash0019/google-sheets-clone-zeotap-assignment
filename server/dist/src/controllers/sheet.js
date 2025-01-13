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
const sheet_1 = __importDefault(require("../models/sheet"));
const grid_1 = __importDefault(require("../models/grid"));
const cell_1 = __importDefault(require("../models/cell"));
const row_1 = __importDefault(require("../models/row"));
const column_1 = __importDefault(require("../models/column"));
const utils_1 = require("../utils");
const createSheet = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sheet = yield sheet_1.default.create({
        createdBy: req.user._id,
    });
    let grid = yield grid_1.default.create({ sheetId: sheet._id, createdBy: req.user._id });
    yield sheet_1.default.findByIdAndUpdate(sheet._id, { $push: { grids: grid._id } });
    res.status(200).send({
        data: { sheetId: sheet._id },
        message: "Sheet has been created successfully",
    });
}));
const getSheetById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sheetId } = req.params;
    let sheet = yield sheet_1.default.findById(sheetId, {
        grids: 1,
        title: 1,
        createdBy: 1,
    }).populate({
        path: "grids",
        select: { title: 1, color: 1, sheetId: 1 },
    });
    if (!sheet) {
        throw new utils_1.CustomError({ message: "Sheet not exist", status: 400 });
    }
    if (sheet.createdBy.toString() !== req.user._id) {
        throw new utils_1.CustomError({
            message: "You don't have access to view and edit the sheet",
            status: 400,
        });
    }
    yield sheet_1.default.findByIdAndUpdate(sheetId, {
        $set: { lastOpenedAt: new Date().toISOString() },
    });
    res.status(200).send({
        data: {
            _id: sheet._id,
            title: sheet.title,
            grids: sheet.grids,
        },
        message: "Success",
    });
}));
const updateSheetById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sheetId } = req.params;
    let sheet = yield sheet_1.default.findById(sheetId);
    if (!sheet) {
        throw new utils_1.CustomError({ status: 400, message: "Sheet not exist" });
    }
    yield sheet_1.default.findByIdAndUpdate(sheetId, { $set: req.body });
    res.status(200).send({ message: "Sheet has been updated successfully" });
}));
const getSheetList = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page = 1, search = "", limit = 20 } = req.query;
    let { _id: userId } = req.user;
    const matchQuery = {
        createdBy: userId,
        title: { $regex: search, $options: "i" },
    };
    let sheets = yield sheet_1.default.find(matchQuery, { createdBy: 0 }, {
        sort: {
            createdAt: 1,
        },
        limit: +limit,
        skip: (+page - 1) * +limit,
    });
    let count = (yield sheet_1.default.find(matchQuery)).length;
    let pageMeta = {
        totalPages: Math.ceil(count / +limit),
        total: count,
        page: +page,
    };
    res.status(200).send({ data: { sheets, pageMeta }, message: "Success" });
}));
const removeSheetById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sheetId } = req.params;
    let sheet = yield sheet_1.default.findById(sheetId);
    if (!sheet) {
        throw new utils_1.CustomError({ message: "Sheet not exist", status: 400 });
    }
    let query = { gridId: { $in: sheet.grids } };
    yield cell_1.default.deleteMany(query);
    yield row_1.default.deleteMany(query);
    yield column_1.default.deleteMany(query);
    yield grid_1.default.deleteMany({ _id: { $in: sheet.grids } });
    yield sheet_1.default.findByIdAndDelete(sheetId);
    res.status(200).send({ message: "Sheet has been deleted successfully" });
}));
const SheetController = {
    createSheet,
    getSheetById,
    getSheetList,
    updateSheetById,
    removeSheetById,
};
exports.default = SheetController;
