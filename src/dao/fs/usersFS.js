import fs from 'fs';
import * as con from '../../utils/GlobalConstants.mjs';

export default class UsersFs {
    constructor() {
        this.users = [];
        this.path = './src/dao/fs/data/users.json';
        this.init();
    }

    init() {
        let file = fs.existsSync(this.path);
        if (!file) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.users = JSON.parse(fileContent);
        }
    }

    async create(data) {
        try {
            this.users.push(data);
            await this.saveToFile();
            return {
                [con.MSG]: 'User created successfully',
                [con.DATA]: data,
                [con.STATUS]: con.OK,
            };
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR,
            };
        }
    }

    read(parameter = null) {
        try {
            if (parameter) {
                const matchingUser = this.users.find((user) => {
                    for (const key in parameter) {
                      if (user[key] !== parameter[key]) {
                        return false;
                      }
                    }
                    return true;
                  });

                if (matchingUser) {
                    return {
                      [con.MSG]: 'User found successfully',
                      [con.DATA]: matchingUser,
                      [con.STATUS]: con.OK,
                    };
                  } else {
                    return {
                      [con.MSG]: 'No user matches the provided filter criteria',
                      [con.DATA]: null,
                      [con.STATUS]: con.ERROR,
                    };
                  }               
            } else {
                if (this.users.length > 0) {
                    return {
                        [con.MSG]: 'Users read successfully',
                        [con.DATA]: this.users,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: 'There are no users to show',
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR,
            };
        }
    }


    async update(id, data) {
        try {
            let one = this.users.find((each) => each[con.ID] == id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                await this.saveToFile();
                return {
                    [con.MSG] : "User updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                };
            } else {
                return {
                    [con.MSG] : `There is no user with ID = ${id}`,
                    [con.DATA] : null,
                    [con.STATUS] : con.ERROR
                };
            }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR,
            };
        }
    }

    async destroy(id) {
        try {
            let one = this.users.find((each) => each[con.ID] == id);
            if (one) {
              this.users = this.users.filter((each) => each[con.ID] !== id);
              await this.saveToFile();
              return {
                  [con.MSG] : "User deleted successfully",
                  [con.DATA] : one,
                  [con.STATUS] : con.OK
              };
            } else {
                return {
                    [con.MSG]: `There is no cart with ID = ${id}`,
                    [con.DATA]: null,
                    [con.STATUS]: con.ERROR,
                };
            }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR,
            };
        }
    }

    async saveToFile() {
        const dataJson = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
    }
}
