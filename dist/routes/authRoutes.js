"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const segurity_1 = require("../security/segurity");
const addTokenResponse_1 = __importDefault(require("../services/addTokenResponse"));
const segurity = new segurity_1.Security();
const app = (0, express_1.default)();
app.use(segurity.tokenValidity);
app.use(addTokenResponse_1.default);
exports.default = app;
