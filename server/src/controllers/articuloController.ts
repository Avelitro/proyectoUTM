import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArticuloController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		console.log("list")
		const respuesta = await pool.query('SELECT * FROM Articulo');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		console.log("listOne")
		const {idArticulo} = req.params;
		const respuesta = await pool.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const { idProfesor } = req.params;
		const resp =await pool.query("INSERT INTO Articulo set ?",[req.body]);
		let dato={
			'idProfesor':idProfesor,
			'idArticulo':resp.insertId,
			'pos':1,
			'valido':1
		}
		const resp2 = await pool.query("INSERT INTO ArticuloYProfesor set ?", [dato]);
		res.json(resp);
		console.log(resp)
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		console.log("actualizar")
		const { idArticulo } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		console.log("eliminar")
		const { idArticulo } = req.params;
		const resp = await pool.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
		res.json(resp);
	}
    public async articulosByCarrera(req: Request, res: Response): Promise<void> 
	{
		console.log("articulosByCarrera")
		const { idCarrera } = req.params;
		const resp = await pool.query("SELECT nombre FROM Articulo WHERE idCarrera=?",[req.body,idCarrera]);
		res.json(resp);
	}
	public async listByProfesor(req: Request, res: Response): Promise <void>
	{
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
			res.json(respuesta);
	}	
	public async listByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { ini,fin,idProfesor } = req.params;
		let consulta=`SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
		console.log()
		const respuesta = await pool.query('SELECT * FROM Articulo,ArticuloYProfesor WHERE ArticuloYProfesor.idArticulo=Articulo.idArticulo AND fechaEdicion>=? AND fechaEdicion<=? AND ArticuloYProfesor.idProfesor=? ORDER BY Articulo.fechaEdicion ASC',[ini,fin,idProfesor]);
		res.json( respuesta );
		//SELECT DISTINCT AYP.idProfesor,A.titulo,A.tipoCLR FROM Articulo A INNER JOIN ArticuloYProfesor AYP WHERE A.fechaEdicion>='2019-01-01' AND A.fechaEdicion<='2022-03-21' AND AYP.idProfesor =1

	}
	public async eliminarAutorByArticulo(req: Request, res: Response): Promise<void> 
	{
		const { idProfesor,idArticulo } = req.params;
		const resp = await pool.query(`DELETE FROM ArticuloYProfesor WHERE idArticulo= ${idArticulo} AND idProfesor= ${idProfesor}`);
		res.json(resp);
	}
}
export const articuloController = new ArticuloController();