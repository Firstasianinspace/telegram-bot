"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('telegram_db', 'tester', 'Qwe1488dota', {
    host: '194.67.65.247',
    port: 5432,
    dialect: 'postgres'
});
exports.default = sequelize;
