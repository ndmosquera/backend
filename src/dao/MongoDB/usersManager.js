import fs from 'fs'
import crypto from 'crypto'
import * as con from '../../../utils/GlobalConstants.mjs';

class UserManager {
    constructor() {

    }

    async getUsers(){
        try{
            const data = await fs.promises.readFile(con.PATH_USERS_FILE, 'utf-8');
            const users = JSON.parse(data);
            return users;
        } catch(e){
            await fs.promises.writeFile(con.PATH_USERS_FILE, JSON.stringify([]));
            return [];
        }
    }

    async createUser(user) {
        const users = await this.getUsers();
        
        user.salt = crypto.randomBytes(128).toString('base64');
        user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');

        users.push(user)
        await fs.promises.writeFile(con.PATH_USERS_FILE, JSON.stringify(users));
    }

    async validateUser(username, password){
        const users = await this.getUsers();

        const user = users.find(user => user.username === username)
        if(!user) return 'Error, usuario no existe'

        const loginHash = crypto
        .createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

        return loginHash === user.password
        ? 'Usuario Loggeado'
        : 'Usuario o Contraseña incorrecta';

    }
}


const users = new UserManager();
// users.createUser({
//     name: 'Nicolas',
//     lastName: 'Mosquera',
//     username: 'nmosquera',
//     password: '123Coder'
// })


const prueba = await users.validateUser('nmosquera', '13Coder')

console.log(prueba)