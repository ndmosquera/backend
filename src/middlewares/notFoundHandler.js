import * as con from '../utils/GlobalConstants.mjs'

export default function (req, res, next) {
    try {
        return res.status(404).json({
            [con.MSG] : `${req.method} : ${req.url} do not exist`,
            [con.DATA] : null,
            [con.STATUS] : con.ERROR
        })
    } catch (error) {
        next(error)
    }

}