import {Request,Response} from 'express';
import pool from '../database';
class InstitutosController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		const respuesta = await pool.query('SELECT * FROM Institutos');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		const {idInstituto} = req.params;
		const respuesta = await pool.query('SELECT * FROM Institutos WHERE idInstituto  = ?', [idInstituto]);
		
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Instituto no encontrado'});
	}	
	public async listarOne(req: Request, res: Response): Promise <void>
	{
		const {idInstituto} = req.params;
		const respuesta = await pool.query('SELECT * FROM Institutos WHERE idInstituto  = ?', [idInstituto]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
	}
	public async create(req: Request, res: Response): Promise<void> 
	{
		const resp = await pool.query("INSERT INTO Institutos set ?",[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idInstituto } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Institutos set ? WHERE idInstituto= ?", [req.body, idInstituto]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { idInstituto } = req.params;
		const resp = await pool.query("DELETE FROM Institutos WHERE idInstituto=?", [idInstituto]);
		res.json(resp);
	}
	public async articulosByInstituto(req: Request, res: Response):Promise<void>
	{
		const { idInstituto } = req.params;
		const resp = await pool.query('SELECT 	Articulo.titulo,Articulo.tipoCLR,Articulo.nombreCLR,Articulo.estado,Articulo.fechaEdicion FROM Profesores,Articulo,ArticuloYProfesor WHERE Profesores.idProfesor=ArticuloYProfesor.idProfesor AND ArticuloYProfesor.idArticulo=Articulo.idArticulo AND Profesores.idInstituto = ?', [idInstituto]);
		res.json(resp);
	} 
	
}
export const institutosController = new InstitutosController();