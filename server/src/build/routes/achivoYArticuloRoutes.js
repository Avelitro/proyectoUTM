"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivoYarticuloController_1 = require("../controllers/archivoYarticuloController");
class ArchivoYArticuloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idArticulo', archivoYarticuloController_1.archivoYArticuloController.listArchivoByArticulo);
    }
}
const articuloyprofesorRoutes = new ArchivoYArticuloRoutes();
exports.default = articuloyprofesorRoutes.router;
