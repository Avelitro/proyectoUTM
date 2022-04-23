import { Router } from 'express';
import { archivoYArticuloController } from '../controllers/archivoYarticuloController';
class ArchivoYArticuloRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void 
    {
		this.router.get('/:idArticulo', archivoYArticuloController.listArchivoByArticulo);
	}
}
const articuloyprofesorRoutes = new ArchivoYArticuloRoutes();
export default articuloyprofesorRoutes.router;