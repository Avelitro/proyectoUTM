import { Router } from 'express';
import { tipoprofesorController } from '../controllers/tipoprofesorController';
class TipoprofesorRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', tipoprofesorController.list );   
    }
}
const tipoprofesorRoutes= new TipoprofesorRoutes();
export default tipoprofesorRoutes.router;