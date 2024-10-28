"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabByToken = getLabByToken;
const segurity_1 = require("../security/segurity");
function getLabByToken(req, data) {
    const segurity = new segurity_1.Security();
    const token = req.headers.authorization;
    const { lab_id } = segurity.decoderToken(token);
    data.id_clientLaboratory = lab_id;
    return data;
}
