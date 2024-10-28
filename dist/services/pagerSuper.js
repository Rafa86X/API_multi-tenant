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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagerSuper = pagerSuper;
function pagerSuper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const repository = req.repository;
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);
            const many = yield repository.getAll(limit, page);
            const numItens = yield repository.countAll();
            let newList;
            if (Array.isArray(many.send)) {
                newList = many;
            }
            else {
                throw new Error('Sem resultados na busca');
            }
            const numPages = calculatesPages(numItens, limit);
            const pager = {
                pager: {
                    totalNumberOfItems: numItens,
                    totalNumberOfItemsPerPage: limit,
                    currentePage: page,
                    totalNumberOfPages: parseInt(numPages.toFixed())
                }
            };
            const fullResult = {
                data: newList.send,
                pager: pager
            };
            return res.status(newList.statusCode).json(fullResult);
        }
        catch (error) {
            res.status(500).json({ message: `${error} Erro ao paginar` });
        }
    });
}
function calculatesPages(a, b) {
    const c = a / b;
    if ((c > 0.01) && (c < 0.5)) {
        return 1;
    }
    else {
        return a / b;
    }
}
