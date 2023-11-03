import { expect } from 'chai'
import UsersRepository from '../../repositories/usersRepository.js'

describe(
    "Testeando el recurso Users",
    () => {
        let usersRepository = new UsersRepository()
        it(
            "Testeando que se crea efectivamente un usuario (Verificar _id del resultado)",
            async() => {
                let data = {name: "PRUEBA1", last_name:"PRUEBA2"}
                const response = await usersRepository.create(data)
                expect(response).to.have.property("_id")
            }
        )
    }
)