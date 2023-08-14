import { Router } from 'express'
import cookieParser from 'cookie-parser';
import * as con from '../../utils/GlobalConstants.mjs'

const cookiesRouter = Router();

cookiesRouter.get('/', async (req, res) => {
    res.render("form")
});

cookiesRouter.post('/', async (req, res) => {
    const { correo } = req.body;
    res.cookie("user", correo, {maxAge:10000}).redirect('/')
});

export default cookiesRouter; 