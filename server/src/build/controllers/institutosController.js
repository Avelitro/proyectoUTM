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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutosController = void 0;
const database_1 = __importDefault(require("../database"));
class InstitutosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM Institutos');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Institutos WHERE idInstituto  = ?', [idInstituto]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Instituto no encontrado' });
        });
    }
    listarOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Institutos WHERE idInstituto  = ?', [idInstituto]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO Institutos set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Institutos set ? WHERE idInstituto= ?", [req.body, idInstituto]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const resp = yield database_1.default.query("DELETE FROM Institutos WHERE idInstituto=?", [idInstituto]);
            res.json(resp);
        });
    }
    articulosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const resp = yield database_1.default.query('SELECT 	Articulo.titulo,Articulo.tipoCLR,Articulo.nombreCLR,Articulo.estado,Articulo.fechaEdicion FROM Profesores,Articulo,ArticuloYProfesor WHERE Profesores.idProfesor=ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo=Articulo.idArticulo AND Profesores.idInstituto = ?', [idInstituto]);
            res.json(resp);
        });
    }
}
exports.institutosController = new InstitutosController();
