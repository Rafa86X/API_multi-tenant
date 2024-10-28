"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatesPages = calculatesPages;
exports.assembleList = assembleList;
function calculatesPages(a, b) {
    const c = a / b;
    if ((c > 0.01) && (c < 0.5)) {
        return 1;
    }
    else {
        return a / b;
    }
}
function assembleList(array = [], limitOfObjects, pager) {
    const return__ = [];
    let i = 0;
    i = (pager - 1) * limitOfObjects;
    do {
        if (i < limitOfObjects * pager) {
            return__.push(array[i]);
        }
        i = i + 1;
    } while (i < array.length);
    return return__;
}
