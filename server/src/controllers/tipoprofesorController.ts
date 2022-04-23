import { Request, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
class TipoprofesorController {
	constructor() 
    {
		dotenv.config();
		console.log(process.env.TOKEN_SECRET)
	}
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM TipoProfesor');
		res.json(respuesta);
	}
}
export const tipoprofesorController = new TipoprofesorController();
