"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutosController_1 = require("../controllers/institutosController");
const auth_1 = require("../middleware/auth");
class InstitutosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listarOne/:idInstituto', institutosController_1.institutosController.listarOne);
        //this.router.get('/',(req,res) => res.send('probando institutos'));
        this.router.post('/create', institutosController_1.institutosController.create);
        this.router.put('/actualizar/:idInstituto', institutosController_1.institutosController.actualizar);
        this.router.delete('/eliminar/:idInstituto', institutosController_1.institutosController.eliminar);
        this.router.get('/list', auth_1.validarToken, institutosController_1.institutosController.list);
        this.router.get('/:idInstituto', institutosController_1.institutosController.listOne);
        this.router.get('/articulosByInstituto/:idInstituto', institutosController_1.institutosController.articulosByInstituto);
    }
}
const institutosRoutes = new InstitutosRoutes();
exports.default = institutosRoutes.router;
