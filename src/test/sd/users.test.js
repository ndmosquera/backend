import assert from 'assert'
import UsersRepository from '../../repositories/usersRepository.js'


describe(
    "Testeando el recurso User",
    () => {
        let usersRepository = new UsersRepository()
        it(
            "Testeando que se crea efectivamente un usuario (Verificar _id del resultado)",
            async() => {
                let data = {name: "PRUEBA1", last_name:"PRUEBA2"}
                const response = await usersRepository.create(data)
                assert.ok(response.data._id)
            }
        )
        
    }
)