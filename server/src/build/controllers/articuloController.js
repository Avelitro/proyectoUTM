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
exports.articuloController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticuloController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("list");
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOne");
            const { idArticulo } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query("INSERT INTO Articulo set ?", [req.body]);
            let dato = {
                'idProfesor': idProfesor,
                'idArticulo': resp.insertId,
                'pos': 1,
                'valido': 1
            };
            const resp2 = yield database_1.default.query("INSERT INTO ArticuloYProfesor set ?", [dato]);
            res.json(resp);
            console.log(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("actualizar");
            const { idArticulo } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eliminar");
            const { idArticulo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
            res.json(resp);
        });
    }
    articulosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("articulosByCarrera");
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query("SELECT nombre FROM Articulo WHERE idCarrera=?", [req.body, idCarrera]);
            res.json(resp);
        });
    }
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin, idProfesor } = req.params;
            let consulta = `SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
            console.log();
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo,ArticuloYProfesor WHERE ArticuloYProfesor.idArticulo=Articulo.idArticulo AND fechaEdicion>=? AND fechaEdicion<=? AND ArticuloYProfesor.idProfesor=? ORDER BY Articulo.fechaEdicion ASC', [ini, fin, idProfesor]);
            res.json(respuesta);
            //SELECT DISTINCT AYP.idProfesor,A.titulo,A.tipoCLR FROM Articulo A INNER JOIN ArticuloYProfesor AYP WHERE A.fechaEdicion>='2019-01-01' AND A.fechaEdicion<='2022-03-21' AND AYP.idProfesor =1
        });
    }
    eliminarAutorByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, idArticulo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM ArticuloYProfesor WHERE idArticulo= ${idArticulo} AND idProfesor= ${idProfesor}`);
            res.json(resp);
        });
    }
}
exports.articuloController = new ArticuloController();
