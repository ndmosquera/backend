import * as userServices from '../services/usersServices.js'
import * as con from '../../utils/GlobalConstants.mjs'

export const GETUserByID = async(req, res) => {
    try{
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        res.status(200).send({ [con.STATUS]: con.OK, [con.DATA]: product });
    } catch (e){
        console.log(e)
        res.status(502).send({ [con.STATUS]: con.ERROR, [con.MSG]: e.message });
    }
}