import fs from'fs'
import * as con from '../../utils/GlobalConstants.mjs'
import CustomError from '../../utils/customError.js';

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
            [con.DATA]: data[con.ID],
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


    async read (filter, limit, page, sort){
      // filter products
      let filteredProducts = this.products.filter((product) => {
        for (const key in filter) {
          if (product[key] !== filter[key]) {
            return false;
          }
        }
        return true;
      });
      if(filteredProducts.length === 0){
        return {
          [con.MSG] : `There is no product with those parameters`,
          [con.DATA] : null,
          [con.STATUS] : con.ERROR
        };
      }
      // sort filtered products
      if (sort === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => a[con.PRICE] - b[con.PRICE]);
      } else if (sort === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => b[con.PRICE] - a[con.PRICE]);
      }

      // products paginate
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      return {
        [con.MSG] : 'Products found successfully',
        [con.DATA] : paginatedProducts,
        [con.STATUS] : con.OK
    };
      ;
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