"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoprofesorController_1 = require("../controllers/tipoprofesorController");
class TipoprofesorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipoprofesorController_1.tipoprofesorController.list);
    }
}
const tipoprofesorRoutes = new TipoprofesorRoutes();
exports.default = tipoprofesorRoutes.router;
