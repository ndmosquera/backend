import fs from 'fs';
import * as con from '../../utils/GlobalConstants.mjs';

export default class UsersFs {
    constructor() {
        this.tokens = [];
        this.path = './src/dao/fs/data/tokens.json';
        this.init();
    }

    init() {
        let file = fs.existsSync(this.path);
        if (!file) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.tokens = JSON.parse(fileContent);
        }
    }

    async create(data) {
        try {
            this.tokens.push(data);
            await this.saveToFile();
            return {
                [con.MSG]: 'Recovery Token created successfully',
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
                const matchingToken = this.tokens.find((token) => {
                    for (const key in parameter) {
                      if (token[key] !== parameter[key]) {
                        return false;
                      }
                    }
                    return true;
                  });

                if (matchingToken) {
                    return {
                      [con.MSG]: 'Token found successfully',
                      [con.DATA]: matchingToken,
                      [con.STATUS]: con.OK,
                    };
                  } else {
                    return {
                      [con.MSG]: 'No token matches the provided filter criteria',
                      [con.DATA]: null,
                      [con.STATUS]: con.ERROR,
                    };
                  }               
            } else {
                if (this.tokens.length > 0) {
                    return {
                        [con.MSG]: 'Tokens read successfully',
                        [con.DATA]: this.tokens,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: 'There are no tokens to show',
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
            let one = this.tokens.find((each) => each[con.ID] == id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                await this.saveToFile();
                return {
                    [con.MSG] : "Token updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                };
            } else {
                return {
                    [con.MSG] : `There is no token with ID = ${id}`,
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
            let one = this.tokens.find((each) => each[con.ID] == id);
            if (one) {
              this.tokens = this.tokens.filter((each) => each[con.ID] !== id);
              await this.saveToFile();
              return {
                  [con.MSG] : "Token deleted successfully",
                  [con.DATA] : one,
                  [con.STATUS] : con.OK
              };
            } else {
                return {
                    [con.MSG]: `There is no token with ID = ${id}`,
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
        const dataJson = JSON.stringify(this.tokens, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
    }
}
