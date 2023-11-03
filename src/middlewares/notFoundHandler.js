import * as con from '../utils/GlobalConstants.mjs'

export default function (res, req, next) {
    try {
        return res.json({
            [con.MSG] : `${req.method} : ${req.url}`,
            [con.DATA] : null,
            [con.STATUS] : con.ERROR
        })
    } catch (error) {
        next(error)
    }

}