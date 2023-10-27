import fs from 'fs';
import * as con from '../../utils/GlobalConstants.mjs';

export default class CartsFs {
    constructor() {
        this.carts = [];
        this.path = './src/dao/fs/data/carts.json';
        this.init();
    }

    init() {
        const file = fs.existsSync(this.path);
        if (!file) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(fileContent);
        }
    }

    async create() {
        try {
            this.carts.push({ [con.PRODUCTS]: [] });
            await this.saveToFile();
            return {
                [con.MSG]: 'Cart created successfully',
                [con.DATA]: this.carts[this.carts.length - 1],
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

    read(id = null) {
        try {
            if (id) {
                const cart = this.carts.find((cart) => cart[con.ID] === id);
                if (cart) {
                    return {
                        [con.MSG]: 'Cart found successfully',
                        [con.DATA]: cart,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no cart with ID = ${id}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
                if (this.carts.length > 0) {
                    return {
                        [con.MSG]: 'Cart read successfully',
                        [con.DATA]: this.carts,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: 'There are no carts to show',
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
            let one = this.carts.find((each) => each[con.ID] == id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                await this.saveToFile();
                return {
                    [con.MSG] : "Cart updated successfully",
                    [con.DATA] : one,
                    [con.STATUS] : con.OK
                };
            } else {
                return {
                    [con.MSG] : `There is no cart with ID = ${id}`,
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
            let one = this.carts.find((each) => each[con.ID] == id);
            if (one) {
              this.carts = this.carts.filter((each) => each[con.ID] !== id);
              await this.saveToFile();
              return {
                  [con.MSG] : "Product deleted successfully",
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
        const dataJson = JSON.stringify(this.carts, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
    }
}
