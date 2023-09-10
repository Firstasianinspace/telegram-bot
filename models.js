"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const sequelize_1 = require("sequelize");
const userModel = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    chatId: { type: sequelize_1.DataTypes.STRING, unique: true },
    balance: { type: sequelize_1.DataTypes.INTEGER }
});
exports.default = userModel;
