import ENV from '../../config/env.js'
import { expect } from 'chai'
import supertest from 'supertest'
import * as con from '../../utils/GlobalConstants.mjs'

const requester = supertest(`http://localhost:${ENV.PORT}/api`)
let token = ""
pid = ""

describe(
    "General Test",
    () => {
        describe("Testing Session's endpoints", () => {
            it("Testing login", async () => {
                let data = {[con.USERNAME]: "ndmosquera", [con.PASSWORD]: "123456"}
                const response = await requester.post('/session/login').send(data)
                const { _body } = response
                token = _body[con.DATA][con.TOKEN]
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            })
        }),
        describe("Testing Product's endpoints", () => {
            it("Testing create a product", async () => {
                let data = 
                {
                    [con.TITLE]: "PRUEBA1",
                    [con.DESCRIPTION]: "PRUEBA1",
                    [con.CODE]: "PRUEBA1",
                    [con.STOCK]: 500,
                    [con.PRICE]: 6000,
                    [con.CATEGORY]: "PRUEBA1",
                    [con.OWNER]: "ndmosquera",
                }
                const response = (await requester.post('/products')).header(con.TOKEN, token).send(data)
                const { _body } = response
                pid = _body[con.DATA][con.ID]
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            })
            it("Testing read all products", async () => {
                const response = (await requester.get('/products'))
                const { _body } = response
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            } )
            it("Testing read a product", async () => {
                const response = (await requester.get(`/products?query=_id:${pid}`))
                const { _body } = response
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            } )
            it("Testing update a product", async () => {
                let data = 
                {
                    [con.STOCK]: 600,
                }
                const response = (await requester.put(`/products:${pid}`)).send(data)
                const { _body } = response
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            } )
            it("Testing delete a product", async () => {
                const response = (await requester.delete(`/products:${pid}`))
                const { _body } = response
                expect(_body[con.STATUS]).to.is.equals(con.OK)
            })

        })
    }
)
