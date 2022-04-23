import { Request, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
class ProfesoresController {
	constructor() {
		dotenv.config();
		console.log(process.env.TOKEN_SECRET)
	}
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM Profesores');
		res.json(respuesta);
	}
	public async listOne(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM Profesores WHERE idProfesor = ?', [idProfesor]);
		if (respuesta.length > 0) {
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
	}
	public async create(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.compare('prueba', "xyz", (err, res) => {
			console.log('Compared result', res);
		})
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query("INSERT INTO Profesores set ?", [req.body]);
			res.json(resp);
		})
	}
	public async actualizar(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Profesores set ? WHERE idProfesor= ?", [req.body, idProfesor]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const resp = await pool.query(`DELETE FROM Profesores WHERE idProfesor= ${idProfesor}`);
		res.json(resp);
	}
	public async existe(req: Request, res: Response): Promise<void> {
		console.log("existe")
		let password = req.body.password as any;
		let correoProfesor = req.body.correo as any;
		let token: string;
		let consulta = "SELECT idProfesor,password,nivel FROM Profesores WHERE correoProfesor = '" + correoProfesor + "'";
		const respuesta = await pool.query(consulta);
		console.log(respuesta)
		if (respuesta.length > 0) {
			bcrypt.compare(password, respuesta[0].password, (err, resEncriptar) => {
				if (resEncriptar == true) {
					token = jwt.sign(correoProfesor, process.env.TOKEN_SECRET || 'prueba');
					console.log(token);
					res.json({'token': token,'correo':respuesta[0].correo, 'idProfesor': respuesta[0].idProfesor,'nivel':respuesta[0].nivel});
		
				}
				else
					res.json(-1);
				return;
			})
		}
		else
			res.json(-1);
	}

	public async listAutorByArticulo(req: Request, res: Response): Promise<void> {
		//console.log("listAutorByArticulo")
		const { idArticulo } = req.params;
		const respuesta = await pool.query(`SELECT P.nombresP, P.idProfesor, AYP.pos FROM Profesores P INNER JOIN ArticuloYProfesor AYP ON AYP.idProfesor=P.idProfesor WHERE idArticulo = ${idArticulo}`);																	
		res.json(respuesta);

		
	}
	public async actualizarContrasena(req: Request, res: Response): Promise<void> 
	{
		const { idProfesor } = req.params;
		console.log(req.params);
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.compare('prueba', "xyz", (err, res) => {
			console.log('Compared result', res);
		})
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query("UPDATE Profesores set ? WHERE idProfesor= ?", [req.body, idProfesor]);
			res.json(resp);
		})
	}
	public async listProfesoresByInstituto(req: Request, res: Response): Promise<void> 
	{
		const { idInstituto } = req.params;
		let consulta = 'SELECT nombresP, idProfesor FROM Profesores WHERE idInstituto = ' + idInstituto;
		console.log(consulta)
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}
	public async listProfesoresByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params;
		let consulta = 'SELECT * FROM Profesores WHERE idCarrera = ' + idCarrera;
		console.log(consulta)
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}

}
export const profesoresController = new ProfesoresController();
