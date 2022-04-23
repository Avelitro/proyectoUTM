import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArchivoYArticuloController
{
	public async listArchivoByArticulo(req: Request, res: Response ): Promise<void>
	{
		const {idArticulo} = req.params;
		const respuesta = await pool.query('SELECT * FROM ArchivoYArticulo WHERE idArticulo = ?', [idArticulo]);
		res.json( respuesta );
	}
	
}
export const archivoYArticuloController = new ArchivoYArticuloController();