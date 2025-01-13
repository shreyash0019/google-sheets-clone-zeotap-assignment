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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils");
const signUp = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, name, password } = req.body;
    let isExist = yield user_1.default.findOne({ email });
    if (isExist)
        throw new utils_1.CustomError({ message: "User already exists", status: 400 });
    let salt = yield bcryptjs_1.default.genSalt();
    let hashPassword = yield bcryptjs_1.default.hash(password, salt);
    let user = yield user_1.default.create({
        name,
        email,
        password: hashPassword,
    });
    let token = (0, utils_1.generateJwtToken)({
        _id: user._id,
        name: user.name,
        email: user.email,
        colorCode: user.colorCode,
    });
    res.status(200).send({
        data: { token },
        message: "Success",
    });
}));
const signIn = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let user = yield user_1.default.findOne({ email });
    if (!user)
        throw new utils_1.CustomError({ message: "User not exist", status: 400 });
    let isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched)
        throw new utils_1.CustomError({ message: "Wrong Password", status: 400 });
    let token = (0, utils_1.generateJwtToken)({
        _id: user._id,
        name: user.name,
        email: user.email,
        colorCode: user.colorCode,
    });
    res.status(200).send({
        data: { token },
        message: "Success",
    });
}));
const UserController = { signIn, signUp };
exports.default = UserController;
