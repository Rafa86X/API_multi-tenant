"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segurity_1 = require("../security/segurity");
const addTokenMiddleware = (req, res, next) => {
    const segurity = new segurity_1.Security();
    const originalJson = res.json;
    res.json = function (body) {
        const wrappedResponse = {
            info: body,
            newToken: segurity.tokenREVALID(req)
        };
        return originalJson.call(this, wrappedResponse);
    };
    next();
};
exports.default = addTokenMiddleware;
