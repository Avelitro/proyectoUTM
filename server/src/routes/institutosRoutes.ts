import { Router } from 'express';
import { institutosController } from '../controllers/institutosController';
import { validarToken } from '../middleware/auth';
class InstitutosRoutes
{
	public router: Router=Router();
	constructor()
	{
		this.config();
	}
	config() : void
	{
		this.router.get('/listarOne/:idInstituto', institutosController.listarOne );
		//this.router.get('/',(req,res) => res.send('probando institutos'));
		this.router.post('/create', institutosController.create);
		this.router.put('/actualizar/:idInstituto',institutosController.actualizar);
		this.router.delete('/eliminar/:idInstituto',institutosController.eliminar);
		this.router.get('/list',validarToken, institutosController.list );
		this.router.get('/:idInstituto', institutosController.listOne );
		this.router.get('/articulosByInstituto/:idInstituto', institutosController.articulosByInstituto );
	}
}
const institutosRoutes= new InstitutosRoutes();
export default institutosRoutes.router;