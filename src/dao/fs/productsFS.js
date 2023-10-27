import fs from'fs'
import * as con from '../../utils/GlobalConstants.mjs'

export default class ProductsFs {
    constructor() {
      this.products = [];
      this.path = './src/dao/fs/data/products.json';
      this.init();
    }
    
    init() {
      let file = fs.existsSync(this.path);
      if(!file){
        fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
          const fileContent = fs.readFileSync(this.path, 'utf-8');
          this.products = JSON.parse(fileContent);
        }
        return true;
    }

    async create(data) {
        try {
          this.products.push(data);
          await this.saveToFile();
          return {
            [con.MSG]: "Product created successfully",
            [con.DATA]: data,
            [con.STATUS]: con.OK
          };
        } catch (error) {
          return {
            [con.MSG]: error.message,
            [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
            [con.STATUS]: con.ERROR
          };
        }
      }

      read(parameter = null) {
        try {
            if (parameter) {
                const products = this.products.filter((product) => {
                    for (const key in parameter) {
                      if (product[key] !== parameter[key]) {
                        return false;
                      }
                    }
                    return true;
                });
                if (products) {
                    return {
                        [con.MSG]: 'Products found successfully',
                        [con.DATA]: products,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: `There is no product with ID = ${id}`,
                        [con.DATA]: null,
                        [con.STATUS]: con.ERROR,
                    };
                }
            } else {
                if (this.products.length > 0) {
                    return {
                        [con.MSG]: 'Products read successfully',
                        [con.DATA]: this.products,
                        [con.STATUS]: con.OK,
                    };
                } else {
                    return {
                        [con.MSG]: 'There are no products to show',
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
          let one = this.products.find((each) => each[con.ID] == id);
          if (one) {
            for (let prop in data) {
              one[prop] = data[prop];
            }
            await this.saveToFile();
            return {
                [con.MSG] : "Product updated successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            };
          } else {
            return {
                [con.MSG] : `There is no product with ID = ${id}`,
                [con.DATA] : null,
                [con.STATUS] : con.ERROR
            };
          }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR
            };
        }
      }
      async destroy(id) {
        try {
          let one = this.products.find((each) => each[con.ID] == id);
          if (one) {
            this.products = this.products.filter((each) => each[con.ID] !== id);
            await this.saveToFile();
            return {
                [con.MSG] : "Product deleted successfully",
                [con.DATA] : one,
                [con.STATUS] : con.OK
            };
          } else {
            return {
                [con.MSG] : `There is no product with ID = ${id}`,
                [con.DATA] : null,
                [con.STATUS] : con.ERROR
            };
          }
        } catch (error) {
            return {
                [con.MSG]: error.message,
                [con.DATA]: `${error.fileName} : ${error.lineNumber}`,
                [con.STATUS]: con.ERROR
            };
        }
      }

      async saveToFile() {
        const dataJson = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
      }
}